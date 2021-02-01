import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import { getUserProfile } from '../../api/profiles'
import messages from '../AutoDismissAlert/messages'

import SignInForm from './SignInForm'

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { msgAlert, history, setUserProfile } = this.props
    const userProfileData = {}

    signIn(this.state)
      .then(res => { userProfileData.user = res.data.user })
      .then(res => getUserProfile(userProfileData.user))
      .then(res => { userProfileData.profile = res.data.profile })
      .then(res => setUserProfile(userProfileData))
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <Fragment>
        <SignInForm
          email={email}
          password={password}
          onSignIn={this.onSignIn}
          handleChange={this.handleChange}
        />
      </Fragment>
    )
  }
}

export default withRouter(SignIn)
