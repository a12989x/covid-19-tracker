import React, { useContext } from 'react';
import Select from 'react-select';

import { CovidContext } from './contexts/CovidContext';

import InfoBox from './components/InfoBox';
import Table from './components/Table';
import Graph from './components/Graph';
import Map from './components/Map';

const App = () => {
    const { countries, country, countryInfo, onCountryChange } = useContext(
        CovidContext
    );

    return (
        <div className='app'>
            <p>App Component</p>
            <Select
                options={countries}
                defaultValue={country.value}
                defaultInputValue={country.label}
                onChange={onCountryChange}
            />

            <InfoBox
                title='Coronavirus Cases'
                cases={countryInfo.todayCases}
                total={countryInfo.cases}
            />
            <InfoBox
                title='Recovered'
                cases={countryInfo.todayRecovered}
                total={countryInfo.recovered}
            />
            <InfoBox
                title='Deaths'
                cases={countryInfo.todayDeaths}
                total={countryInfo.deaths}
            />

            <Table />
            <Graph />
            <Map />
        </div>
    );
};

export default App;
