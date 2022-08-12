import { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
	/* It's setting the initial state of the movie and movieList objects to an empty string and an empty
	array, respectively. */
	const [movie, setMovie] = useState("");
	const [movieList, setMovieList] = useState([]);

	/**
	 * We're using the Axios library to make a GET request to the MovieDB API, and then we're setting the
	 * state of the movieList object to the title, overview, and poster_path of the first result
	 */
	const searchMovie = () => {
		Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=8a28a77db7baa9ca65c1324ab8f10743&query=${movie}`).then((response) => {
			const { title, overview, poster_path } = response.data.results[0];
			return setMovieList({
				title,
				overview,
				poster_path,
			});
		});
	};

	return (
		<div className="wrapper">
			<h1 className="title">The Movie Database</h1>
			<input
				className="input is-primary mb-2"
				type="text"
				name="movie"
				onChange={(e) => {
					setMovie(e.target.value);
				}}
			/>
			<button className="button is-link" onClick={searchMovie}>
				Search!
			</button>
		</div>
	);
}

export default App;
