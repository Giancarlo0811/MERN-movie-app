import { Link } from "react-router-dom"


function ErrorPage() {
  return (
    <div className="container error">
      <div className="error-page">
      <Link to='/' className="error-btn">Volver al Inicio</Link>
      <h2>Página No Encontrada</h2>
      </div>
    </div>
  )
}

export default ErrorPage