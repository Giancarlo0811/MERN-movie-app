import { useEffect, useState } from "react"
import MovieItem from "./MovieItem"
import Loader from "./Loader"


function Movies() {
  const [movies, setMovies] = useState([]);
  const [displayedMoviesIds, setDisplayedMoviesIds] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMovies = async () => {
    setIsloading(true);
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=${process.env.API_KEY}`);
    const data = await response.json();

    const filteredMovies = data.results.filter((movie) => !displayedMoviesIds.includes(movie.id));
    setMovies([...movies, ...filteredMovies]);

    setDisplayedMoviesIds((prevDisplayedMoviesIds) => [
      ...prevDisplayedMoviesIds,
      ...data.results.map((movie) => movie.id)
    ]);
    /*setMovies([...movies, ...data.results]);*/
    setIsloading(false);
  }

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handleShowMore = () => {
    setIsloading(true)
    setPage(page + 1);
  }

  console.log(movies)

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <div className="movies-container">
        {movies.map(movie => (
          <MovieItem key={movie.id} poster={movie.poster_path} movieId={movie.id}/>
        ))}
      </div>
      <button className="show-more-btn" onClick={handleShowMore}>Más Películas</button>
    </>
  )
}

export default Movies