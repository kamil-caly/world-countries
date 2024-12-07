import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import countries from '../data/countries.geo.json';
import SetMapBounds from '../components/SetMapBounds.tsx';

const MainPage: React.FC = () => {

    const bounds: [[number, number], [number, number]] = [
        [-90, -180], // Południowo-zachodni róg (lat, lng)
        [90, 180],   // Północno-wschodni róg (lat, lng)
    ];

    return (
        <MapContainer
            className='mapContainer'
            center={[1, 1]}
            zoom={2}
            minZoom={2}
            maxZoom={6}
            scrollWheelZoom={true}>
            {/* <TileLayer
                url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png"
                opacity="1"
            /> */}
            <GeoJSON data={countries} style={{ color: 'blue', weight: 0.5 }} />
            <SetMapBounds geoJsonData={countries} />
        </MapContainer>
    );
}

export default MainPage;