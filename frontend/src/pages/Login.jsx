import { useState } from "react"
import { Link } from "react-router-dom"


function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const inputHandler = (e) => {
    setUserData(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  return (
    <div className="container login">
      <h2>Iniciar Sesión</h2>
      <form action="" className="form login-form">
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