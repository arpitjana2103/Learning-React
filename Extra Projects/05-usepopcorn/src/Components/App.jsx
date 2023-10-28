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
import {MovieDetail} from './MovieDetail';
import {ErrorMessage} from './ErrorMessage';
import {useMovies} from '../Hooks/useMovies';
import {useLocalStarageState} from '../Hooks/useLocalStorageState';

export default function App() {
    const [query, setQuery] = useState('');
    const [selectedId, setSelectedId] = useState();

    // Custom Hooks
    const [watched, setWatched] = useLocalStarageState([], 'watched');
    const [movies, isLoading, error] = useMovies(query);

    function handleSteQuery(query) {
        setQuery(query);
    }

    function handleSelectMovie(id) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    function closeMovieDetail() {
        setSelectedId(null);
    }

    function handleAddWatched(movie) {
        setWatched((wateched) => [...watched, movie]);
    }

    function handleDeleteWatched(id) {
        setWatched(function (watched) {
            setWatched(
                watched.filter(function (movie) {
                    return movie.imdbID !== id;
                })
            );
        });
    }

    return (
        <>
            <NavBar>
                <Search query={query} setQuery={handleSteQuery} />
                <NumResults movies={movies} />
            </NavBar>

            <Main movies={movies}>
                <Box>
                    {isLoading && <Loader />}
                    {error && <ErrorMessage message={error} />}
                    {!isLoading && !error && (
                        <MovieList
                            onSelectMovie={handleSelectMovie}
                            movies={movies}
                        />
                    )}
                </Box>

                <Box>
                    {selectedId ? (
                        <MovieDetail
                            selectedId={selectedId}
                            onCloseMovieDetail={closeMovieDetail}
                            onAddWatched={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummery watched={watched} />
                            <WatchedMovieList
                                watched={watched}
                                onDeleteWatched={handleDeleteWatched}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}
