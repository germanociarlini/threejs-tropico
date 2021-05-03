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
        <div id="scores-container" className="dashboard-section">
          {this.props.scores.map((score: ScoreCategory, i: number) => {
            return (
              <div key={i} className="score-entry">
                <span>{score.name}</span>
                <span>{score.score_out_of_10.toFixed(2)}</span>
                <div className="score-bar" style={{ backgroundColor: `${score.color}`, width: `${score.score_out_of_10 / 10 * 100}%` }}></div>
              </div>
            )
          })}
        </div>
        <div id="costs-container" className="dashboard-section">
          {this.props.costs.map((cost: Datum, i: number) => {
            return (
              <div key={i} className={`cost-entry`}>
                <span>{cost.label}</span>
                <span>${cost.currency_dollar_value?.toFixed(2)}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
