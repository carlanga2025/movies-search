import { useState } from "react";


function MovieApp() {

  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);

  const urlBase = 'https://api.themoviedb.org/3/search/movie'
  const apiKey = 'd38fc18d09ea5e6fc82fbae3b4b5cd5c'

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const fetchPeliculas = async () => {
    try {
      const response = await fetch(`${urlBase}?query=${search}&api_key=${apiKey}`);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Ocurrio un error', error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPeliculas()
  }

  return (
    <div className="container">
      <h1 className="title">Movie Search</h1>
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder="Enter a movie title"
          value={search}
          onChange={handleChange} />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieApp;

