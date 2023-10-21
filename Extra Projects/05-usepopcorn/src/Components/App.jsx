import {useEffect, useState} from 'react';

import {NavBar} from './NavBar';
import {Main} from './Main';
import {Search} from './Search';
import {NumResults} from './NumResults';
import {Box} from './Box';
import {MovieList} from './MovieList';
import {WatchedMovieList} from './WatchedMovieList';
import {WatchedSummery} from './WatchedSummery';
import {Loader} from './Loader';

export const tempMovieData = [
    {
        imdbID: 'tt1375666',
        Title: 'Inception',
        Year: '2010',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    },
    {
        imdbID: 'tt0133093',
        Title: 'The Matrix',
        Year: '1999',
        Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
    },
    {
        imdbID: 'tt6751668',
        Title: 'Parasite',
        Year: '2019',
        Poster: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
    },
];

const tempWatchedData = [
    {
        imdbID: 'tt1375666',
        Title: 'Inception',
        Year: '2010',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: 'tt0088763',
        Title: 'Back to the Future',
        Year: '1985',
        Poster: 'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

const KEY = '933383e2';
const OMDBURL = `https://www.omdbapi.com/?apikey=${KEY}`;
const QUERY = 'strpider';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(function () {
        return async function () {
            try {
                setIsLoading(true);
                const res = await fetch(`${OMDBURL}&s=${QUERY}`);

                if (!res.ok)
                    throw new Error('⛔ Something went wrong in Fetching...');

                const data = await res.json();

                if (data.Response === 'False')
                    throw new Error('😣 Movie Not Found.');
                setMovies(data.Search);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
    }, []);

    return (
        <>
            <NavBar>
                <Search />
                <NumResults movies={movies} />
            </NavBar>

            <Main movies={movies}>
                <Box>
                    {/* {isLoading ? <Loader /> :  <MovieList movies={movies} />} */}
                    {isLoading && <Loader />}
                    {error && <ErrorMessage message={error} />}
                    {!isLoading && !error && <MovieList movies={movies} />}
                </Box>

                <Box>
                    <WatchedSummery watched={watched} />
                    <WatchedMovieList watched={watched} />
                </Box>
            </Main>
        </>
    );
}

function ErrorMessage({message}) {
    return <p className="error">{message}</p>;
}
