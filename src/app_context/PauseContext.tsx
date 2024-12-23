import React, { createContext, useState, ReactNode, useReducer, Dispatch } from 'react';

export const PauseContext = createContext<PauseContextType>();

export type PauseContextType = {
    pauseCnt: number;
    isPause: boolean;
}

export type ActionType = 'decrement_pause' | 'switch_pause' | 'reset_state';

export type Action = {
    type: ActionType,
    pause?: boolean
}

export const PauseProvider: React.FC = ({ children }) => {

    const reducer = (state: PauseContextType, action: Action) => {
        debugger;
        switch (action.type) {
            case 'decrement_pause': {
                return {
                    ...state,
                    pauseCnt: state.pauseCnt - 1,
                };
            }
            case 'switch_pause': {
                return {
                    ...state,
                    isPause: action.pause ?? false
                };
            }
            case 'reset_state': {
                return initialState;
            }
            default:
                return state;
        }
    }

    const initialState: PauseContextType = { pauseCnt: 3, isPause: false };

    const [pauseState, pauseDispatch] = useReducer(reducer, initialState);

    return (
        <PauseContext.Provider value={{ pauseState, pauseDispatch }}>
            {children}
        </PauseContext.Provider>
    );
};