import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios'
import { UserContext } from "../context/userContext";

function AddFavorite({movieId, movieTitle, moviePoster}) {

  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;

  const navigate = useNavigate();

  const movieData = {
    movieId,
    movieTitle,
    moviePoster
  }

  const [error, setError] = useState('');

  const addToFavorite = async () => {
    //e.preventDefault();
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
  <button className="favorite-btn" onClick={addToFavorite}>Agregar a Favoritos</button>
  )
}

export default AddFavorite