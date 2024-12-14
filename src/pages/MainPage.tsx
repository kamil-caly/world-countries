import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON, useMapEvent, CircleMarker, Tooltip } from 'react-leaflet';
import countries from '../data/countries.geo.json';
import SetMapBounds from '../components/SetMapBounds.tsx';
import CountryTables from '../components/CountryTables.tsx';
import { TablesContent } from '../types/types.ts';
import possibleCountryNames from '../data/PossibleCountryNames.ts';

const MainPage: React.FC = () => {

    const geoJsonRef = useRef<L.GeoJSON | null>(null);
    const [tablesContent, setTablesContent] = useState<TablesContent>({
        europa: [],
        azja: [],
        afryka: [],
        ameryka_polnocna: [],
        ameryka_poludniowa: [],
        oceania: []
    });

    useEffect(() => {

    }, [tablesContent])

    const onEachFeature = (_, layer) => {
        if (layer.feature && possibleCountryNames.includes(layer.feature.properties.name_pl)) {
            switch (layer.feature.properties.continent) {
                case 'North America':
                    setTablesContent(prevState => {
                        const updatedArray = [
                            ...prevState.ameryka_polnocna,
                            { name: layer.feature.properties.name_pl, guessed: false }
                        ].sort((a, b) => a.name.localeCompare(b.name));

                        return {
                            ...prevState,
                            ameryka_polnocna: updatedArray
                        };
                    });
                    break;
                case 'Asia':
                    setTablesContent(prevState => {
                        const updatedArray = [
                            ...prevState.azja,
                            { name: layer.feature.properties.name_pl, guessed: false }
                        ].sort((a, b) => a.name.localeCompare(b.name));

                        return {
                            ...prevState,
                            azja: updatedArray
                        };
                    });
                    break;
                case 'South America':
                    setTablesContent(prevState => {
                        const updatedArray = [
                            ...prevState.ameryka_poludniowa,
                            { name: layer.feature.properties.name_pl, guessed: false }
                        ].sort((a, b) => a.name.localeCompare(b.name));

                        return {
                            ...prevState,
                            ameryka_poludniowa: updatedArray
                        };
                    });
                    break;
                case 'Africa':
                    setTablesContent(prevState => {
                        const updatedArray = [
                            ...prevState.afryka,
                            { name: layer.feature.properties.name_pl, guessed: false }
                        ].sort((a, b) => a.name.localeCompare(b.name));

                        return {
                            ...prevState,
                            afryka: updatedArray
                        };
                    });
                    break;
                case 'Europe':
                    setTablesContent(prevState => {
                        const updatedArray = [
                            ...prevState.europa,
                            { name: layer.feature.properties.name_pl, guessed: false }
                        ].sort((a, b) => a.name.localeCompare(b.name));

                        return {
                            ...prevState,
                            europa: updatedArray
                        };
                    });
                    break;
                case 'Oceania':
                    setTablesContent(prevState => {
                        const updatedArray = [
                            ...prevState.oceania,
                            { name: layer.feature.properties.name_pl, guessed: false }
                        ].sort((a, b) => a.name.localeCompare(b.name));

                        return {
                            ...prevState,
                            oceania: updatedArray
                        };
                    });
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <>
            <MapContainer
                className='mapContainer'
                center={[0, 0]}
                zoom={2} // only initial value
                minZoom={2}
                maxZoom={6}
                scrollWheelZoom={true}>
                <GeoJSON
                    ref={geoJsonRef}
                    data={countries}
                    onEachFeature={onEachFeature}
                    style={{
                        weight: '0.5',
                        fillColor: '#ffff80',
                        fillOpacity: '1',
                        color: '#363d44'
                    }}
                />
                <SetMapBounds geoJsonData={countries} />
            </MapContainer>
            <CountryTables tablesContent={tablesContent} />
        </>
    );
}

export default MainPage;