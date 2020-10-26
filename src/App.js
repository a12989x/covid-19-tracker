import React, { useContext } from 'react';
import Select from 'react-select';

import { CovidContext } from './contexts/CovidContext';

const App = () => {
    const { countries, onCountryChange } = useContext(CovidContext);

    return (
        <div className='app'>
            <p>App Component</p>
            <Select
                options={countries}
                defaultValue={countries[217]}
                value={countries[217]}
                onChange={onCountryChange}
            />
        </div>
    );
};

export default App;
