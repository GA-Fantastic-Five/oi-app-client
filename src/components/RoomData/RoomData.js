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
        <ul className="p-0 mt-2" style={{ listStyle: 'none' }}>
          {connectedUsers.map(user => <li key={user.owner} className="text-center">{user.nickname}</li>)}
        </ul>
      </Fragment>
    )

    return (
      <Fragment>
        <div className="chat-sidenav border rounded">
          <p className="text-center text-light bg-primary p-2 m-0" style={{ borderRadius: '.25rem .25rem 0 0' }}>Connected Users</p>
          <hr className="m-0 bg-primary" />
          { connectedUsers.length ? usersList : <div>No connected users</div> }
        </div>
      </Fragment>
    )
  }
}

export default RoomData
