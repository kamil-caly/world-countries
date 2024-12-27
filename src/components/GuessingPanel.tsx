import { useEffect, useState, useRef, useContext, Dispatch } from 'react';
import React from 'react';
import { TablesContent } from '../types/types';
import { Action, AppContext, AppContextType } from '../app_context/AppContext.tsx';

type CountryTablesProps = {
    isPageScrolled: boolean;
    updateTablesContent: (country: string) => boolean;
    resetTablesContent: () => void;
    setGameOver: (value: boolean) => void;
}

const QUIZ_TIME: string = '12:00'; // test change
const GUESSED_COUNTRIES_STR: string = '0 / 196 odgadnięto';

const GuessingPanel: React.FC = (props: CountryTablesProps) => {
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [timeValue, setTimeValue] = useState<string>(QUIZ_TIME);
    const intervalId = useRef<number | null>(null);
    const [guessedCountriesStr, setGuessedCountriesStr] = useState<string>(GUESSED_COUNTRIES_STR);
    const [finalScoreStr, setFinalScoreStr] = useState<string>('');
    const [timerActive, setTimerActive] = useState<boolean>(true);
    const { appState, appDispatch } = useContext(AppContext) as { appState: AppContextType, appDispatch: any };

    useEffect(() => {
        if (isGameStarted) {
            const id = setInterval(() => updateTime(), 1000);
            intervalId.current = id;
        }

    }, [isGameStarted]);

    useEffect(() => {
        if (!isGameStarted) return;

        if (appState.isPause) {
            clearInterval(intervalId.current);
        } else {
            const id = setInterval(() => updateTime(), 1000);
            intervalId.current = id;
        }
    }, [appState.isPause]);

    const setFinalScoreStrState = () => {
        //25/196 = 13%
        const firstPart = document.getElementsByClassName('guessedCountriesStr')[0].innerHTML.split('o')[0].trim();
        const percentage = Math.round(Number(firstPart.split('/')[0]) / Number(firstPart.split('/')[1]) * 100);
        setFinalScoreStr(`${firstPart} = ${percentage}%`);
    }

    const updateTime = (): void => {
        setTimeValue(prevTime => {
            let minutes: number = Number(prevTime.split(':')[0]);
            let seconds: number = Number(prevTime.split(':')[1]);

            if (minutes === 0 && seconds === 1) {
                clearInterval(intervalId.current);
                props.setGameOver(true);
                setFinalScoreStrState();
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
            setGuessedCountriesStr(prev => { return `${Number(prev.split('/')[0].trim()) + 1} / 196 odgadnięto` });
        } else {
            setInputValue(value);
        }
    }

    const repeatQuizClick = () => {
        setTimeValue(QUIZ_TIME);
        setIsGameStarted(false);
        props.resetTablesContent();
        props.setGameOver(false);
        setInputValue('');
        setGuessedCountriesStr(GUESSED_COUNTRIES_STR);
        appDispatch({ type: 'reset_state' });
        setTimerActive(true);
    }

    const giveUpClick = () => {
        clearInterval(intervalId.current);
        props.setGameOver(true);
        setFinalScoreStrState();
        setTimeValue('00:00');
    }

    const pauseBtnClick = () => {
        appDispatch({ type: 'decrement_pause' });
        appDispatch({ type: 'switch_pause', pause: true });
    }

    const solveWithoutTimer = () => {
        setTimerActive(false);
        clearInterval(intervalId.current);
    }

    return (
        <div className={`guessingPanelDiv ${props.isPageScrolled ? 'guessingPanelDivScrolled' : ''}`} style={{ display: appState.isPause ? 'none' : 'block' }}>
            {timeValue === '00:00'
                ?
                <div className='gameOverPanel'>
                    <div className='pointsPanel'>
                        <div className='points'>Punktacja</div>
                        <div className='allScore'>
                            <div className='yourScoreIs'>Twój wynik to</div>
                            <div className='finalScore'>{finalScoreStr}</div>
                        </div>
                    </div>
                    <div>Przewiń w dół, aby zobaczyć odpowiedzi...</div>
                    <button className='repeatBtn' onClick={repeatQuizClick}>
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
                    <div>
                        <div className='guessControl'>
                            <div className='guessControlFirst'>
                                <div className='timer' style={{ fontSize: timerActive ? '40px' : '30px' }}>{timerActive ? timeValue : 'Brak limitu czasowego'}</div>
                                <button className='giveUpBtn' onClick={giveUpClick}>Poddajesz się?</button>
                            </div>
                            <div className='guessControlSecond'>
                                <img className='pauseImg' style={{ display: appState.pauseCnt <= 0 || !timerActive ? 'none' : 'block' }} onClick={pauseBtnClick} src={require('../assets/pause_circle.svg').default} alt='pauseCircle' />
                                <img className='clockImg' style={{ display: timerActive ? 'block' : 'none' }} onClick={solveWithoutTimer} src={require('../assets/clock.svg').default} alt='clockCircle' />
                                <img className='questionImg' onClick={() => appDispatch({ type: 'switch_help', help: !appState.isHelp })} src={require('../assets/question_circle.svg').default} alt='questionCircle' />
                            </div>
                            <div className='guessControlThird'>
                                <div>
                                    <div className='countryLabel'>Wpisz kraj tutaj</div>
                                    <input className='countryInput' type="text" value={inputValue} onChange={(e) => countryInputChange(e.target.value)} />
                                </div>
                                <div className='guessedCountriesStr'>{guessedCountriesStr}</div>
                            </div>
                        </div>
                        <div className='helpPanel' style={{ display: appState.isHelp ? 'block' : 'none' }}>
                            <div className='helpHeader'>
                                <div className='helpDiv'>Pomoc</div>
                                <div className='closeHelpDiv' onClick={() => appDispatch({ type: 'switch_help', help: !appState.isHelp })}>✖</div>
                            </div>
                            <div className='helpContent'>
                                <ul>
                                    <li>Wpisuj odpowiedzi w zaznaczonym polu "Wpisz kraj tutaj"</li>
                                    <li>Możesz wpisać jakąkolwiek odpowiedź, w dowolnym momencie - nie muszą być wpisanywane zgodnie z kolejnością</li>
                                </ul>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default GuessingPanel;