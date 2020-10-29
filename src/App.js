import React, { useContext } from 'react';
import Select from 'react-select';

import { CovidContext } from './contexts/CovidContext';

import InfoBox from './components/InfoBox';
import Table from './components/Table';
import Graph from './components/Graph';
import Map from './components/Map';

const App = () => {
    const {
        countries,
        country,
        countryInfo,
        casesType,
        setCasesType,
        onCountryChange,
        prettyPrintStat,
    } = useContext(CovidContext);

    return (
        <div className='app'>
            <section className='header'>
                <h1>Coronavirus Tracker</h1>
                <Select
                    options={countries}
                    defaultValue={country.value}
                    defaultInputValue={country.label}
                    onChange={onCountryChange}
                />
            </section>

            <section className='infoBoxes'>
                <InfoBox
                    title='Coronavirus Cases'
                    cases={prettyPrintStat(countryInfo.todayCases)}
                    total={prettyPrintStat(countryInfo.cases)}
                    active={casesType === 'cases'}
                    onClick={() => setCasesType('cases')}
                />
                <InfoBox
                    title='Recovered'
                    cases={prettyPrintStat(countryInfo.todayRecovered)}
                    total={prettyPrintStat(countryInfo.recovered)}
                    active={casesType === 'recovered'}
                    onClick={() => setCasesType('recovered')}
                />
                <InfoBox
                    title='Deaths'
                    cases={prettyPrintStat(countryInfo.todayDeaths)}
                    total={prettyPrintStat(countryInfo.deaths)}
                    active={casesType === 'deaths'}
                    onClick={() => setCasesType('deaths')}
                />
            </section>

            <Table />
            <Graph />
            <Map />
        </div>
    );
};

export default App;
