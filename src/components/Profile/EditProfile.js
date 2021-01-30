import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { updateProfile } from '../../api/profiles'
import ProfileForm from './ProfileForm'

class ProfileCreate extends Component {
  constructor (props) {
    super(props)

    // initially our profiles title and director will be empty until they are filled in
    this.state = {
      profile: {
        nickname: '',
        avatar: ''
      },
      // createdId will be null, until we successfully create a profile
      updated: false
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const { user, msgAlert, setProfile } = this.props
    const { profile } = this.state

    // create a profile, pass it the profile data and the user for its token
    updateProfile(profile, user)
      // set the createdId to the id of the profile we just created
      .then(res => {
        this.setState({ updated: true })
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => setProfile(res.data.profile))
      .then(res => msgAlert({
        heading: 'Profile Successfully Updated',
        message: 'Profile has been successfully updated.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Profile',
          message: 'Could not create profile with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  // when an input changes, update the state that corresponds with the input's name
  handleChange = event => {
    // in react, an event is actually a SyntheticEvent
    // to ensure the properties are not set to null after handleChange is finished
    // we must call event.persist
    event.persist()

    this.setState(state => {
      // return our state changge
      return {
        // set the profile state, to what it used to be (...state.profile)
        // but replace the property with `name` to its current `value`
        // ex. name could be `title` or `director`
        profile: { ...state.profile, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    // destructure our profile and createdId state
    const { profile, updated } = this.state
    // if the profile has been created and we set its id
    if (updated) {
      // redirect to the profiles show page
      return <Redirect to={`/profiles/${profile.nickname}`} />
    }

    return (
      <Fragment>
        <h3>Edit Profile</h3>
        <ProfileForm
          profile={profile}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </Fragment>
    )
  }
}

export default ProfileCreate
