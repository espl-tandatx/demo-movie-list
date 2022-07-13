import './App.css';
import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList'
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddToFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {

	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('action');
	const [favourites, setFavourites] = useState([]);

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();
		// console.log("responseJson", responseJson)
		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	const saveToLocalStorage = (items) => {
		localStorage.setItem('favourites', JSON.stringify(items));
	};
	
	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('favourites')
		)|| [];

		setFavourites(movieFavourites);
	}, []);

	return (
	<div className='container movie-app'>
		<div className='wrapper'>
			<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			<h3>Movies</h3>
			<div className='d-flex'>			
				<MovieList
					movies={movies}
					favouriteComponent={AddFavourites}
					handleFavouritesClick={addFavouriteMovie}
				/>
			</div>
		</div>

		<div className="wrapper" id="favourite">
			<h3>Favourites</h3>
			<div className='d-flex'>
				<MovieList 
					movies={favourites}
					handleFavouritesClick={removeFavouriteMovie}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
	</div>
	);
}

export default App;
