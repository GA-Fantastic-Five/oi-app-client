import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

// Importing the sign up and sign in component
import SignUpForm from './../SignUp/SignUpForm'
import SignInForm from './../SignIn/SignInForm'

// Importing components for sign in and sign up submit handlers
import { signUp, signIn } from '../../api/auth'
import { createProfile, getUserProfile } from '../../api/profiles'
import messages from '../AutoDismissAlert/messages'

// Home SCSS
import './Home.scss'

// Home class constructor
class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      signIn: {
        email: '',
        password: ''
      },
      signUp: {
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  }
  // Handle change function
  handleChange = event => {
    event.persist()

    this.setState(prevState => {
      const parent = event.target.getAttribute('parent')

      return {
        [parent]: { ...prevState[parent], [event.target.name]: event.target.value }
      }
    })
  }
  // On sign in function
  onSignIn = event => {
    event.preventDefault()

    const { msgAlert, history, setUserProfile } = this.props
    const userProfileData = {}

    signIn(this.state.signIn)
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
  // On sign up function
  onSignUp = event => {
    event.preventDefault()

    const { msgAlert, history, setUser, setProfile } = this.props

    signUp(this.state.signUp)
      .then(() => signIn(this.state.signUp))
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
    const { user } = this.props
    const { signIn, signUp } = this.state

    const headingStyle = {
      color: '#000',
      padding: '50px 0'
    }

    const bodyStyle = {
      color: '#000',
      fontSize: '24px',
      padding: '10px 0'
    }

    const boxStyle = {
      backgroundImage: 'url(https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fi.imgur.com%2Fg2CBCy6.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '450px'
    }
    // Authorized
    const authorizedJsx = (
      <Fragment>
        <div className="col-12 col-lg-4 col-md-4 col-sm-12">
          <div className="box">
            <p className="text-center">To start chatting, select Chat above!</p>
          </div>
        </div>
        <div className="col-12 col-lg-8 col-md-8 col-sm-12">
          <div className="box">
            <h3 className="text-center" style={headingStyle}>Come Chat With Oi App</h3>
          </div>
        </div>
      </Fragment>
    )
    //  Unauthorized
    const unauthorizedJsx = (
      <Fragment>
        {/* Sign in Form JSX */}
        <div className="col-12 col-lg-4 col-md-4 col-sm-5">
          <div className="section-title">Sign In</div>
          <div className="box">
            <SignInForm
              email={signIn.email}
              password={signIn.password}
              onSignIn={this.onSignIn}
              handleChange={this.handleChange}
              parent="signIn"
            />
          </div>
          {/* Sign Up Form JSX */}
          <div className="section-title mt-3">Sign Up</div>
          <div className="box">
            <SignUpForm
              email={signUp.email}
              password={signUp.password}
              passwordConfirmation={signUp.passwordConfirmation}
              onSignUp={this.onSignUp}
              handleChange={this.handleChange}
              parent="signUp"
            />
          </div>
        </div>
        <div className="col-12 col-lg-8 col-md-8 col-sm-7">
          <div className="section-title-spacer"></div>
          <div className="box mb-3" style={boxStyle}></div>
          <div className="box mb-3">
            <h3 className="text-center m-0" style={bodyStyle}>A super cool app you can chat with</h3>
          </div>
        </div>
      </Fragment>
    )

    return (
      <Fragment>
        <div className="row">
          { user ? authorizedJsx : unauthorizedJsx }
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Home)
