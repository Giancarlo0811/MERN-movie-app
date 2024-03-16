import { useEffect, useState } from "react"
import MovieItem from "./MovieItem"
import Loader from "./Loader"
import Search from "../components/Search"

function Movies() {
  const [movies, setMovies] = useState([]);
  const [displayedMoviesIds, setDisplayedMoviesIds] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [page, setPage] = useState(1);
  const [movieName, setMovieName] = useState('');
  const [pageIsGreater, setPageIsGreater] = useState(false);

  const fetchMovies = async () => {
    setPageIsGreater(false);
    setIsloading(true);
    if (movieName.length > 0) {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?page=${page}&query=${movieName}&api_key=${process.env.API_KEY}`);
      const data = await response.json();
      if (page > data.total_pages) {
        setPageIsGreater(true);
        setMovies([]);
        setIsloading(false);
      } else {
        setMovies(data.results);
        setIsloading(false);
      }
    } else {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}&api_key=${process.env.API_KEY}`);
      const data = await response.json();
      const filteredMovies = data.results.filter((movie) => !displayedMoviesIds.includes(movie.id));
      setMovies([...movies, ...filteredMovies]);
      setDisplayedMoviesIds((prevDisplayedMoviesIds) => [
        ...prevDisplayedMoviesIds,
        ...data.results.map((movie) => movie.id)
      ]);
      setIsloading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, [page, movieName]);

  const handleShowMore = () => {
    setIsloading(true);
    setPage(page + 1);
  }

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <Search searchMovie={(text) => {
        setMovieName(text);
        setPage(1);
      }}/>
      <div className="movies-container">
        {pageIsGreater && 
          <h1>No hay más películas</h1>
        }
        {movies.map(movie => (
          <MovieItem key={movie.id} poster={movie.poster_path} movieId={movie.id}/>
        ))}
      </div>
      <button className="show-more-btn" onClick={handleShowMore}>Más Películas</button>
    </>
  )
}

export default Movies