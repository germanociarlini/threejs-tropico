import React from 'react';
import { Header } from '../components/Header';
import { Scene } from '../components/Scene';
import '../styles/App.css';
import '../styles/Colors.css';
import { Content } from './Content';

function App() {
  return (
    <div className='container'>
      <Scene />
      <div className="view-container">
        <Header />
        <Content />
      </div>
    </div>
  );
}

export default App;
