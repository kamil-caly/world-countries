import React, { useEffect } from 'react';
import { CellTableContent } from '../types/types.ts';

export type SingleTableProps = {
    continent: string;
    cellContent: CellTableContent[];
    isGameOver: boolean;
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
                        <div style={{
                            display: e.guessed || props.isGameOver ? 'flex' : 'none',
                            color: props.isGameOver && !e.guessed ? 'red' : 'green'
                        }}>
                            {e.name}
                        </div>
                    </td>
                </tr>
            )}
        </table>
    );
};

export default SingleTable;