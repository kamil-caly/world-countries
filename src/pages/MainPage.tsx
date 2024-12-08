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
        afryka: [],
        ameryka_polnocna: [],
        ameryka_poludniowa: [],
        azja: [],
        europa: [],
        oceania: []
    });

    useEffect(() => {
        console.log('tablesContent: ', tablesContent);
    }, [tablesContent])

    const onEachFeature = (_, layer) => {
        if (layer.feature && possibleCountryNames.includes(layer.feature.properties.name_pl)) {
            switch (layer.feature.properties.continent) {
                case 'North America':
                    setTablesContent(prevState => {
                        return {
                            ...prevState,
                            ameryka_polnocna: [
                                ...prevState.ameryka_polnocna,
                                { name: layer.feature.properties.name_pl, guessed: false }
                            ]
                        };
                    });
                    break;
                case 'Asia':
                    setTablesContent(prevState => {
                        return {
                            ...prevState,
                            azja: [
                                ...prevState.azja,
                                { name: layer.feature.properties.name_pl, guessed: false }
                            ]
                        };
                    });
                    break;
                case 'South America':
                    setTablesContent(prevState => {
                        return {
                            ...prevState,
                            ameryka_poludniowa: [
                                ...prevState.ameryka_poludniowa,
                                { name: layer.feature.properties.name_pl, guessed: false }
                            ]
                        };
                    });
                    break;
                case 'Africa':
                    setTablesContent(prevState => {
                        return {
                            ...prevState,
                            afryka: [
                                ...prevState.afryka,
                                { name: layer.feature.properties.name_pl, guessed: false }
                            ]
                        };
                    });
                    break;
                case 'Europe':
                    setTablesContent(prevState => {
                        return {
                            ...prevState,
                            europa: [
                                ...prevState.europa,
                                { name: layer.feature.properties.name_pl, guessed: false }
                            ]
                        };
                    });
                    break;
                case 'Oceania':
                    setTablesContent(prevState => {
                        return {
                            ...prevState,
                            oceania: [
                                ...prevState.oceania,
                                { name: layer.feature.properties.name_pl, guessed: false }
                            ]
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