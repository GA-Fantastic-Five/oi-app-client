import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Profiles } from '../../api/Profiles'
class ProfileCreate extends Component {
  constructor (props) {
    super(props)
    // initially our Profiles nickname and avatar will be empty until they are filled in
    this.state = {
      Profile: {
        nickname: '',
        avatar: ''
      },
      // createdId will be null, until we successfully create a Profile
      createdId: null
    }
  }
  handleSubmit = event => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { Profile } = this.state
    // create a Profile, pass it the Profile data and the user for its token
    ProfileCreate(Profile, user)
      // set the createdId to the id of the Profile we just created
      // .then(res => this.setState({ createdId: res.data.Profile._id }))
      .then(res => {
        this.setState({ createdId: res.data.Profile._id })
        // pass the response to the next .then so we can show the nickname
        return res
      })
      .then(res => msgAlert({
        heading: 'Created Profile Successfully',
        message: `Profile has been created successfully. Hello There ${res.data.Profile.nickname}.`,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Profile',
          message: 'Could not create Profile with error: ' + error.message,
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
        // set the Profile state, to what it used to be (...state.Profile)
        // but replace the property with `name` to its current `value`
        // ex. name could be `nickname` or `avatar`
        Profile: { ...state.Profile, [event.target.name]: event.target.value }
      }
    })
  }
  render () {
    // destructure our Profile and createdId state
    const { Profile, createdId } = this.state
    // if the Profile has been created and we set its id
    if (createdId) {
      // redirect to the Profiles show page
      return <Redirect to={`/Profiles/${createdId}`} />
    }
    return (
      <div>
        <h3>Create Profile</h3>
        <Form onSubmit={this.onSignIn}>
          <Form.Group controlId="nickname">
            <Form.Label>Nickname</Form.Label>
            <Form.Control
              required
              type="nickname"
              name="nickname"
              value={this.nickname}
              placeholder="Enter nickname"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="avatar">
            <Form.Label>avatar</Form.Label>
            <Form.Control
              required
              name="avatar"
              value={this.avatar}
              type="avatar"
              placeholder="avatar"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}
export default ProfileCreate
