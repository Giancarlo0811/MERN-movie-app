import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Home from './pages/Home.jsx'
import MovieDetails from './pages/MovieDetails.jsx'
import Favorites from './pages/Favorites.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Logout from './pages/Logout.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />},
      {path: 'movies/:id', element: <MovieDetails />},
      {path: 'movies/favorites/:id', element: <Favorites />},
      {path: 'register', element: <Register />},
      {path: 'login', element: <Login />},
      {path: 'logout', element: <Logout />}
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
