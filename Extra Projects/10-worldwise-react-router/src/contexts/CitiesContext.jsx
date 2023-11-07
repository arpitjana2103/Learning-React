/* eslint-disable react-refresh/only-export-components */
import {createContext, useState, useEffect, useContext} from 'react';

const CitiesContext = createContext();
const URL = `http://localhost:8000`;

function CitiesProvider({children}) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentCity, setCurrentCity] = useState({});

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${URL}/cities`);
                const data = await res.json();
                setCities(data);
                setIsLoading(false);
            } catch (error) {
                alert('There was an Error in loading data...');
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
            setIsLoading(false);
        } catch (error) {
            alert('There was an Error in loading data...');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
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