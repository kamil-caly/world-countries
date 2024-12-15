import { useEffect, useState, useRef } from 'react';
import React from 'react';
import { TablesContent } from '../types/types';

type CountryTablesProps = {
    tablesContent: TablesContent;
    updateTablesContent: (country: string) => boolean;
    resetTablesContent: () => void;
    setGameOver: (value: boolean) => void;
}

const QUIZ_TIME: string = '02:00';

const GuessingPanel: React.FC = (props: CountryTablesProps) => {
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [timeValue, setTimeValue] = useState<string>(QUIZ_TIME);
    const intervalId = useRef<number | null>(null);

    useEffect(() => {
        if (isGameStarted) {
            const id = setInterval(() => updateTime(), 1000);
            intervalId.current = id;
        }

    }, [isGameStarted]);

    const updateTime = (): void => {
        setTimeValue(prevTime => {
            console.log('prevTime: ', prevTime);
            let minutes: number = Number(prevTime.split(':')[0]);
            let seconds: number = Number(prevTime.split(':')[1]);

            if (minutes === 0 && seconds === 1) {
                debugger;
                clearInterval(intervalId.current);
                props.setGameOver(true);
                return '00:00';
            }

            if (seconds === 0) {
                seconds = 59;
                if (minutes !== 0) {
                    minutes = minutes - 1;
                }
            } else {
                seconds = seconds - 1;
            }

            const finalMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const finalSeconds = seconds < 10 ? `0${seconds}` : seconds;
            return `${finalMinutes}:${finalSeconds}`;
        })
    }

    const countryInputChange = (value: string) => {
        const updated: boolean = props.updateTablesContent(value);
        if (updated) {
            setInputValue('');
        } else {
            setInputValue(value);
        }
    }

    return (
        <div className='guessingPanelDiv'>
            {timeValue === '00:00'
                ?
                <div className='gameOverPanel'>
                    <div className='pointsPanel'>
                        <div className='points'>Punktacja</div>
                        <div className='allScore'>
                            <div className='yourScoreIs'>Twój wynik to</div>
                            <div className='finalScore'>25/196 = 13%</div>
                        </div>
                    </div>
                    <div>Przewiń w dół, aby zobaczyć odpowiedzi...</div>
                    <button className='repeatBtn' onClick={() => {
                        setTimeValue(QUIZ_TIME);
                        setIsGameStarted(false);
                        props.resetTablesContent();
                        props.setGameOver(false);
                    }}>
                        <img className='repeatImg' src={require('../assets/arrow-repeat.svg').default} alt='arrowRepeat' />
                        <div>Rozwiąż quiz ponownie</div>
                    </button>
                </div>
                : !isGameStarted
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
                            <div className='timer'>{timeValue}</div>
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
                                <input className='countryInput' type="text" value={inputValue} onChange={(e) => countryInputChange(e.target.value)} />
                            </div>
                            <div>0 / 196 odgadnięto</div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default GuessingPanel;