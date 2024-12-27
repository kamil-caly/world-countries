import React, { createContext, useState, ReactNode, useReducer, Dispatch } from 'react';

export const AppContext = createContext<AppContextType>();

export type AppContextType = {
    pauseCnt: number;
    isPause: boolean;
    isHelp: boolean;
}

export type ActionType = 'decrement_pause' | 'switch_pause' | 'reset_state' | 'switch_help';

export type Action = {
    type: ActionType,
    pause?: boolean,
    help?: boolean
}

export const AppProvider: React.FC = ({ children }) => {

    const reducer = (state: AppContextType, action: Action) => {
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
            case 'switch_help': {
                return {
                    ...state,
                    isHelp: action.help ?? false
                };
            }
            case 'reset_state': {
                return initialState;
            }
            default:
                return state;
        }
    }

    const initialState: AppContextType = { pauseCnt: 3, isPause: false, isHelp: false };

    const [appState, appDispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ appState, appDispatch }}>
            {children}
        </AppContext.Provider>
    );
};