import { useEffect, useState } from "react";
import api from "../../services/api";   
import { Link } from "react-router-dom";
import './home.css';


function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        async function loadMovies() {
        const response = await api.get("/movie/now_playing", {
            params: {
                api_key: "dd423acc844a7bfa709306420de5da6a",
                language: "pt-BR",
                page: 1
            }
        })
        
        setMovies(response.data.results.slice(0, 10));
        setLoading(false);
    }
        
        loadMovies();




    }, []);


    if(loading) {
        return (
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

  return (
    <div className="container">
      <div className="movie-list">
        {movies.map((movie) => {
            return (
                <article key={movie.id}>
                    <strong>{movie.title}</strong>
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} />
                    <Link to={`/movies/${movie.id}`}>Acessar</Link>
                </article>
            )
        })}
        </div>
    </div>
  )
}

export default Home;
