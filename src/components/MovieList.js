import React from 'react';
const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;
    return (
        <>
			{props.movies.map((movie, index) => (
				<React.Fragment key={index}>
					<div className='image-item'>
						<img src={movie.Poster} alt='movie'></img>
						<h4><a>{movie.Title}</a></h4>
						<a className='add-favourite' onClick={() => props.handleFavouritesClick(movie)}>
							<FavouriteComponent />
						</a>
					</div>
				</React.Fragment>
				
			))}
		</>
    );
}

export default MovieList;