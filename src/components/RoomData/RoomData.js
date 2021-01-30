import React, { Component, Fragment } from 'react'

class RoomData extends Component {
  constructor (props) {
    super(props)
    this.state = {
      placeholder: ''
    }
  }

  render () {
    const { connectedUsers } = this.props

    const usersList = (
      <Fragment>
        <ul>
          {connectedUsers.map(user => <li key={user.owner}>{user.nickname}</li>)}
        </ul>
      </Fragment>
    )

    return (
      <Fragment>
        <div className="chat-sidenav border rounded">
          <p className="text-center">Connected Users</p>
          { connectedUsers.length ? usersList : <div>No connected users</div> }
        </div>
      </Fragment>
    )
  }
}

export default RoomData
