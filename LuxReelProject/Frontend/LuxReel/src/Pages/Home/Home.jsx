import CardGrid from '@/components/CardGrid/CardGrid'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'
import "./Home.css"

const Home = () => {
  return (
    <div>
      <Navbar/>
      <section className="home-section">
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

