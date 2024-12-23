import React from 'react';
import './App.css';
import MainPage from './pages/MainPage.tsx';
import { PauseProvider } from './app_context/PauseContext.tsx';

function App() {
    return (
        <PauseProvider>
            <MainPage />
        </PauseProvider>
    );
}

export default App;
