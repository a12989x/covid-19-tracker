import React from 'react';

const InfoBox = ({ title, cases, total }) => {
    return (
        <div>
            <h2>{title}</h2>
            <p>
                <strong>{cases}</strong>
            </p>
            <p>{total} Total</p>
        </div>
    );
};

export default InfoBox;
