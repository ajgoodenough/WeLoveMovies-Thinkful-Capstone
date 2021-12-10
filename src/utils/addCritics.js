// adds a nested object

function addCritics(reviews) {
  return reviews.map((review) => {
    return {
      review_id: review.review_id,
      content: review.content,
      score: review.score,
      critic_id: review.critic_id,
      movie_id: review.movie_id,
      critic: {
        critic_id: review.critic_id,
        preferred_name: review.preferred_name,
        surname: review.surname,
        organization_name: review.organization_name,
      },
    };
  });
}

module.exports = addCritics;
