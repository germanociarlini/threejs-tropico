import React from 'react';
import '../styles/Content.css';

export class Content extends React.Component {
  render() {
    return (
      <main className='content'>
        <section className='fwh-slide stick-right'>
          <div className="intro">
            <span className='title'>Tropico</span>
            <span className='subtitle'>Flying made easy.</span>
            <span>@germanociarlini</span>
          </div>
        </section>

        <section className='fwh-slide'>
          <div className="destinations">
            <span className='title'>Destinations</span>
          </div>
        </section>
      </main>
    )
  }
}