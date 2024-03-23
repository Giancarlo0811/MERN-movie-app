import { useState } from "react"

function Search({searchMovie}) {
    const [movieName, setMovieName] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        searchMovie(movieName);
    }

  return (
    <form action="" onSubmit={onSubmit}>
        <input type="text" placeholder="Nombre de la película" className="search-bar"
            onChange={(e) => {
                setMovieName(e.target.value)
            }}
        />
        <button type="submit" className="search-btn">Buscar</button>
    </form>
  )
}

export default Search