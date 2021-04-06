import React from "react";
import './Header.css'

export class Header extends React.Component {
  render() {
    return (
      <header className='header'>
        <div className="logo">Tropico</div>
        <div className="header-sections">
          <span className="header-section">home</span>
          <span className="header-section">destinations</span>
          <span className="header-section">tropico</span>
          <span className="header-section">contact</span>
        </div>
      </header>
    )
  }
}