import React from 'react'
import './Home.scss'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Home = () => {
  // const backgroundImageUrl = 'IMG_0874.JPG'
  // console.log('backgroundImageUrl in Home component', backgroundImageUrl)
  // const homeStyles = {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundImage: `url(${backgroundImageUrl})`,
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  //   height: '100vh',
  //   color: 'HotPink',
  //   textAlign: 'center'
  // }
  const headingStyle = {
    color: 'white'

  }
  return (
    // <div style={homeStyles}>
    <div className='home' style={headingStyle}>
      <h1>Come Chat With Oi App</h1>

      <Link to='/sign-up'>
        <Button className='primary' variant="primary">Make An Account!</Button>
      </Link>
      <Link to='/sign-in'>
        <Button className='primary' variant="primary">Sign In To Chat!</Button>
      </Link>
    </div>
    // </div>
  )
}
export default Home
