const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// LIST FUNCTION
async function list(req, res) {
  const data = await reviewsService.list();
  res.json({ data });
}

//READ FUNCTION
async function read(req, res) {
  const { review } = res.locals;
  const data = await reviewsService.readReviewCritic(review.review_id);
  res.json({ data: data[0] });
}

//UPDATE FUNCTION
async function update(req, res, next) {
  const { review } = res.locals;
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  let data = await reviewsService.update(updatedReview);
  data = await reviewsService.readReviewCritic(review.review_id);
  res.json({ data: data[0] });
}

//DELETE FUNCTION
async function destroy(req, res) {
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  res.sendStatus(404);
}

// VALIDATION
async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const validReview = await reviewsService.read(reviewId);

  if (validReview) {
    res.locals.review = validReview;
    return next();
  } else {
    return next({
      status: 404,
      message: "Review cannot be found",
    });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(read)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
