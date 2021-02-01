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
      <div className='col-7 col-xl-10 col-lg-9 col-md-8 col-sm-7 ml-auto'>Welcome to OI chat</div>
    )
  }
}

export default RoomInfo
