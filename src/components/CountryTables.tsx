import React, { useEffect, useState, forwardRef } from 'react';
import possibleCountryNames from '../data/PossibleCountryNames.ts';
import { TablesContent } from '../types/types.ts';

type CountryTablesProps = {
    tablesContent: TablesContent;
}

const CountryTables: React.FC = (props: CountryTablesProps) => {

    useEffect(() => {
        console.log('child tablesContent: ', props.tablesContent);
    }, [props]);

    return (
        <div className='countryTablesDiv'>
            <table>
                <tr>
                    <th>Europa</th>
                </tr>
                {props.tablesContent.europa.map(e =>
                    <tr>
                        <td>
                            <div>{e.name}</div>
                        </td>
                    </tr>
                )}
            </table>
        </div>
    );
};

export default CountryTables;