import Movies from './components/Movies';
import { useState, useEffect } from 'react';
import { APIKEY } from './env.js';

import './App.scss';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchField, setSearchField] = useState('');
  const URL = `https://www.omdbapi.com/?s=${searchField}&apikey=${APIKEY}`;

  function getMovies() {
    fetch(encodeURI(URL))
      .then(res => res.json())
      .then(movies => setMovies(movies.Search))
  }

  useEffect(getMovies, []);
  useEffect(getMovies, [searchField]);
  
  let timer;
  function handleChange(event) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      setSearchField(event.target.value);
    }, 1000)
  }

  return (
    <div className="App">
      <input type="text" onChange={handleChange} />
      <Movies movies={movies} />
    </div>
  );
}

export default App;
