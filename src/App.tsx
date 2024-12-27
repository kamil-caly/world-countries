import React from 'react';
import './App.css';
import MainPage from './pages/MainPage.tsx';
import { AppProvider } from './app_context/AppContext.tsx';

function App() {
    return (
        <AppProvider>
            <MainPage />
        </AppProvider>
    );
}

export default App;
