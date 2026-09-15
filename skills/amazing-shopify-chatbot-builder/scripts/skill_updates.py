"""Read-only GitHub skill release checks; receipt recording verifies source bytes first."""
from __future__ import annotations
import argparse
import hashlib
import json
import re
import subprocess
from pathlib import Path, PurePosixPath

RECEIPT = '.skill-install.json'
IGNORED = {'__pycache__', '.pytest_cache'}


def relative(value):
    if not isinstance(value, str) or not value or '\\' in value or ':' in value:
        raise ValueError('Invalid package-relative path')
    p = PurePosixPath(value)
    if p.is_absolute() or any(x in ('', '.', '..') for x in value.split('/')):
        raise ValueError('Invalid package-relative path')
    return value


def repository(value):
    if not re.fullmatch(r'[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+', value) or any(x in ('.', '..') for x in value.split('/')):
        raise ValueError('Expected GitHub owner/repository')
    return value


def commit_id(value):
    if not isinstance(value, str) or not re.fullmatch(r'[0-9a-f]{40}', value):
        raise ValueError('Expected immutable Git commit')
    return value


def api(endpoint):
    # gh uses existing authentication without printing or accepting credentials here.
    result = subprocess.run(['gh', 'api', endpoint], capture_output=True, timeout=12)
    if result.returncode:
        raise RuntimeError('GitHub source unavailable; check existing gh authentication/network')
    return json.loads(result.stdout)


def ignored(name):
    return name == RECEIPT or any(p in IGNORED for p in PurePosixPath(name).parts)


def local_files(folder):
    folder = Path(folder).resolve(strict=True)
    result = {}
    for p in folder.rglob('*'):
        name = p.relative_to(folder).as_posix()
        if ignored(name):
            continue
        if p.is_symlink() or not p.resolve().is_relative_to(folder):
            raise ValueError('Symlinks and paths outside installation are unsupported')
        if p.is_file():
            result[name] = p.read_bytes()
    return result


def blob_hash(data):
    return hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()


def source_files(repo, commit, package, get):
    relative(package)
    tree = get(f'repos/{repo}/git/trees/{commit_id(commit)}?recursive=1')
    if tree.get('truncated'):
        raise ValueError('Source tree was truncated; cannot verify package')
    result = {}
    prefix = package + '/'
    for entry in tree['tree']:
        if entry['path'].startswith(prefix) and entry['type'] != 'tree':
            name = relative(entry['path'][len(prefix):])
            if ignored(name):
                continue
            if entry['type'] != 'blob' or entry.get('mode') not in ('100644', '100755'):
                raise ValueError('Unsupported source entry')
            result[name] = commit_id(entry['sha'])
    if 'SKILL.md' not in result:
        raise ValueError('Source package has no SKILL.md')
    return result


def release(repo, commit, key, get):
    import base64
    content = get(f'repos/{repo}/contents/skill-releases.json?ref={commit_id(commit)}')
    manifest = json.loads(base64.b64decode(content['content']))
    if manifest.get('schema_version') != 1:
        raise ValueError('Unsupported release manifest')
    item = manifest['skills'][key]
    relative(item['path'])
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', item['name']):
        raise ValueError('Invalid skill name')
    if not re.fullmatch(r'\d+\.\d+(?:\.\d+)?', item['version']):
        raise ValueError('Invalid release version')
    if not isinstance(item.get('previous_names', []), list):
        raise ValueError('Invalid previous names')
    return item


def version_number(value):
    parts = tuple(int(p) for p in value.split('.'))
    return parts + (0,) * (3 - len(parts))


def source_version_matches(files, version):
    return files.get('VERSION') in {blob_hash((version + ending).encode()) for ending in ('', '\n', '\r\n')}


def verify_local_metadata(files, item):
    if files.get('VERSION', b'').decode('utf-8-sig').strip() != item['version']:
        raise ValueError('Installed VERSION differs from manifest')
    text = files.get('SKILL.md', b'').decode('utf-8-sig')
    frontmatter = re.match(r'\A---\r?\n(.*?)\r?\n---(?:\r?\n|$)', text, re.S)
    names = re.findall(r'^name:\s*[\'"]?([a-z0-9-]+)[\'"]?\s*$', frontmatter[1], re.M) if frontmatter else []
    if names != [item['name']]:
        raise ValueError('Installed SKILL.md name differs from manifest')


def differences(local, remote):
    return sorted(name for name in local.keys() | remote.keys()
                  if name not in local or name not in remote or blob_hash(local[name]) != remote[name])


