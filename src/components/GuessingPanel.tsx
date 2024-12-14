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
                <div className='guessControl'>
                    <div className='guessControlFirst'>
                        <div className='timer'>12:00</div>
                        <button className='giveUpBtn'>Poddajesz się?</button>
                    </div>
                    <div className='guessControlSecond'>
                        <img className='pauseImg' src={require('../assets/pause_circle.svg').default} alt='pauseCircle' />
                        <img className='clockImg' src={require('../assets/clock.svg').default} alt='clockCircle' />
                        <img className='questionImg' src={require('../assets/question_circle.svg').default} alt='questionCircle' />
                    </div>
                    <div className='guessControlThird'>
                        <div>
                            <div className='countryLabel'>Wpisz kraj tutaj</div>
                            <input className='countryInput' type="text" />
                        </div>
                        <div>0 / 196 odgadnięto</div>
                    </div>
                </div>
            }
        </div>
    );
};

export default GuessingPanel;