import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON, useMapEvent, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import countries from '../data/countries.geo.json';
import SetMapBounds from '../components/SetMapBounds.tsx';
import CountryTables from '../components/CountryTables.tsx';
import { TablesContent } from '../types/types.ts';
import possibleCountryNames from '../data/PossibleCountryNames.ts';

const initMapZoom: number = 2;

const MainPage: React.FC = () => {

    const geoJsonRef = useRef<L.GeoJSON | null>(null);
    const mapRef = useRef<any>(null);
    const [tablesContent, setTablesContent] = useState<TablesContent>({
        europa: [],
        azja: [],
        afryka: [],
        ameryka_polnocna: [],
        ameryka_poludniowa: [],
        oceania: []
    });

    useEffect(() => {
        console.log('mapRef: ', mapRef);
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

    const homeBtnClick = () => {
        if (mapRef.current)
            mapRef.current.setView([0, 0], initMapZoom);
    }

    return (
        <>
            <MapContainer
                className='mapContainer'
                ref={mapRef}
                center={[0, 0]}
                zoom={initMapZoom} // only initial value
                minZoom={initMapZoom}
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
            <div className='mapOptionsDiv'>
                <button className='homeBtn' onClick={homeBtnClick}>
                    <img src={require('../assets/home.svg').default} alt='home' />
                </button>
            </div>
            <CountryTables tablesContent={tablesContent} />
        </>
    );
}

export default MainPage;