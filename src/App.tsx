import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { MainPage } from './components/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StatisticPage } from './components/StatisticPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/statistics' element={<StatisticPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
