import React from 'react';
import '../styles/Content.css';
import { Home } from './Home';
import { Destinations } from './Destinations';
import { About } from './About';
import { Contact } from './Contact';

export class Content extends React.Component {
  render() {
    return (
      <main className='content'>
        <section id='home' className='fwh-slide'>
          <div className="section-content"><Home /></div>
        </section>

        <section id='destinations' className='fwh-slide'>
          <div className="section-content"><Destinations /></div>
        </section>

        <section id='about' className='fwh-slide'>
          <div className="section-content"><About /></div>
        </section>

        <section id='contact' className='fwh-slide'>
          <div className="section-content"><Contact /></div>
        </section>
      </main>
    )
  }
}