import React, { useContext } from 'react';
import numeral from 'numeral';

import { CovidContext } from '../contexts/CovidContext';

const Table = () => {
    const { tableData } = useContext(CovidContext);

    return (
        <section className='table'>
            <h2>Live cases by Country</h2>
            {tableData?.map(({ country, cases }) => (
                <tr>
                    <td>{country}</td>
                    <td>
                        <strong>{numeral(cases).format('0,0')}</strong>
                    </td>
                </tr>
            ))}
        </section>
    );
};

export default Table;
