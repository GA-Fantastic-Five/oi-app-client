import React, { Component } from 'react'

class RoomInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      placeholder: ''
    }
  }
  render () {
    return (
      <div className='col-4 m-auto'>Welcome to OI chat</div>
    )
  }
}

export default RoomInfo
