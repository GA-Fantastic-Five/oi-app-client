import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

// Importing the chat page component
import ChatHome from './components/ChatHome/ChatHome'

// Importing the profile pages components
import Home from './components/Home/Home'
import CreateProfile from './components/Profile/CreateProfile'
import ShowProfile from './components/Profile/ShowProfile'
import IndexProfile from './components/Profile/IndexProfile'
import EditProfile from './components/Profile/EditProfile'

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

  // Combining setUser and setProfile to avoid rendering twice and not having
  // the profile data ready.
  setUserProfile = data => this.setState({ user: data.user, profile: data.profile })

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
        <Header user={user} profile={profile} />
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

        <main className="container" style={{ marginTop: '2rem' }}>

          {/*
            Home route

            Displays both the unauthorized and authorized home component. The home
            route checks if the user is signed in or not and displays the correct
            jsx accordingly.
          */}
          <Route exact path='/' render={() => (
            <Home
              msgAlert={this.msgAlert}
              user={user}
              setUser={this.setUser}
              setProfile={this.setProfile}
              setUserProfile={this.setUserProfile}
            />
          )} />

          {/* User routes */}
          <Route path='/sign-up' render={() => (
            <div className="row">
              <div className="col-sm-10 col-md-6 mx-auto">
                <div className="section-title">Sign Up</div>
                <div className="box">
                  <SignUp msgAlert={this.msgAlert} setUser={this.setUser} setProfile={this.setProfile} />
                </div>
              </div>
            </div>
          )} />
          <Route path='/sign-in' render={() => (
            <div className="row">
              <div className="col-sm-10 col-md-6 mx-auto">
                <div className="section-title">Sign In</div>
                <div className="box">
                  <SignIn msgAlert={this.msgAlert} setUserProfile={this.setUserProfile} />
                </div>
              </div>
            </div>
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

          {/*
              Profile Routes

              All the routes with "/profiles/" signifies that you are interacting
              with a foreign profile, not your own.

              All the routes with "/profile/" signfiies that you are interacting
              with your own personal profile.
          */}
          <AuthenticatedRoute user={user} exact path='/profiles' render={() => (
            <IndexProfile msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/profiles/:nickname' render={() => (
            <ShowProfile msgAlert={this.msgAlert} user={user} clearProfile={this.clearProfile} />
          )} />
          <AuthenticatedRoute user={user} path='/profile/create' render={() => (
            <CreateProfile msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/profile/edit' render={() => (
            <EditProfile msgAlert={this.msgAlert} user={user} setProfile={this.setProfile} />
          )} />

        </main>
      </Fragment>
    )
  }
}

export default App
