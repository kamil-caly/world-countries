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

const INIT_MAP_ZOOM: number = 2;

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
    const [isPageScrolled, setIsPageScrolled] = useState<boolean>(false);
    const [hoverCountry, seHoverCountry] = useState<string>('');
    const [showMissingCountries, setShowMissingCountries] = useState<boolean>(false);
    const { pauseState, _ } = useContext(PauseContext) as { pauseState: PauseContextType, _: any };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 15) {
                setIsPageScrolled(true);
            } else {
                setIsPageScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const onEachFeature = (feature, layer) => {
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

        layer.on({
            mouseover: (_: L.LeafletMouseEvent) => {
                const countryName = feature.properties.name_pl;
                seHoverCountry(_ => countryName);
            },
            mouseout: () => {
                seHoverCountry(_ => '');
            }
        });
    }

    const homeBtnClick = () => {
        if (mapRef.current)
            mapRef.current.setView([0, 0], INIT_MAP_ZOOM);
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

    const countryExists = (name_pl: string, isGuessed: boolean): boolean => {
        return Object.values(tablesContent as TablesContent)
            .some(v =>
                v.some(c => c.name === name_pl && (isGuessed ? c.guessed : true))
            );
    }

    const getGeoJsonStyle = (feature: any) => {
        let fillColor = '#ffff80';
        let weight = 0.5;
        let color = '#363d44';

        if (countryExists(feature.properties.name_pl, true))
            fillColor = '#6f6';
        else if (showMissingCountries && countryExists(feature.properties.name_pl, false)) {
            fillColor = '#ffd400';
            weight = 4;
            color = '#ec9009';
        }
        else if (isGameOver && countryExists(feature.properties.name_pl, false))
            fillColor = '#f66';

        return {
            color: color,
            weight: weight,
            fillOpacity: 1,
            fillColor: fillColor
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
            <div style={{ marginBottom: isGameOver ? '200px' : '120px' }}>
                <PausePanel />
                <GuessingPanel
                    isPageScrolled={isPageScrolled}
                    updateTablesContent={updateTablesContent}
                    resetTablesContent={resetTablesContent}
                    setGameOver={setGameOver}
                />
            </div>
            <div style={{ display: pauseState.isPause ? 'none' : 'block' }}>
                <MapContainer
                    className='mapContainer'
                    ref={mapRef}
                    center={[0, 0]}
                    zoom={INIT_MAP_ZOOM} // only initial value
                    minZoom={INIT_MAP_ZOOM}
                    maxZoom={6}
                    scrollWheelZoom={true}
                >
                    <GeoJSON
                        ref={geoJsonRef}
                        data={countries}
                        onEachFeature={onEachFeature}
                        style={getGeoJsonStyle}
                    />
                    <SetMapBounds geoJsonData={countries} />
                </MapContainer>
                <div className='mapOptionsDiv'>
                    <div>
                        <button className='homeBtn' onClick={homeBtnClick}>
                            <img src={require('../assets/home.svg').default} alt='home' />
                        </button>
                        <div>{countryExists(hoverCountry, true) || isGameOver ? hoverCountry : ''}</div>
                    </div>
                    <div className='missedCountriesDiv' onClick={() => setShowMissingCountries(prev => !prev)}>{showMissingCountries ? 'Ukryj brakujące państwa' : 'Pokaż brakujące kraje'}</div>
                </div>
                <CountryTables tablesContent={tablesContent} isGameOver={isGameOver} />
            </div>
        </>
    );
}

export default MainPage;