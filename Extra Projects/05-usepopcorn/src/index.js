import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState} from 'react';
import './index.css';
import App from './Components/App';
import {StarRating} from './Components/StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
    // <React.StrictMode>
    //     {/* <StarRating
    //         maxRating={5}
    //         messages={['terrible', 'bad', 'okk', 'good', 'amazing']}
    //         defaultRating={3}
    //     />
    //     <StarRating maxRating={20} size={24} color="red" /> */}

    // </React.StrictMode>
);
