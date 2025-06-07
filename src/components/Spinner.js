import React, { Component } from 'react'
import './spin.css'

export default class spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <div className="loader">
            <span className="loader-block"></span>
            <span className="loader-block"></span>
            <span className="loader-block"></span>
            <span className="loader-block"></span>
            <span className="loader-block"></span>
            <span className="loader-block"></span>
            <span className="loader-block"></span>
            <span className="loader-block"></span>
            <span className="loader-block"></span>
        </div>
      </div>
    )
  }
}
