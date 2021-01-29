import React, { Component } from 'react'
import Message from './Message'

class Messages extends Component {
  render (props) {
    return (
      this.props.messages.map(message => (
        <div key={message.id}>
          <Message message={message} />
        </div>
      ))
    )
  }
}

export default Messages
