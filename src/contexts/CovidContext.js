import React, { useState, useEffect, createContext } from 'react';

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
            const chartData = buildChartData(data, 'cases');
            setGraphData(chartData);
        };

        getGraphDataLastDays();
    }, [casesType]);

    const onCountryChange = async (e) => {
        const countryLabel = e.label;
        const countryCode = e.value;
        setCountry({ label: countryLabel, value: countryCode });
        console.log(countryCode);

        const url =
            countryCode === 'worldwide'
                ? 'https://disease.sh/v3/covid-19/all'
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        const response = await fetch(url);
        const data = await response.json();
        setCountryInfo(data);
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

    return (
        <CovidContext.Provider
            value={{
                countries,
                country,
                tableData,
                graphData,
                countryInfo,
                onCountryChange,
            }}
        >
            {children}
        </CovidContext.Provider>
    );
};

export default CovidContextProvider;
