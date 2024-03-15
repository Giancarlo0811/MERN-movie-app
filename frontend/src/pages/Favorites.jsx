import { useState, useEffect } from "react"
import {useParams} from 'react-router-dom'
import Loader from "../components/Loader"
import FavoriteMovie from "../components/FavoriteMovie"

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="container favorite-movies">
      {favoriteMovies.map(movie => (
        <FavoriteMovie key={movie.id} title={movie.title} poster={movie.poster_path}/>
      ))}
    </div>
  )
}

export default Favorites