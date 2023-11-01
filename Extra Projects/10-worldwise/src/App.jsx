import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import CityList from './components/CityList';
import './index.css';
import {useEffect, useState} from 'react';

const URL = `http://localhost:8000`;

function App() {
    const [cities, setCities] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

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

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {/* <Route path="/" element={<Homepage />} /> */}
                    <Route index element={<Homepage />} />
                    <Route path="product" element={<Product />} />
                    <Route path="pricing" element={<Pricing />} />
                    <Route path="Login" element={<Login />} />
                    <Route path="App" element={<AppLayout />}>
                        <Route
                            index
                            element={
                                <CityList
                                    isLoading={isLoading}
                                    cities={cities}
                                />
                            }
                        />
                        <Route
                            path="cities"
                            element={
                                <CityList
                                    isLoading={isLoading}
                                    cities={cities}
                                />
                            }
                        />
                        <Route path="countries" element={<p>Countries</p>} />
                        <Route path="form" element={<p>From</p>} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;