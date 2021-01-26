import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import apiUrl from '../../apiConfig'

// Import socket.io & set endpoint
import socketio from 'socket.io-client'
const endpoint = apiUrl

class ChatHome extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    const io = socketio(endpoint)

    io.on('ping', () => {
      console.log('pong')
    })
  }

  render () {
    return <p>Chat</p>
  }
}

export default withRouter(ChatHome)
