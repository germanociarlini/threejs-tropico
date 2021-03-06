import React from 'react';
import '../styles/Content.css';
import { About } from './About';
import { Contact } from './Contact';
import { Discover } from './Discover';
import { Home } from './Home';

export class Content extends React.Component {
  render() {
    return (
      <main className='content'>
        <section id='home' className='fwh-slide'>
          <div className="section-content"><Home /></div>
        </section>

        <section id='discover' className='fwh-slide'>
          <div className="section-content"><Discover /></div>
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