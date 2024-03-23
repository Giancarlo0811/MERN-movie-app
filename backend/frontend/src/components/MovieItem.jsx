import { Link } from "react-router-dom"

function MovieItem({poster, movieId}) {
  return (
    <div className="movie-card">
      <Link to={`/movies/${movieId}`}><img src={`https://image.tmdb.org/t/p/original/${poster}`} alt="" /></Link>
    </div>
  )
}

export default MovieItem