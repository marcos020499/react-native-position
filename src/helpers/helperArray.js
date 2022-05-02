export function normalizrMovies(movie_by_group) {
  //the movies are in known_for
  const newArray = movie_by_group.reduce((acc, el) => {
    return acc.concat(el.known_for);
  }, []);
  return newArray;
}
