const knex = require("../db/connection");
const addCritics = require("../utils/addCritics");
const reduceProperties = require("../utils/reduce-properties");

const reduceReviewsAndMovie = reduceProperties("movie_id", {
  review_id: ["reviews", null, "review_id"],
  content: ["reviews", null, "content"],
  score: ["reviews", null, "score"],
  critic_id: ["reviews", null, "critic_id"]
});

function list() {
  return knex("movies as m")
    .select("*")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .then(reduceReviewsAndMovie)
}

function listMoviesCurrentlyShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where({ "mt.is_showing": true });
}

function read(movie_id) {
  return knex("movies").select("*").where({ movie_id }).first();
}

// movies/:movieId/theaters
function readMovieAndTheaters(movie_id) {
  return knex("movies as m")
    .select("t.*", "mt.*")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .where({ "m.movie_id": movie_id });
}

// movies/:movieId/reviews
function readMovieAndReviews(movie_id) {
  return knex("movies as m")
    .select("r.*", "c.*")
    .join("reviews as r", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .where({ "m.movie_id": movie_id })
    .then(addCritics);
}

module.exports = {
  list,
  listMoviesCurrentlyShowing,
  read,
  readMovieAndTheaters,
  readMovieAndReviews,
};
