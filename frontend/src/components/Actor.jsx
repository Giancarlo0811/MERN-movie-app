
function Actor({character, name, profile}) {
  return (
    <div className="actor-card">
        {profile == null && 
            <h1>Actor sin foto</h1>
        }
        {profile != null &&
            <img src={`https://image.tmdb.org/t/p/original${profile}`} alt="" />
        }
        <h2>{name}</h2>
        <h3>Personaje: {character}</h3>
    </div>
  )
}

export default Actor