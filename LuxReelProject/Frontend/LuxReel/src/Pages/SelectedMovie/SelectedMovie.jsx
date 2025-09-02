import TrailerPlayer from '@/components/MovieDetails/MovieDetails';
import React from 'react'
import { useLocation } from 'react-router-dom'

const SelectedMovie = () => {

    const location = useLocation();
    const { movie } = location.state;

  return (
    <div>
        <TrailerPlayer movie = {movie}/>
      
    </div>
  )
}

export default SelectedMovie
