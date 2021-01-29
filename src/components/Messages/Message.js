import React, { Component } from 'react'

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
      this.state.sentByUser
        ? (
          <div className="message">{message.content}</div>
        )
        : (
          <div className="message">{message.content}</div>
        )

    )
  }
}

export default Message
