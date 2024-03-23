import { useState, useEffect, useContext } from "react"
import {useParams, useNavigate} from 'react-router-dom'
import Loader from "../components/Loader"
import FavoriteMovie from "../components/FavoriteMovie"
import { UserContext } from "../context/userContext"
import axios from 'axios'

function Favorites() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);

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

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="container favorite-movies">
      {favoriteMovies.length > 0 ? 
        favoriteMovies.map(movie => (
          <FavoriteMovie key={movie.movieId} movieId={movie.movieId} title={movie.movieTitle} poster={movie.moviePoster}/>
        )) : 
        <h2 style={{textAlign: 'center'}}>No tienes películas favoritas</h2>
      }
    </div>
  )
}

export default Favorites