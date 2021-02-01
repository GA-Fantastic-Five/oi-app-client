import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { indexProfiles } from '../../api/profiles'

class ProfileIndex extends Component {
  constructor (props) {
    super(props)

    // keep track of the profiles in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      profiles: null
    }
  }

  componentDidMount () {
    const { msgAlert, user } = this.props

    indexProfiles(user)
      .then(res => this.setState({ profiles: res.data.profiles }))
      .then(() => msgAlert({
        heading: 'Loaded Profiles Successfully',
        message: 'Profiles Are Here! Pick One!',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Load Profiles',
          message: 'Oops somethingwent wrong: ' + error.message
        })
      })
  }

  render () {
    // destructure our profiles state
    const { profiles } = this.state

    // if we haven't fetched any profiles yet from the API
    if (!profiles) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>

      )
    }

    const profilesJsx = profiles.map(profile => (
      <Link to={`/profiles/${profile.nickname}`} key={profile._id}>
        <Button className="w-100" variant="primary">
          {profile.nickname}
        </Button>
      </Link>
    ))

    return (
      <div className="index">
        <h3>Profiles</h3>
        <Card>
          <Card.Title>Card Title</Card.Title>
          <Card.Body>{profilesJsx}</Card.Body>
        </Card>
      </div>
    )
  }
}

export default ProfileIndex
