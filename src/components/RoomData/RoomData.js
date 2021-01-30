import React, { Component } from 'react'

class RoomData extends Component {
  constructor (props) {
    super(props)
    this.state = {
      placeholder: ''
    }
  }
  render () {
    return (
      <div>{this.props.profile.nickname}</div>
    )
  }
}

export default RoomData
