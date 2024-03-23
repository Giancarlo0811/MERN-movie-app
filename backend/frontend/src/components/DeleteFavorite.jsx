import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import { UserContext } from "../context/userContext"

function DeleteFavorite({movieId}) {

  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;

  const navigate = useNavigate();

  const deleteFavorite = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/movies/remove-favorite/${movieId}`,
      { withCredentials: true, 
        headers: {Authorization: `Bearer ${token}`}
      });
      if (response.status = 200) {
        window.location.reload(); 
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <button className="delete-fav-btn" onClick={deleteFavorite}>Eliminar</button>
  )
}

export default DeleteFavorite