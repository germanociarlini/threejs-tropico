import React from 'react';
import { Scene } from '../components/Scene'
import './App.css'

function App() {
  return (
    <div className='container'>
      <Scene />
      <div className='content'>
        <div className='intro'>
          <span className='main'>Tropico</span>
          <span className='sub'>Flying made easy.</span>
        </div>
      </div>
    </div>
  );
}

export default App;
