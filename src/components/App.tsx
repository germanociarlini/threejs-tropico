import React from 'react';
import { Scene } from '../components/Scene'
import { Header } from '../components/Header'
import './App.css'

function App() {
  return (
    <div className='container'>
      <Scene />
      <div>
        <Header/>
        <div className='intro'>
          <span className='main'>Tropico</span>
          <span className='sub'>Flying made easy.</span>
          <span>@germanociarlini</span>
        </div>
      </div>
    </div>
  );
}

export default App;
