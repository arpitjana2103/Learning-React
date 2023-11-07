import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import './index.css';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

import {CitiesProvider} from './contexts/CitiesContext';

function App() {
    return (
        <div>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Homepage />} />
                        <Route path="product" element={<Product />} />
                        <Route path="pricing" element={<Pricing />} />
                        <Route path="Login" element={<Login />} />
                        <Route path="App" element={<AppLayout />}>
                            <Route
                                index
                                element={<Navigate replace to="cities" />}
                            />
                            <Route path="cities" element={<CityList />} />
                            <Route path="cities/:id" element={<City />} />
                            <Route path="countries" element={<CountryList />} />
                            <Route path="form" element={<Form />} />
                        </Route>
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </div>
    );
}

export default App;
