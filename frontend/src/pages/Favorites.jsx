import { useState, useEffect, useContext } from "react"
import {useParams, useNavigate} from 'react-router-dom'
import Loader from "../components/Loader"
import FavoriteMovie from "../components/FavoriteMovie"
import { UserContext } from "../context/userContext"
import axios from 'axios'

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState('');

  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();

  // redirect to login page to any user who isn't logged in
  useEffect(() => {
    if(!token) {
      navigate('/login');
    }
  }, []);

  const getFavoriteMovies = async () => {
    setError('');
    setIsloading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/movies/get-favorites/${currentUser?.id}`,
      { withCredentials: true, 
        headers: {Authorization: `Bearer ${token}`}
      });
      setFavoriteMovies(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
    setIsloading(false);
  }

  useEffect(() => {
    getFavoriteMovies();
  }, []);

  console.log(favoriteMovies)

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="container favorite-movies">
      {favoriteMovies.map(movie => (
        <FavoriteMovie key={movie.movieId} movieId={movie.movieId} title={movie.movieTitle} poster={movie.moviePoster}/>
      ))}
    </div>
  )
}

export default Favorites