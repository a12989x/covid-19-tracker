import React from 'react';
import ReactDOM from 'react-dom';

import CovidContextProvider from './contexts/CovidContext';

import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <CovidContextProvider>
            <App />
        </CovidContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
