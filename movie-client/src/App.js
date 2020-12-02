import React, { useReducer, useEffect } from 'react';
import { moviesReducer, initialState } from './store/Movies.store'
import MoviesCard from './components/MoviesCard'

import './assets/scss/index.scss'

const App = () => {
  const [state, dispatch] = useReducer(moviesReducer, initialState)
  const { movies, loading, errorMessage } = state;
  
  const loadData = async () => {
    fetch(`http://localhost:5000/`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain',
          'X-Api-Key': '95e41df0-5848-42f9-b3c7-e765753bffd0'
        }
      })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.error) {
          dispatch({
            type: "UPDATE_MOVIES_SUCCESS",
            payload: jsonResponse.Search
        })
        } else  {
          dispatch({
            type: "SEARCH_MOVIES_FAIL",
            payload: jsonResponse.error.message
          })
        }
      }).catch(err => {
        console.log(err)
      })
  }

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      let value = e.target.value
      fetch(`http://localhost:5000/search?q=${value}`)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIES_REQUEST",
          payload: jsonResponse
        })
      })
   } else {
    loadData()
   }
  }

  const handleChangeYear = (e) => {
    let year = movies.filter((ele) => {
      return ele.Year.includes(e.target.value)
    })
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
      payload: year
    })
    if(e.target.value.length <= 0) {
      loadData()
    }
  }

  const handleChangeType = (e) => {
    let type = movies.filter((ele) => {
      return ele.Type.includes(e.target.value)
    })
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
      payload: type
    })
    if(e.target.value.length <= 0) {
      loadData()
    }
  }

  useEffect(() => {
    loadData()
  }, [])
  
  return (
      <div>
        <header>Movies List</header>
        <div className='container'>
          <div className='search'>
            <div>
              <label>Title: </label>
              <input
                className='search-input'
                type='text'
                name='search'
                placeholder='Search ...'
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Year: </label>
              <input
                className='search-input'
                type='text'
                name='search'
                placeholder='Search ...'
                onChange={handleChangeYear}
              />
              </div>
              <div>
              <label>Type: </label>
              <input
                className='search-input'
                type='text'
                name='search'
                placeholder='Search ...'
                onChange={handleChangeType}
              />
              </div>
            </div>
             <ul className='movie-cards'>
          { loading && !errorMessage ? (
            <p>Loading...</p>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            movies.map((movie, index) => {
              return (
                <MoviesCard key={index} movie={movie} />
              )
            })
          )} 
          </ul>
        </div>
      </div>
  )
}

export default App