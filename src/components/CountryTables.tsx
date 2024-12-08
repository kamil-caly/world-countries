import React, { useEffect, useState, forwardRef } from 'react';
import possibleCountryNames from '../data/PossibleCountryNames.ts';
import { TablesContent } from '../types/types.ts';

interface CountryTablesProps {
    tablesContent: TablesContent;
}

const CountryTables: React.FC<CountryTablesProps> = (props) => {

    useEffect(() => {
        console.log('child tablesContent: ', props.tablesContent);
    }, [props]);

    // const setTablesData = () => {
    //     let tabContent: TablesContent = {
    //         afryka: [],
    //         ameryka_polnocna: [],
    //         ameryka_poludniowa: [],
    //         azja: [],
    //         europa: [],
    //         oceania: []
    //     };
    //     ref.current?.eachLayer((layer: any) => {
    //         if (layer.feature && possibleCountries.includes(layer.feature.properties.name_pl)) {
    //             switch (layer.feature.properties.continent) {
    //                 case 'North America':
    //                     tabContent.ameryka_polnocna.push({ name: layer.feature.properties.name_pl, guessed: false })
    //                     break;
    //                 case 'Asia':
    //                     tabContent.azja.push({ name: layer.feature.properties.name_pl, guessed: false })
    //                     break;
    //                 case 'South America':
    //                     tabContent.ameryka_poludniowa.push({ name: layer.feature.properties.name_pl, guessed: false })
    //                     break;
    //                 case 'Africa':
    //                     tabContent.afryka.push({ name: layer.feature.properties.name_pl, guessed: false })
    //                     break;
    //                 case 'Europe':
    //                     tabContent.europa.push({ name: layer.feature.properties.name_pl, guessed: false })
    //                     break;
    //                 case 'Oceania':
    //                     tabContent.oceania.push({ name: layer.feature.properties.name_pl, guessed: false })
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         }
    //     });
    //     tabContent.ameryka_polnocna.sort((a, b) => a.name.localeCompare(b.name));
    //     tabContent.azja.sort((a, b) => a.name.localeCompare(b.name));
    //     tabContent.ameryka_poludniowa.sort((a, b) => a.name.localeCompare(b.name));
    //     tabContent.afryka.sort((a, b) => a.name.localeCompare(b.name));
    //     tabContent.europa.sort((a, b) => a.name.localeCompare(b.name));
    //     tabContent.oceania.sort((a, b) => a.name.localeCompare(b.name));

    //     console.log(tabContent);
    //     setTablesContent(tabContent);
    // }

    return (
        <div className='countryTablesDiv'>

        </div>
    );
};

export default CountryTables;