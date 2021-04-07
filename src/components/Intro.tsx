import React from "react";
import '../styles/Intro.css';

export class Intro extends React.Component {
  render() {
    return (
      <div className="intro">
        <span className='title'>Tropico</span>
        <span className='subtitle'>Flying made easy.</span>
        <span>@germanociarlini</span>
      </div>
    )
  }
}