import React, { useContext } from 'react';

import { CovidContext } from '../contexts/CovidContext';

const Table = () => {
    const { tableData } = useContext(CovidContext);

    return (
        <div>
            <h2>Live cases by Country</h2>
            {tableData?.map(({ country, cases }) => (
                <tr>
                    <td>{country}</td>
                    <td>
                        <strong>{cases}</strong>
                    </td>
                </tr>
            ))}
        </div>
    );
};

export default Table;
