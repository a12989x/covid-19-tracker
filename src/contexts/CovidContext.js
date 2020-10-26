import React, { useState, useEffect, createContext } from 'react';

export const CovidContext = createContext();

const CovidContextProvider = ({ children }) => {
    const [countries, setCountries] = useState([]);

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
            setCountries(countries);
        };

        getCountriesData();
    }, []);

    const onCountryChange = async (e) => {
        const countryCode = e.value;
        console.log(countryCode);
    };

    return (
        <CovidContext.Provider value={{ countries, onCountryChange }}>
            {children}
        </CovidContext.Provider>
    );
};

export default CovidContextProvider;
