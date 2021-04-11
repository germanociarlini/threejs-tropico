import React from "react";
import '../styles/Home.css';

export class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="title-card">
          <span className='title'>Tropico</span>
          <span className='subtitle'>Discover made easy.</span>
          <span className='author'>@germanociarlini</span>
        </div>
        <div className="cta">
          <a href="#destinations">Discover</a>
        </div>
      </div>
    )
  }
}