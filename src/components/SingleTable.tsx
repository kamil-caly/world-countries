import React, { useEffect } from 'react';
import { CellTableContent } from '../types/types.ts';

export type SingleTableProps = {
    continent: string;
    cellContent: CellTableContent[];
    cssClass?: string
}

const SingleTable: React.FC = (props: SingleTableProps) => {

    return (
        <table className={props.cssClass ?? ''}>
            <tr>
                <th>{props.continent}</th>
            </tr>
            {props.cellContent.map(e =>
                <tr>
                    <td>
                        <div style={{ display: e.guessed ? 'flex' : 'none' }}>{e.name}</div>
                    </td>
                </tr>
            )}
        </table>
    );
};

export default SingleTable;