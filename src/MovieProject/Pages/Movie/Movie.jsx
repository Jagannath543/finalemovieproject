import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import "./movie.css"; // Assuming you have a CSS file

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [trailer, setTrailer] = useState([]);
  const [cast, setCast] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSpecificMovie = (id) => {
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: "94ad1dc27cfaadc07bdc15b1f4c85579",
        },
      })
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching movie details.");
        setLoading(false);
        console.error(error);
      });
  };

  const handleTrailer = () => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
        params: {
          api_key: "94ad1dc27cfaadc07bdc15b1f4c85579",
        },
      })
      .then((response) => {
        setTrailer(response.data.results);
        setShowModal(true);
      })
      .catch((error) => {
        setError("Error fetching trailer.");
        console.error(error);
      });
  };

  const fetchCastData = (id) => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
        params: {
          api_key: "94ad1dc27cfaadc07bdc15b1f4c85579",
        },
      })
      .then((response) => {
        setCast(response.data.cast);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching cast data.");
        setLoading(false);
        console.error(error);
      });
  };

  useEffect(() => {
    if (id) {
      fetchSpecificMovie(id);
      fetchCastData(id);
    }

    // Optional: apply saved theme from localStorage
    const isDark = localStorage.getItem("theme") === "dark";
    document.body.classList.toggle("dark", isDark);
  }, [id]);

  if (loading) {
    return <div className="loader">Loading...</div>; // Style this in movie.css
  }

  if (error) {
    return <div className="error-message">{error}</div>; // Style this too
  }

  return (
    <div className="movie-container">
      <h1>{movie.original_title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        alt={movie.original_title}
        className="movie-backdrop"
      />
      <p>{movie.overview}</p>

      <div className="movie-vote">
        <p>Rating: {movie.vote_average}</p>
        <button onClick={handleTrailer}>Watch Trailer</button>
      </div>

      {showModal && trailer.length > 0 && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              ×
            </span>
            <YouTube
              videoId={trailer[0].key}
              opts={{
                height: "315",
                width: "560",
                playerVars: { autoplay: 1 },
              }}
            />
          </div>
        </div>
      )}

      {cast.length > 0 && (
        <div className="movie-cast">
          <h2>Cast</h2>
          <ul>
            {cast.slice(0, 5).map((actor) => (
              <li key={actor.id} className="actor">
                <Link to={`/actor/${actor.id}`}>
                  <div className="actor-img-container">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                          : "/default-avatar.png"
                      }
                      alt={actor.name}
                      className="actor-img"
                    />
                  </div>
                </Link>
                <div className="actor-info">
                  <p><strong>{actor.name}</strong></p>
                  <p><strong>{actor.character}</strong></p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Movie;
