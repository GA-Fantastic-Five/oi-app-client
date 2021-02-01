import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import { createProfile } from '../../api/profiles'
import messages from '../AutoDismissAlert/messages'

import SignUpForm from './SignUpForm'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { msgAlert, history, setUser, setProfile } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => {
        setUser(res.data.user)

        const data = { profile: { nickname: res.data.user.email }, user: res.data.user }
        return data
      })
      .then(res => createProfile(res.profile, res.user))
      .then(res => setProfile(res.data.profile))
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (
      <Fragment>
        <SignUpForm
          email={email}
          password={password}
          passwordConfirmation={passwordConfirmation}
          onSignUp={this.onSignUp}
          handleChange={this.handleChange}
        />
      </Fragment>
    )
  }
}

export default withRouter(SignUp)
