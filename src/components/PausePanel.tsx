import React, { useContext, useEffect, useState, Dispatch } from 'react';
import { Action, PauseContext, PauseContextType } from '../app_context/PauseContext.tsx';

const PausePanel: React.FC = () => {
    const { pauseState, pauseDispatch } = useContext(PauseContext) as { pauseState: PauseContextType, pauseDispatch: any };

    const continueClick = () => {
        pauseDispatch({ type: 'switch_pause', pause: false });
    }

    return (
        <div className='pauseContainer' style={{ display: pauseState.isPause ? 'flex' : 'none' }}>
            <div>Quiz jest zapauzowany. Został{pauseState.pauseCnt < 2 ? 'a' : 'y'} ci jeszcze {pauseState.pauseCnt} pauz{pauseState.pauseCnt < 2 ? 'a' : 'y'}.</div>
            <button className='continueGameBtn' onClick={continueClick}>
                <div>Wznów</div>
                <img className='playImg' src={require('../assets/arrow_right.svg').default} alt='start' />
            </button>
        </div>
    );
}

export default PausePanel;