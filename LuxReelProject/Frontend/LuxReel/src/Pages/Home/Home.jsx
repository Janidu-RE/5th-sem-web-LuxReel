import CardGrid from '@/components/CardGrid/CardGrid'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import React, { useRef } from 'react'
import "./Home.css"

const Home = () => {
  const moviesRef = useRef(null);

  const scrollToMovies = () => {
    if (moviesRef.current) {
      moviesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar/>
      <section className="movie-banner">
        <div className="banner-overlay">
          <div className="banner-content">
            <h1 className="banner-title">Welcome to LuxReel</h1>
            <p className="banner-subtitle">
              Watch trailers, book tickets, and explore upcoming releases
            </p>
            <button className="banner-button" onClick={scrollToMovies}>
              Book Now
            </button>
          </div>
        </div>
      </section>

      <section className="home-section" ref={moviesRef}>
        <h1 className="home-title">Now Showing</h1>
        <CardGrid status="now_showing" />
      </section>

      <section className="home-section">
        <h1 className="home-title">Coming Soon</h1>
        <CardGrid status="coming_soon" />
      </section>

      <Footer/>
    </div>
  )
}

export default Home
