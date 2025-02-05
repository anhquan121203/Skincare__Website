import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import Banner from "./Banner/Banner";

function HomePage() {
  return (
    <div className="home-page">

      {/* Banner */}
      <Banner/>

      
    </div>
  );
}

export default HomePage;
