import {useEffect, useState} from 'react';

const KEY = '933383e2';
const OMDBURL = `https://www.omdbapi.com/?apikey=${KEY}`;

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(
        function () {
            const controller = new AbortController();
            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError('');
                    const res = await fetch(`${OMDBURL}&s=${query}`, {
                        signal: controller.signal,
                    });

                    if (!res.ok)
                        throw new Error(
                            '⛔ Something went wrong in Fetching...'
                        );

                    const data = await res.json();

                    if (data.Response === 'False')
                        throw new Error('😣 Movie Not Found.');

                    setMovies(data.Search);
                } catch (error) {
                    if (error.name !== 'AbortError') setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            }
            if (query.length < 3) {
                setMovies([]);
                setError('');
                return;
            }

            fetchMovies();

            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return [movies, isLoading, error];
}
