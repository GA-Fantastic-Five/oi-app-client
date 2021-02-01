import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import Message from '../Messages/Message'
import RoomData from '../RoomData/RoomData'
// import RoomInfo from '../RoomInfo/RoomInfo'

// Import react bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ScrollToBottom from 'react-scroll-to-bottom'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'

import apiUrl from '../../apiConfig'

import './ChatHome.scss'

// Import socket.io & set endpoint
import socketio from 'socket.io-client'
// connects our endpoint to our apiUrl logic in api.Config
const endpoint = apiUrl

let io = null

// Create a new component for our Chat Room called 'ChatHome'
class ChatHome extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // create an empty array [empty chatroom]
      messages: [],
      // track all the users connected to the chat
      connectedUsers: [],
      // set our chat message input to an empty string
      chat_message: '',
      sender: '',
      users: []
    }
  }

  componentDidMount () {
    // starts up socket in the client, and passes the connection to our api server
    const { user } = this.props

    // console.log(profile)
    io = socketio(endpoint, {
      query: {
        token: user._id
      }
    })

    // .on sets up a socket event listener
    // when the server emits 'newMessage' client will handle that
    io.on('newMessage', message => {
      // setting the state
      this.setState(prevState => {
        return {
          // returning our message array (prevState.messages), builds a new message with objects unique id(uuid)
          // and the message content
          messages: [ ...prevState.messages, { id: uuid(), content: message.message, sender: message.sender, time: message.time } ]
        }
      })
    })

    io.on('user update', data => {
      this.setState(prevState => {
        return {
          connectedUsers: data
        }
      })
    })
  }

  componentWillUnmount () {
    io.disconnect()
  }

  // Create a controlled input
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  // handling our message
  handleMessage = event => {
    // preventing default because it's a submit
    event.preventDefault()

    // create a promise chain, allowing us to use .then and .catch
    Promise.resolve()
      // .emit sends the server an event called 'message' and sends data as the next argument (second parameter)
      .then(io.emit('message', this.state.chat_message))
      // setting the state so that the message input is once again cleared
      .then(this.setState({ chat_message: '' }))
      .then(this.setState({ sender: '' }))
      .then(this.setState({ time: '' }))
      // catch an error
      .catch(console.error)
  }

  render () {
    // returns our chat with the new message in it (JSX objects) content
    const messageJsx = this.state.messages.map(message => (
      <Message key={message.id} message={message} />
    ))

    return (
      // created divs with classes for our chat form
      <div>
        <div className="row">
          <div className="col-5 col-xl-2 col-lg-3 col-md-4 col-sm-5">
            <RoomData connectedUsers={this.state.connectedUsers} />
          </div>
          <div className="col-7 col-xl-10 col-lg-9 col-md-8 col-sm-7">
            <div className="col-12 p-0 m-0">
              <ScrollToBottom className="message-container border rounded">
                {this.state.messages ? messageJsx : <p>No messages</p>}
              </ScrollToBottom>
            </div>
            <div className="col-12 mt-3 p-0">
              <Form onSubmit={this.handleMessage} style={{ display: 'flex' }}>
                <div className="col-10 p-0 m-0">
                  <Form.Group controlId="formBasicPassword">
                    <Form.Control
                      type="text"
                      placeholder="Write your message"
                      style={{ borderRadius: '.25rem 0 0 .25rem', borderRight: 'transparent' }}
                      name="chat_message"
                      value={this.state.chat_message}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </div>
                <div className="col-2 p-0 m-0">
                  <Button
                    className="w-100"
                    variant="primary"
                    type="submit"
                    style={{ borderRadius: '0 .25rem .25rem 0' }}
                  >
                    Send
                  </Button>
                </div>
              </Form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
// allows us to do history.push, key
export default withRouter(ChatHome)
