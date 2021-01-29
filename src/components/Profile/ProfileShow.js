import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect, Link } from 'react-router-dom'
import { showProfile, deleteProfile } from '../../api/profiles'

class ProfileShow extends Component {
  constructor (props) {
    super(props)
    // initially our profiles state will be null, until it is fetched from the api
    this.state = {
      profile: null,
      deleted: false
    }
  }
  componentDidMount () {
    const { user, match, msgAlert } = this.props
    // make a request for a single profiles
    showProfile(match.params.nickname, user)
      // set the profiles state, to the profiles we got back in the response's data
      .then(res => this.setState({ profile: res.data.profile }))
      .then(() => msgAlert({
        heading: 'Showing Profile Successfully',
        message: 'The profiles is now displayed.',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Profile Failed',
          message: 'Failed to show profiles with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleDelete = event => {
    const { user, msgAlert } = this.props
    // make a delete axios request
    deleteProfile(user)
      // set the deleted variable to true, to redirect to the profiless page in render
      .then(() => this.setState({ deleted: true }))
      .then(() => msgAlert({
        heading: 'Deleted Profile Successfully!',
        message: 'Profile deleted!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Deleting Profile Failed',
          message: 'Failed with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { profile, deleted } = this.state
    const { user } = this.props
    // if we don't have a profiles yet
    if (!profile) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    // if the profiles is deleted
    if (deleted) {
      // redirect to the profiless index page
      return <Redirect to="/profiles" />
    }

    const buttonsJsx = (
      <div>
        <button onClick={this.handleDelete}>Delete Profile</button>
        <button>
          <Link to={'/edit-profile'}>Update Profile</Link>
        </button>
      </div>
    )

    return (
      <div>
        <h3>{profile.nickname}</h3>
        <img src={profile.avatar} />
        { user._id === profile.owner && buttonsJsx }
      </div>
    )
  }
}
export default withRouter(ProfileShow)
