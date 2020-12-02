import React from 'react'

const MoviesCard = ( movie ) => {
  return (
      <li>
          <h4>{movie.movie.Title}</h4>
          <div className='poster'>
          <img src={movie.movie.Poster} alt='Poster' />
          </div>
          <p>{movie.movie.Type}</p>
          <p>{movie.movie.Year}</p>
      </li>
  )
}

export default MoviesCard
