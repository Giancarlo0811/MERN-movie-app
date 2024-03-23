import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'

function Register() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
      const newUser = await response.data;
      console.log(newUser);
      if(!newUser) {
        setError('El usuario no pudo ser registrado. Por favor, intenta de nuevo');
      }
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  return (
    <div className="container register">
      <h2>Registrarse</h2>
        <form action="" className="form register-form" onSubmit={registerUser}>
          {error && 
            <p className="form-error-message">{error}</p>
          }
          <input 
            type="text" 
            placeholder="Nombre Completo" 
            name="name"
            value={userData.name} 
            onChange={inputHandler}
          />
          <input 
            type="email" 
            placeholder="Correo" 
            name="email"
            value={userData.email} 
            onChange={inputHandler}
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            name="password"
            value={userData.password} 
            onChange={inputHandler}
          />
          <input 
            type="password" 
            placeholder="Confirmar Contraseña" 
            name="password2"
            value={userData.password2} 
            onChange={inputHandler}
          />
          <button type="submit" className="btn-form">Registrarse</button>
        </form>
        <p>¿Ya tienes una cuenta? <Link to='/login'>Iniciar Sesión</Link></p>
    </div>
  )
}

export default Register