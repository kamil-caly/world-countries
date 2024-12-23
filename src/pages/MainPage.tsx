import React, { useState, useRef, useEffect, useContext } from 'react';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON, useMapEvent, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import countries from '../data/countries.geo.json';
import SetMapBounds from '../components/SetMapBounds.tsx';
import CountryTables from '../components/CountryTables.tsx';
import { CellTableContent, TablesContent } from '../types/types.ts';
import possibleCountryNames from '../data/PossibleCountryNames.ts';
import GuessingPanel from '../components/GuessingPanel.tsx';
import PausePanel from '../components/PausePanel.tsx';
import { PauseContext, PauseContextType } from '../app_context/PauseContext.tsx';

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
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const { pauseState, pauseDispatch } = useContext(PauseContext) as { pauseState: PauseContextType, pauseDispatch: any };

    useEffect(() => {
        //console.log('tablesContent', tablesContent);
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

    const updateTablesContent = (country: string): boolean => {
        let hit = false;
        const newContent = Object.fromEntries(
            Object.entries(tablesContent as TablesContent).map(([key, value]) => [
                key,
                value.map(c => {
                    if (c.name.toLocaleLowerCase() === country.toLocaleLowerCase() && !c.guessed) {
                        hit = true;
                        return { ...c, guessed: true };
                    }
                    return c;
                })
            ])
        ) as TablesContent;

        setTablesContent(newContent);
        return hit;
    }

    const getGeoJsonStyle = (feature: any) => {
        const isGuessed: boolean = Object.values(tablesContent as TablesContent).some(v =>
            v.some(c => c.name === feature.properties.name_pl && c.guessed)
        );
        return {
            color: '#363d44',
            weight: 0.5,
            fillOpacity: 1,
            fillColor: isGuessed ? '#6f6' : isGameOver ? '#f66' : '#ffff80'
        };
    }

    const resetTablesContent = () => {
        const newContent = Object.fromEntries(
            Object.entries(tablesContent as TablesContent).map(([key, value]) => [
                key,
                value.map(c => {
                    return { ...c, guessed: false }
                })
            ])
        ) as TablesContent;

        setTablesContent(newContent);
    }

    const setGameOver = (isGameOver: boolean) => {
        setIsGameOver(isGameOver);
    }

    return (
        <>
            <PausePanel />
            <div style={{ display: pauseState.isPause ? 'none' : 'block' }}>
                <GuessingPanel
                    updateTablesContent={updateTablesContent}
                    resetTablesContent={resetTablesContent}
                    setGameOver={setGameOver}
                />
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
                        style={getGeoJsonStyle}
                    />
                    <SetMapBounds geoJsonData={countries} />
                </MapContainer>
                <div className='mapOptionsDiv'>
                    <button className='homeBtn' onClick={homeBtnClick}>
                        <img src={require('../assets/home.svg').default} alt='home' />
                    </button>
                </div>
                <CountryTables tablesContent={tablesContent} isGameOver={isGameOver} />
            </div>
        </>
    );
}

export default MainPage;