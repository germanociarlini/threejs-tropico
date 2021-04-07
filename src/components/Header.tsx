import React from "react";
import '../styles/Header.css'

export class Header extends React.Component {
  render() {
    return (
      <header className='header'>
        <div className="logo">Tropico</div>
        <div className="header-sections">
          <a className="header-section" href="#home">home</a>
          <a className="header-section" href="#destinations">destinations</a>
          <a className="header-section" href="#about">tropico</a>
          <a className="header-section" href="#contact">contact</a>
        </div>
      </header>
    )
  }
}