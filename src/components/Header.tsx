import React from "react";
import '../styles/Header.css'

export class Header extends React.Component {
  render() {
    return (
      <header className='header'>
        <div className="header-container">
          <div className="logo">Tropico</div>
          <nav className="header-sections">
            <ul className="header-sections-list">
              <li>
                <a className="header-section" href="#home">home</a>
              </li>
              <li>
                <a className="header-section" href="#destinations">destinations</a>
              </li>
              <li>
                <a className="header-section" href="#about">tropico</a>
              </li>
              <li>
                <a className="header-section" href="#contact">contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }
}