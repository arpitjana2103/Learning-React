/* eslint-disable react-refresh/only-export-components */
import {
    createContext,
    useEffect,
    useContext,
    useReducer,
    useCallback,
} from 'react';

const CitiesContext = createContext();
const URL = `http://localhost:8000`;

const initalState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: '',
};

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: true,
            };
        case 'cities/loaded':
            return {
                ...state,
                cities: action.payload,
                isLoading: false,
            };

        case 'curr-city/loaded':
            return {
                ...state,
                currentCity: action.payload,
                isLoading: false,
            };

        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };

        case 'city/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(function (city) {
                    return city.id !== action.payload.cityId;
                }),
            };

        case 'rejected':
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };

        default:
            throw new Error('Unknown action type');
    }
}

function CitiesProvider({children}) {
    const [{cities, isLoading, currentCity}, dispatch] = useReducer(
        reducer,
        initalState
    );

    useEffect(function () {
        async function loadCities() {
            dispatch({type: 'loading'});
            try {
                const res = await fetch(`${URL}/cities`);
                const data = await res.json();
                dispatch({type: 'cities/loaded', payload: data});
            } catch (error) {
                dispatch({
                    type: 'rejected',
                    payload: 'There was an Error in loading cities...',
                });
            }
        }
        loadCities();
    }, []);

    async function createCity(newCity) {
        dispatch({type: 'loading'});
        try {
            const res = await fetch(`${URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            dispatch({type: 'city/created', payload: data});
        } catch (error) {
            dispatch({
                type: 'rejected',
                payload: 'There was an Error in creating city...',
            });
        }
    }

    const getCity = useCallback(
        async function getCity(id) {
            if (Number(id) === currentCity.id) return;
            dispatch({type: 'loading'});
            try {
                const res = await fetch(`${URL}/cities/${id}`);
                const data = await res.json();
                dispatch({type: 'curr-city/loaded', payload: data});
            } catch (error) {
                dispatch({
                    type: 'rejected',
                    payload: 'There was an Error in loading city...',
                });
            }
        },
        [currentCity.id]
    );

    async function deleteCity(id) {
        dispatch({type: 'loading'});
        try {
            await fetch(`${URL}/cities/${id}`, {
                method: 'DELETE',
            });

            dispatch({type: 'city/deleted', payload: {cityId: id}});
        } catch (error) {
            dispatch({
                type: 'rejected',
                payload: 'There was an Error in deleting city...',
            });
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                createCity,
                deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    const context = useContext(CitiesContext);

    if (context === undefined) {
        throw new Error('CitiesContext was used outside the CitiesProvider.');
    }
    return context;
}

export {CitiesProvider, useCities};
