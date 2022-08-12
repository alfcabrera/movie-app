import { useState } from "react";
import "./App.css";
import Axios from "axios";

function App() {
	/* It's setting the initial state of the movie and movieList objects to an empty string and an empty
	array, respectively. */
	const [movie, setMovie] = useState("");
	const [movieList, setMovieList] = useState([]);

	/**
	 * The function searchMovie() is an asynchronous function that uses the Axios library to make a GET
	 * request to the MovieDB API. The response is then mapped over and the title, overview, and
	 * poster_path are returned
	 */

	const searchMovie = async () => {
		const API_KEY = "8a28a77db7baa9ca65c1324ab8f10743";
		const { data } = await Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movie}`);
		setMovieList(
			data.results.map((el) => ({
				title: el.title,
				overview: el.overview,
				poster_path: el.poster_path,
				release_date: el.release_date,
				vote_average: el.vote_average,
				year: el.release_date.substring(0, 4),
			}))
		);
	};

	return (
		<div className="wrapper">
			<h1 className="title">The Movie Database</h1>
			<input
				className="input is-primary mb-2"
				type="text"
				name="movie"
				placeholder="Search a movie..."
				onChange={(e) => {
					setMovie(e.target.value);
				}}
			/>

			{/* It's calling the searchMovie() function when the button is clicked. */}
			<button className="button is-link" onClick={searchMovie}>
				Search!
			</button>

			{/* It's checking if the movieList array has a length greater than 0. If it does, it will render the
			h2 tag with the text "Results:". If it doesn't, it will not render anything. */}
			{movieList.length > 0 && <h2 className="subtitle mt-5">Results:</h2>}

			<div className="is-flex is-flex-direction-column mt-5">
				{/* It's mapping over the movieList array and returning the title, overview, and poster_path. */}
				{movieList.map((el, key) => (
					<article className="media" key={key}>
						<figure className="media-left">{<img src={el.poster_path != null ? `https://image.tmdb.org/t/p/w500${el.poster_path}` : `https://via.placeholder.com/128x192`} width={128} title={el.title} />}</figure>
						<div className="media-content">
							<div className="content">
								<p className="mb-0">
									<strong>{el.title}</strong>
								</p>
								<small>{el.vote_average != null && `${el.vote_average}/10`}</small>
								<p>
									<em>{`Released in ${el.year}`}</em>
								</p>
								<p>{el.overview}</p>
							</div>
						</div>
					</article>
				))}
			</div>
		</div>
	);
}

export default App;
