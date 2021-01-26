import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// Import react bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import apiUrl from '../../apiConfig'

// Import socket.io & set endpoint
import socketio from 'socket.io-client'
const endpoint = apiUrl

let io = null

class ChatHome extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      chat_message: ''
    }
  }

  componentDidMount () {
    io = socketio(endpoint)

    io.on('newMessage', message => {
      this.setState(prevState => {
        return {
          messages: [ ...prevState.messages, { id: uuid(), content: message } ]
        }
      })
    })
  }

  // Create a controlled input
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  // handleChange = event => {
  //   event.persist()
  //
  //   this.setState(prev => {
  //     return {
  //       chat_message: prev.chat_message + event.target.value
  //     }
  //   })
  // }

  handleMessage = event => {
    event.preventDefault()

    Promise.resolve()
      .then(io.emit('message', this.state.chat_message))
      .then(this.setState({ chat_message: '' }))
      .catch(console.error)
  }

  render () {
    const messageJsx = this.state.messages.map(message => (
      <div key={message.id} className="message">{message.content}</div>
    ))

    return (
      <div className="row">
        <div className="col-12">
          {this.state.messages ? messageJsx : <p>No messages</p>}
        </div>
        <div className="col-12">
          <Form onSubmit={this.handleMessage}>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                placeholder="Write your message"
                name="chat_message"
                value={this.state.chat_message}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(ChatHome)
