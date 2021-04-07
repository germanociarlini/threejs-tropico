import React from 'react';
import { Header } from '../components/Header';
import { Scene } from '../components/Scene';
import '../styles/App.css';
import { Intro } from './Intro';

function App() {
  return (
    <div className='container'>
      <Scene />
      <Header />
      <Intro />
    </div>
  );
}

export default App;
