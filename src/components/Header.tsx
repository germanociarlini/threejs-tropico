import React from "react";
import BranchSVG from "../assets/BranchSVG";
import '../styles/Header.css'

export class Header extends React.Component {
  render() {
    return (
      <header className='header'>
        <div className="header-container">
          <div className="logo-svg">
            <BranchSVG width='93.6px' height='80px' color='--tropican-darkred' mirror={false} />
          </div>
          <div className="logo">
            <a href='#home'>Tropico</a>
          </div>
          <nav className="header-sections">
            <ul className="header-sections-list">
              <li>
                <a className="header-section" href="#home">home</a>
              </li>
              <li>
                <a className="header-section" href="#discover">discover</a>
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