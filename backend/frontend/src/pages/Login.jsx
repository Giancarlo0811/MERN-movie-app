import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import { UserContext } from "../context/userContext";

function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const {setCurrentUser} = useContext(UserContext);

  const inputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = await response.data;
      setCurrentUser(user);
      navigate('/');
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <div className="container login">
      <h2>Iniciar Sesión</h2>
      <form action="" className="form login-form" onSubmit={loginUser}>
            {error && <p className="form-error-message">{error}</p>}
            <input 
              type="email" 
              placeholder="Correo" 
              name="email"
              value={userData.email} 
              onChange={inputHandler}
              autoFocus
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              name="password"
              value={userData.password} 
              onChange={inputHandler}
            />
            <button type="submit" className="btn-form">Iniciar Sesión</button>
          </form>
          <p>¿No tienes una cuenta? <Link to='/register'>Registrarse</Link></p>
    </div>
  )
}

export default Login