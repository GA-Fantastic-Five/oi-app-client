import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect, Link } from 'react-router-dom'
import { showProfile } from '../../api/profiles'

class ProfileShow extends Component {
  constructor (props) {
    super(props)
    // initially our profiles state will be null, until it is fetched from the api
    this.state = {
      profiles: null,
      deleted: false
    }
  }
  componentDidMount () {
    const { user, match, msgAlert } = this.props
    // make a request for a single profiles
    showProfile(match.params.nickname, user)
      // set the profiles state, to the profiles we got back in the response's data
      .then(res => this.setState({ profiles: res.data.profile }))
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
  // handleDelete = event => {
  //   const { user, msgAlert, match } = this.props
  //   // make a delete axios request
  //   deleteProfile(match.params.id, user)
  //     // set the deleted variable to true, to redirect to the profiless page in render
  //     .then(() => this.setState({ deleted: true }))
  //     .then(() => msgAlert({
  //       heading: 'Deleted Profile Successfully!',
  //       message: 'Profile deleted!',
  //       variant: 'success'
  //     }))
  //     .catch(error => {
  //       msgAlert({
  //         heading: 'Deleting Profile Failed',
  //         message: 'Failed with error: ' + error.message,
  //         variant: 'danger'
  //       })
  //     })
  // }
  render () {
    const { profiles, deleted } = this.state
    // if we don't have a profiles yet
    if (!profiles) {
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
    return (
      <div>
        <h3>{profiles.nickname}</h3>
        <button onClick={this.handleDelete}>Delete Profile</button>
        <button>Update Profile</button>
        <button>
          <Link to={`/profiles/${profiles._id}/edit`}>Update Profile</Link>
        </button>
      </div>
    )
  }
}
export default withRouter(ProfileShow)
