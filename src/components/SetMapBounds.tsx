import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import React from 'react';
import L from 'leaflet';

const SetMapBounds: React.FC<{ geoJsonData: any }> = ({ geoJsonData }) => {
    const map = useMap();

    useEffect(() => {
        const bounds = new L.GeoJSON(geoJsonData).getBounds();
        map.setMaxBounds(bounds);
    }, [geoJsonData, map]);

    return null;
};

export default SetMapBounds;
