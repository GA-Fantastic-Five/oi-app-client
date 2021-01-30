import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import './App.scss'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
// import Dash from './components/SideNav/Dash'

// Chat home
import ChatHome from './components/ChatHome/ChatHome'
import Home from './components/Home/Home'
import CreateProfile from './components/Profile/Profile'
import ProfileShow from './components/Profile/ProfileShow'
import ProfileIndex from './components/Profile/ProfileIndex'
import ProfileEdit from './components/Profile/ProfileEdit'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      profile: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  setProfile = profile => this.setState({ profile })

  clearUser = () => this.setState({ user: null })

  clearProfile = () => this.setState({ profile: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user, profile } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container mt-3">
          {/* Home route */}
          <Route path='/' render={() => (
            <Home msgAlert={this.msgAlert} setUser={this.setUser} setProfile={this.setProfile} />
          )} />
          {/* User routes */}
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} setProfile={this.setProfile} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} setProfile={this.setProfile} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} clearProfile={this.clearProfile} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          {/* Chat routes */}
          <AuthenticatedRoute user={user} path='/chat' render={() => (
            <ChatHome msgAlert={this.msgAlert} user={user} profile={profile} />
          )} />

          {/* Profile routes */}
          <AuthenticatedRoute user={user} path='/create-profile' render={() => (
            <CreateProfile msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/profiles/:nickname' render={() => (
            <ProfileShow msgAlert={this.msgAlert} user={user} clearProfile={this.clearProfile} />
          )} />
          <AuthenticatedRoute user={user} path='/index-profile' render={() => (
            <ProfileIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/edit-profile' render={() => (
            <ProfileEdit msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
