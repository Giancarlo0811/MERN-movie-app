import DeleteFavorite from "./DeleteFavorite"

function FavoriteMovie({movieId, title, poster}) {
  return (
    <div className="favorite-movie-card">
        <img src={`https://image.tmdb.org/t/p/original/${poster}`} alt="" />
        <h1>{title}</h1>
        <DeleteFavorite movieId={movieId}/>
    </div>
  )
}

export default FavoriteMovie