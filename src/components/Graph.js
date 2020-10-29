import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';

import { CovidContext } from '../contexts/CovidContext';

import options from '../chartOptions';

const Graph = () => {
    const { graphData, casesType } = useContext(CovidContext);

    return (
        <section className='graph'>
            <h2>Worldwide new {casesType}</h2>
            {graphData?.length > 0 && (
                <Line
                    data={{
                        datasets: [
                            {
                                backgroundColor: 'rgba(204, 16, 52, 0.5)',
                                borderColor: '#CC1034',
                                data: graphData,
                            },
                        ],
                    }}
                    options={options}
                />
            )}
        </section>
    );
};

export default Graph;
