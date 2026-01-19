import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./movie-info.css";
import { toast } from "react-toastify";


function Movies() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovie() {
           await api.get(`/movie/${id}`, {
                params: {
                    api_key: "dd423acc844a7bfa709306420de5da6a",
                    language: "pt-BR"
                }
            })
            .then((response) => {
                setMovie(response.data);
                setLoading(false);
            })
            .catch(() => {
                console.log("Filme não encontrado");
                navigate("/", { replace: true });
                return;
            })
        }
        loadMovie();

        return () => {
            console.log("Componente desmontado");
        }   
    }, [navigate, id]);

    function movieSave() {
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasMovie = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === movie.id)
    if(hasMovie) {
        toast.warn("Esse filme já está na sua lista!");
        return;
    }

    filmesSalvos.push(movie);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
}

    if(loading) {
        return (
            <div className="movie-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }   

    
  return (
    <div className="movie-info">
        <h1>{movie.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={movie.title} />
        <h3>Sinopse</h3>
        <span>{movie.overview}</span>
        <strong>Avaliação: {movie.vote_average} / 10</strong>

        <div className="area-buttons">
            <button onClick={movieSave}>Salvar</button>
            <button> 
                <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${movie.title} trailer`}>Trailer</a>
            </button>
        </div>
    </div>
  )
}

export default Movies;
