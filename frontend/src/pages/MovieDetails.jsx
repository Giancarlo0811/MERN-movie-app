import {Link, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import AddFavorite from '../components/AddFavorite'
import ShowActors from '../components/ShowActors'
import Actor from '../components/Actor'

function MovieDetails() {
  const {id} = useParams();
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [showActors, setShowActors] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=es-ES&api_key=${process.env.API_KEY}`)
    .then(response => response.json())
    .then(data => {
      setMovie(data);
      setIsloading(false);
    })
  },[]);

  const getActors = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=es-ES&api_key=${process.env.API_KEY}`)
    .then(response => response.json())
    .then(data => {
      setActors(data.cast);
      setShowActors(true);
    })
  }

  console.log(actors)

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className='container movie-details'>
        <h1 className='movie-title'>{movie.original_title}</h1>
        <div className='movie-details-container'>
          <div className='movie-image'>
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />
          </div>
          <div className='details'>
            <p className='overview'>{movie.overview}</p>
            <div className='genres-container'>
              <h2>Géneros:</h2>
              {movie.genres.map(genre => (
                <div className='genre' key={genre.id}>
                  <p>{genre.name}</p>
                </div>
              ))}
            </div>
            <h2 className='release-date'>Estreno: {movie.release_date}</h2>
            <AddFavorite />
          </div>
        </div>
        {!showActors &&
          <ShowActors handleClick={getActors}/>
        }
        {showActors &&
          <div className='actors-container'>
            {actors.map(actor => (
              <Actor key={actor.id} character={actor.character} name={actor.name} profile={actor.profile_path}/>
            ))}
          </div>
        }
    </div>
  )
}

export default MovieDetails