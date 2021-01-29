import React, { Component } from 'react'
import Toast from 'react-bootstrap/Toast'
// const timestamp = require('time-stamp')

class Message extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sentByUser: false
    }
  }

  // if (user === user) {
  //   this.state.sentByUser = true
  // }

  render () {
    const { message } = this.props
    return (
    // this.state.sentByUser
    //   ? (
    //     <div className="message">{message.content}</div>
    //   )
    //   : (
    //     <div className="message">{message.content}</div>
    //   )
      <Toast>
        <Toast.Header>
          <img src="picture" className="message rounded mr-2" alt="" />
          <strong className="mr-auto">{message.sender}</strong>
          <small>{new Date().toTimeString()}</small>
        </Toast.Header>
        <Toast.Body>{message.content}</Toast.Body>
      </Toast>
    )
  }
}

export default Message
