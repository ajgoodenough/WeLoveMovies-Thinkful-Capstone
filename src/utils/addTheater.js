function addTheater(movies) {
  return movies.map((movie) => {
    return {
      movie_id: movie.movie_id,
      title: movie.title,
      runtime_in_minutes: movie.runtime_in_minutes,
      rating: movie.rating,
      description: movie.description,
      image_url: movie.image_url,
      theater: {
        theater_id: movie.theater_id,
        name: movie.name,
        address_line_1: movie.address_line_1,
        city: movie.city,
        state: movie.state,
        zip: movie.zip,
      },
    };
  });
}

module.exports = addTheater;
