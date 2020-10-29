import React from 'react';

const InfoBox = ({ title, cases, total, active, onClick }) => {
    return (
        <section
            onClick={onClick}
            className={`infoBox ${active && 'infoBox-active'}
            ${title === 'Recovered' && 'infoBox__recovered'}
             ${title === 'Recovered' && active && 'infoBox__recovered-active'}`}
        >
            <h2 className='infoBox__title'>{title}</h2>
            <p className='infoBox__cases'>
                <strong>{cases}</strong>
            </p>
            <p className='infoBox__total'>{total} Total</p>
        </section>
    );
};

export default InfoBox;
