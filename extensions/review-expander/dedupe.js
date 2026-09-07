(() => {
  globalThis.ReviewExpanderDedupe = Object.freeze({
    mergeReviewPasses,
    mergeReviewSets
  });

  function mergeReviewSets(recentReviews, helpfulReviews) {
    const merged = new Map();
    let duplicateCount = 0;

    const addReview = (review, sourceSort) => {
      const reviewId = review?.review_id;
      if (!reviewId) return;

      const existing = merged.get(reviewId);
      if (!existing) {
        merged.set(reviewId, {
          ...review,
          sort: "Both",
          discovered_in_sort: sourceSort,
          discovered_in_rating: review.star_filter
        });
        return;
      }

      duplicateCount += 1;
      merged.set(reviewId, mergeDuplicateReview(existing, review, sourceSort));
    };

    recentReviews.forEach((review) => addReview(review, "Most recent"));
    helpfulReviews.forEach((review) => addReview(review, "Top reviews"));

    return { reviews: Array.from(merged.values()), duplicateCount };
  }

  function mergeReviewPasses(passes) {
    const merged = new Map();
    let duplicateCount = 0;
    const sortLabels = Array.from(new Set(
      passes.map((pass) => cleanText(pass.sortLabel)).filter(Boolean)
    ));
    const finalSort = sortLabels.length > 1 ? "Both" : (sortLabels[0] || "");

    passes.forEach((pass) => {
      const sourceSort = cleanText(pass.sortLabel);
      const sourceRating = cleanText(pass.ratingLabel);

      (pass.reviews || []).forEach((review) => {
        const reviewId = review?.review_id;
        if (!reviewId) return;

        const incoming = {
          ...review,
          sort: finalSort,
          discovered_in_sort: sourceSort,
          discovered_in_rating: sourceRating,
          star_filter: "The Full Monty"
        };
        const existing = merged.get(reviewId);

        if (!existing) {
          merged.set(reviewId, incoming);
          return;
        }

        duplicateCount += 1;
        const combined = mergeDuplicateReview(existing, incoming, sourceSort);
        combined.discovered_in_rating = mergeDelimitedValues(
          existing.discovered_in_rating,
          sourceRating
        );
        combined.star_filter = "The Full Monty";
        merged.set(reviewId, combined);
      });
    });

    return { reviews: Array.from(merged.values()), duplicateCount };
  }

  function mergeDuplicateReview(existing, incoming, sourceSort) {
    const merged = { ...existing };

    Object.entries(incoming).forEach(([name, value]) => {
      if (!cleanText(merged[name]) && cleanText(value)) merged[name] = value;
    });

    if (cleanText(incoming.review_body).length > cleanText(merged.review_body).length) {
      merged.review_body = incoming.review_body;
    }

    merged.image_urls = mergeDelimitedValues(merged.image_urls, incoming.image_urls);
    merged.sort = "Both";
    merged.discovered_in_sort = mergeDelimitedValues(
      merged.discovered_in_sort,
      sourceSort
    );
    merged.discovered_in_rating = mergeDelimitedValues(
      merged.discovered_in_rating,
      incoming.discovered_in_rating || incoming.star_filter
    );
    return merged;
  }

  function mergeDelimitedValues(...values) {
    const parts = values.flatMap((value) => String(value || "").split(" | "));
    return Array.from(new Set(parts.map(cleanText).filter(Boolean))).join(" | ");
  }

  function cleanText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }
})();
