import React, { useEffect, useState, forwardRef } from 'react';
import possibleCountryNames from '../data/PossibleCountryNames.ts';
import { TablesContent } from '../types/types.ts';
import SingleTable from './SingleTable.tsx';

type CountryTablesProps = {
    tablesContent: TablesContent;
    isGameOver: boolean;
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
                isGameOver={props.isGameOver}
            />
            <SingleTable
                continent='Azja'
                cellContent={props.tablesContent.azja}
                isGameOver={props.isGameOver}
            />
            <SingleTable
                continent='Afryka'
                cellContent={props.tablesContent.afryka}
                isGameOver={props.isGameOver}
            />
            <SingleTable
                continent='Ameryka Północna'
                cellContent={props.tablesContent.ameryka_polnocna}
                isGameOver={props.isGameOver}
            />
            <div>
                <SingleTable
                    continent='Ameryka Południowa'
                    cssClass='southAmericaTable'
                    cellContent={props.tablesContent.ameryka_poludniowa}
                    isGameOver={props.isGameOver}
                />
                <SingleTable
                    continent='Oceania'
                    cellContent={props.tablesContent.oceania}
                    isGameOver={props.isGameOver}
                />
            </div>
        </div>
    );
};

export default CountryTables;