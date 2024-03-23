import { Link } from "react-router-dom"
import {FaBars} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"
import { MdMovie } from "react-icons/md";
import { useState, useContext } from "react"
import { UserContext } from "../context/userContext";

function Header() {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true :false);
  const {currentUser} = useContext(UserContext);

  const closeNavHandler = () => {
    if(window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  }

  return (
    <nav>
      <div className="container nav-container">
        <Link to='/' className="nav-logo" onClick={closeNavHandler}><MdMovie /> PELICULAS</Link>
        {currentUser?.id && isNavShowing &&
          <ul className="nav-menu">
            <li onClick={closeNavHandler} className="username">{currentUser?.name}</li>
            <li><Link to={`/movies/favorites/${currentUser?.id}`} onClick={closeNavHandler}>Películas Favoritas</Link></li>
            <li><Link to='/logout' onClick={closeNavHandler}>Salir</Link></li>
          </ul>
        }
        {!currentUser?.id && isNavShowing &&
          <ul className="nav-menu">
            <li><Link to='/register' onClick={closeNavHandler}>Registrarse</Link></li>
            <li><Link to='/login' onClick={closeNavHandler}>Iniciar Sesión</Link></li>
          </ul>
        }
        <button className="nav-toggle-btn" onClick={() => setIsNavShowing(!isNavShowing)}>
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  )
}

export default Header