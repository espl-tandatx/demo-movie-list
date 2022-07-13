import React from 'react';
const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;
	const url = '#favourite';
    return (
        <React.Fragment>
			{props.movies.map((movie, index) => (				
					<div className='image-item' key={index}>
						<img src={movie.Poster} alt='movie'></img>
						<h4><a href={url}>{movie.Title}</a></h4>
						<a href={url} className='add-favourite' onClick={() => props.handleFavouritesClick(movie)}>
							<FavouriteComponent />
						</a>
					</div>
			))}
		</React.Fragment>
    );
}

export default MovieList;