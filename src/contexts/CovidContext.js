import React, { useState, useEffect, createContext } from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

import casesTypeColors from '../casesTypeColors';

export const CovidContext = createContext();

const CovidContextProvider = ({ children }) => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState({
        label: '',
        value: '',
    });
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [graphData, setGraphData] = useState({});
    const [casesType, setCasesType] = useState('cases');
    const [mapCenter, setMapCenter] = useState({
        lat: 34.80746,
        lng: -40.4796,
    });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);

    useEffect(() => {
        const getCountriesData = async () => {
            const response = await fetch(
                'https://disease.sh/v3/covid-19/countries'
            );
            const data = await response.json();

            const countries = data.map((country) => ({
                label: country.country,
                value: country.countryInfo.iso2,
            }));
            const worldwide = { label: 'Worldwide', value: 'worldwide' };
            countries.push(worldwide);

            const sortedData = sortData(data);
            setTableData(sortedData);
            setCountries(countries);
            setMapCountries(data);
        };

        const getAllCountryInfo = async () => {
            const response = await fetch('https://disease.sh/v3/covid-19/all');
            const data = await response.json();
            setCountryInfo(data);
        };

        getCountriesData();
        getAllCountryInfo();
    }, []);

    useEffect(() => {
        const getGraphDataLastDays = async () => {
            const response = await fetch(
                'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
            );
            const data = await response.json();
            const chartData = buildChartData(data, casesType);
            setGraphData(chartData);
        };

        getGraphDataLastDays();
    }, [casesType]);

    const onCountryChange = async (e) => {
        const countryLabel = e.label;
        const countryCode = e.value;
        setCountry({ label: countryLabel, value: countryCode });

        const url =
            countryCode === 'worldwide'
                ? 'https://disease.sh/v3/covid-19/all'
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        const response = await fetch(url);
        const data = await response.json();
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
    };

    const buildChartData = (data, casesType) => {
        const chartData = [];
        let lastDataPoint;

        for (let date in data.cases) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint,
                };

                chartData.push(newDataPoint);
            }

            lastDataPoint = data[casesType][date];
        }

        return chartData;
    };

    const sortData = (data) => {
        const sortedData = [...data];

        sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

        return sortedData;
    };

    const showDataOnMap = (data, casesType) =>
        data.map((country) => (
            <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                color={casesTypeColors[casesType].hex}
                fillColor={casesTypeColors[casesType].hex}
                radius={
                    Math.sqrt(country[casesType]) *
                    casesTypeColors[casesType].multiplier
                }
            >
                <Popup>
                    <img src={`${country.countryInfo.flag}`} alt='' />
                    <h3>{country.country}</h3>
                    <p>Cases: {numeral(country.cases).format('0,0')}</p>
                    <p>Recovered: {numeral(country.recovered).format('0,0')}</p>
                    <p>Deaths: {numeral(country.deaths).format('0,0')}</p>
                </Popup>
            </Circle>
        ));

    const prettyPrintStat = (stat) =>
        stat ? `+${numeral(stat).format('0.0a')}` : '+0';

    return (
        <CovidContext.Provider
            value={{
                casesType,
                setCasesType,
                countries,
                country,
                tableData,
                graphData,
                countryInfo,
                mapCenter,
                mapZoom,
                mapCountries,
                onCountryChange,
                showDataOnMap,
                prettyPrintStat,
            }}
        >
            {children}
        </CovidContext.Provider>
    );
};

export default CovidContextProvider;
