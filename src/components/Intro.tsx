import React from 'react';
import '../styles/Intro.css'

export class Intro extends React.Component {
  render() {
    return (
      <div className='intro'>
        <span className='main'>Tropico</span>
        <span className='sub'>Flying made easy.</span>
        <span>@germanociarlini</span>
      </div>
    )
  }
}