import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import Card from "../MovieProject/Components/Card/Card";
import "./Auth.css";


const Hoome = ({ movies = [] }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.clear();
    alert("Logged out. Think twice 😉");
    navigate("/");
  };

  return (
    <div className="homeContent">
      {/* <button onClick={handleLogout} className="logoutBtn">Logout</button> */}
      <div className="movie-cards">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Hoome;
