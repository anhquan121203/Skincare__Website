import React from 'react'
import "./Banner.css"
import { Link } from 'react-router-dom'

function Banner() {
  return (
    <div className="banner animate">
        <div className="banner-content">
          <h1 className="title animate">Welcome to Beauty city</h1>
          <p className="description animate">
            Aenean laoreet praesent in nunc vel urna consequat mattis eget vel
            libero. Phasellus pellentesque Proin tempus tempor diam, non
            pellentesque quam ornare vel.
          </p>
          <Link to="/product">
            <button className="shop-now animate">Shop Now</button>
          </Link>
        </div>
      </div>
  )
}

export default Banner