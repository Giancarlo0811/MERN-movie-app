import DeleteFavorite from "./DeleteFavorite"

function FavoriteMovie({title, poster}) {
  return (
    <div className="favorite-movie-card">
        <img src={`https://image.tmdb.org/t/p/original/${poster}`} alt="" />
        <h1>{title}</h1>
        <DeleteFavorite />
    </div>
  )
}

export default FavoriteMovie