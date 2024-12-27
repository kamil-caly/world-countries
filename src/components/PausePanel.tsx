import React, { useContext, useEffect, useState, Dispatch } from 'react';
import { Action, AppContext, AppContextType } from '../app_context/AppContext.tsx';

const PausePanel: React.FC = () => {
    const { appState, appDispatch } = useContext(AppContext) as { appState: AppContextType, appDispatch: any };

    const continueClick = () => {
        appDispatch({ type: 'switch_pause', pause: false });
    }

    return (
        <div className='pauseContainer' style={{ display: appState.isPause ? 'flex' : 'none' }}>
            <div>Quiz jest zapauzowany. Został{appState.pauseCnt < 2 ? 'a' : 'y'} ci jeszcze {appState.pauseCnt} pauz{appState.pauseCnt < 2 ? 'a' : 'y'}.</div>
            <button className='continueGameBtn' onClick={continueClick}>
                <div>Wznów</div>
                <img className='playImg' src={require('../assets/arrow_right.svg').default} alt='start' />
            </button>
        </div>
    );
}

export default PausePanel;