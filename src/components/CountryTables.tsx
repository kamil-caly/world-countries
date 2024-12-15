import React, { useEffect, useState, forwardRef } from 'react';
import possibleCountryNames from '../data/PossibleCountryNames.ts';
import { TablesContent } from '../types/types.ts';
import SingleTable from './SingleTable.tsx';

type CountryTablesProps = {
    tablesContent: TablesContent;
}

const CountryTables: React.FC = (props: CountryTablesProps) => {

    useEffect(() => {
        //console.log('child tablesContent: ', props.tablesContent);
    }, [props]);

    return (
        <div className='countryTablesDiv'>
            <SingleTable
                continent='Europa'
                cellContent={props.tablesContent.europa}
            />
            <SingleTable
                continent='Azja'
                cellContent={props.tablesContent.azja}
            />
            <SingleTable
                continent='Afryka'
                cellContent={props.tablesContent.afryka}
            />
            <SingleTable
                continent='Ameryka Północna'
                cellContent={props.tablesContent.ameryka_polnocna}
            />
            <div>
                <SingleTable
                    continent='Ameryka Południowa'
                    cssClass='southAmericaTable'
                    cellContent={props.tablesContent.ameryka_poludniowa}
                />
                <SingleTable
                    continent='Oceania'
                    cellContent={props.tablesContent.oceania}
                />
            </div>
        </div>
    );
};

export default CountryTables;