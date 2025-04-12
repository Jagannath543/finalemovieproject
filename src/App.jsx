import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MovieHome from './MovieProject/Pages/Home/Home';
import About from './MovieProject/Pages/About/About';
import Contact from './MovieProject/Pages/Contact/Contact';
import Movie from "./MovieProject/Pages/Movie/Movie";
import ActorDetails from './MovieProject/Pages/Actors/ActorDetails';

import Login from './firebase-Authentication/Login';
import Signup from './firebase-Authentication/Signup';
import Hoome from './firebase-Authentication/Hoome';

import Layout from './Layout'; 

const baseUrl = "https://api.themoviedb.org/3";
const api_key = "94ad1dc27cfaadc07bdc15b1f4c85579";

const App = () => {
  const [movie, setMovie] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(`${baseUrl}/movie/popular`, {
        params: { api_key },
      });
      setMovie(response.data.results);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const fetchSearchMovies = async (query = "") => {
    try {
      const response = await axios.get(`${baseUrl}/search/movie`, {
        params: { api_key, query },
      });
      setMovie(response.data.results);
    } catch (error) {
      console.error("Error fetching search movies:", error);
    }
  };

  useEffect(() => {
    search === "" ? fetchPopularMovies() : fetchSearchMovies(search);
  }, [search]);

  return (
    <Router> {/* ✅ useLocation is now safe in children */}
      <Routes>
        {/* Routes without layout (no navbar/footer) */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Routes with layout */}
        <Route element={<Layout setSearch={setSearch} />}>
          <Route path="/home" element={<Hoome movies={movie} />} />
          <Route path="/movies" element={<MovieHome movies={movie} />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/actor/:actorId" element={<ActorDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