def record(folder, repo, key, commit, get=api):
    repo = repository(repo)
    item = release(repo, commit, key, get)
    files = local_files(folder)
    verify_local_metadata(files, item)
    if Path(folder).name != item['name']:
        raise ValueError('Installation folder must use the approved current name')
    if differences(files, source_files(repo, commit, item['path'], get)):
        raise ValueError('Installation differs from source; receipt not written')
    receipt = dict(schema_version=1, repository=repo, skill_key=key,
                   package_path=item['path'], commit=commit, version=item['version'],
                   name=item['name'], files={p: hashlib.sha256(b).hexdigest() for p, b in files.items()})
    target = Path(folder) / RECEIPT
    if target.is_symlink():
        raise ValueError('Receipt must not be a symlink')
    target.write_text(json.dumps(receipt, indent=2) + '\n', encoding='utf-8')
    return dict(status='recorded', receipt=receipt)


def check(folder, repo, key, get=api):
    transport = get
    cache = {}
    def get(endpoint):
        if endpoint not in cache:
            cache[endpoint] = transport(endpoint)
        return cache[endpoint]
    repo = repository(repo)
    target = Path(folder) / RECEIPT
    if not target.exists():
        return dict(status='unverified', reason='Missing install receipt; establish source and verify baseline before automatic update')
    if target.is_symlink():
        raise ValueError('Receipt must not be a symlink')
    receipt = json.loads(target.read_text(encoding='utf-8'))
    if receipt.get('schema_version') != 1 or receipt.get('repository') != repo or receipt.get('skill_key') != key:
        raise ValueError('Receipt source does not match explicitly selected source')
    commit_id(receipt['commit'])
    relative(receipt['package_path'])
    # Baseline is verified from origin, never trusted merely because receipt claims hashes.
    baseline = release(repo, receipt['commit'], key, get)
    if any(receipt.get(a) != baseline[b] for a, b in [('package_path', 'path'), ('name', 'name'), ('version', 'version')]):
        raise ValueError('Receipt metadata differs from source release')
    files = local_files(folder)
    old_files = source_files(repo, receipt['commit'], baseline['path'], get)
    if not source_version_matches(old_files, baseline['version']):
        raise ValueError('Baseline VERSION differs from manifest')
    if Path(folder).name not in [baseline['name'], *baseline.get('previous_names', [])]:
        raise ValueError('Folder name differs from verified baseline')
    changed = differences(files, old_files)
    latest_commit = commit_id(get(f'repos/{repo}/commits/HEAD')['sha'])
    latest = release(repo, latest_commit, key, get)
    renamed = latest['name'] != Path(folder).name
    if renamed and Path(folder).name not in latest.get('previous_names', []):
        raise ValueError('Installed name is not a recognized previous name')
    new_files = source_files(repo, latest_commit, latest['path'], get)
    older = version_number(latest['version']) < version_number(baseline['version'])
    inconsistent = not source_version_matches(new_files, latest['version']) or (version_number(latest['version']) == version_number(baseline['version']) and new_files != old_files)
    status = 'local_changes' if changed else 'local_ahead' if older else 'release_inconsistent' if inconsistent else 'rename_required' if renamed else 'update_available' if differences(files, new_files) else 'current'
    return dict(status=status, repository=repo, skill_key=key, installed_version=receipt['version'],
                latest_version=latest['version'], latest_commit=latest_commit, package_path=latest['path'],
                name=latest['name'], rename_requires_approval=renamed, changed_files=changed)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=['check', 'record'])
    parser.add_argument('--skill-dir', required=True)
    parser.add_argument('--repository', required=True, help='Trusted installer/source provenance, not an arbitrary manifest redirect')
    parser.add_argument('--skill-key', required=True)
    parser.add_argument('--commit')
    args = parser.parse_args()
    try:
        result = record(args.skill_dir, args.repository, args.skill_key, args.commit) if args.command == 'record' else check(args.skill_dir, args.repository, args.skill_key)
    except (ValueError, KeyError, TypeError, OSError, RuntimeError, subprocess.TimeoutExpired) as exc:
        # No subprocess stderr, environment values, or authentication tokens in output.
        result = dict(status='unverified', reason='Source or installation verification failed', error_type=type(exc).__name__)
    print(json.dumps(result, indent=2))
    return 0 if result['status'] in ('current', 'recorded') else 2


if __name__ == '__main__':
    raise SystemExit(main())
