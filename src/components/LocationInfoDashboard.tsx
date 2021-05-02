import '../styles/LocationInfoDashboard.css'
import React, { Component } from 'react'
import { Datum, ScoreCategory } from '../types'

interface DashboardProps {
  scores: ScoreCategory[],
  costs: Datum[]
}

export default class LocationInfoDashboard extends Component<DashboardProps, {}> {
  render() {
    return (
      <div className='dashboard'>
        <div id="scores-container" className="dashboard-container">
          {this.props.scores.map((score: ScoreCategory, i: number) => {
            return (<div key={i} className="score-entry">{score.name}</div>)
          })}
        </div>
        <div id="costs-container" className="dashboard-container">
          {this.props.costs.map((cost: Datum, i: number) => {
            return (<div key={i} className="score-entry">{cost.label}</div>)
          })}
        </div>
      </div>
    )
  }
}
