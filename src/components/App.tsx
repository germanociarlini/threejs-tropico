import React from 'react';
import { Header } from '../components/Header';
import { Scene } from '../components/Scene';
import '../styles/App.css';
import { Content } from './Content';

function App() {
  return (
    <div className='container'>
      <Scene />
      <Header />
      <Content />
    </div>
  );
}

export default App;
