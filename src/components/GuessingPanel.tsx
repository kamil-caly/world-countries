import { useEffect, useState } from 'react';
import React from 'react';

const GuessingPanel: React.FC = () => {
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

    useEffect(() => {

    }, []);

    return (
        <div className='guessingPanelDiv'>
            {!isGameStarted
                ?
                <button className='startGameBtn' onClick={() => setIsGameStarted(prev => !prev)}>
                    <div className='startGameBtnDiv'>
                        <div>Zacznij quiz</div>
                        <img className='playImg' src={require('../assets/arrow_right.svg').default} alt='start' />
                    </div>
                </button>
                :
                <div></div>
            }
        </div>
    );
};

export default GuessingPanel;