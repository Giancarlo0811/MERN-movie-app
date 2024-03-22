import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios'
import { UserContext } from "../context/userContext";

function AddFavorite({movieId, movieTitle, moviePoster, movieAlreadyFavorite}) {

  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;

  const navigate = useNavigate();

  const movieData = {
    movieId,
    movieTitle,
    moviePoster
  }

  const [error, setError] = useState('');

  const addToFavorite = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/movies/add-favorite`,
      movieData,
      { withCredentials: true, 
        headers: {Authorization: `Bearer ${token}`}
      });
      if (response.status = 201) {
        return navigate(`/movies/favorites/${currentUser?.id}`);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <>
      {movieAlreadyFavorite && 
       <h1 className="movie-already-favorite">Película Agregada a Favoritos</h1>
      }
      {!movieAlreadyFavorite && 
        <form action="" onSubmit={addToFavorite}>
          <input type="text" name="movieId" value={movieData.movieId} style={{display: "none"}}/>
          <input type="text" name="movieTitle" value={movieData.movieTitle}  style={{display: "none"}}/>
          <input type="text" name="moviePoster" value={movieData.moviePoster}  style={{display: "none"}}/>
          <button type="submit" className="favorite-btn">Agregar a Favoritos</button>
        </form>
      }
      {error && <p className="form-error-message">{error}</p>}
    </>
  )
}

export default AddFavorite