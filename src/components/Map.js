import React, { useContext } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';

import { CovidContext } from '../contexts/CovidContext';

import 'leaflet/dist/leaflet.css';

const Map = () => {
    const {
        mapCenter,
        mapZoom,
        mapCountries,
        casesType,
        showDataOnMap,
    } = useContext(CovidContext);

    return (
        <div className='map'>
            <LeafletMap center={mapCenter} zoom={mapZoom}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(mapCountries, casesType)}
            </LeafletMap>
        </div>
    );
};

export default Map;
