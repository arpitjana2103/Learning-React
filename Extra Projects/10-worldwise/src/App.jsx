import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import Homepage from './pages/Homepage';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import './index.css';

function App() {
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
                        <Route index element={<p>LIST</p>} />
                        <Route path="cities" element={<p>List of cities</p>} />
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
