import React from 'react';
import '../styles/Content.css';
import { Home } from './Home';
import { Destinations } from './Destinations';

export class Content extends React.Component {
  render() {
    return (
      <main className='content'>
        <section id='home' className='fwh-slide'>
          <Home />
        </section>

        <section id='destinations' className='fwh-slide'>
          <Destinations />
        </section>
      </main>
    )
  }
}