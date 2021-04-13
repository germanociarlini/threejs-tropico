import React from "react";
import '../styles/Home.css';

export class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="title-card">
          <span className='title'>Tropico</span>
          <span className='subtitle'>Discovery made easy.</span>
          <span className='author'>@germanociarlini</span>
        </div>
        <a className="cta" href="#discover">
          <span className="cta-text">Discover the World</span>
        </a>
      </div>
    )
  }
}