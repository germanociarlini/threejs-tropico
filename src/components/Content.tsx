import React from 'react';
import '../styles/Content.css';
import { Intro } from './Intro';
import { Destinations } from './Destinations';

export class Content extends React.Component {
  render() {
    return (
      <main className='content'>
        <section id='home' className='fwh-slide stick-right'>
          <Intro />
        </section>

        <section id='destinations' className='fwh-slide'>
          <Destinations />
        </section>
      </main>
    )
  }
}