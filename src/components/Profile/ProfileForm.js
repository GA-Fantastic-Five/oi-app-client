import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
const ProfileForm = ({ profile, handleSubmit, handleChange }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Label>Nickname</Form.Label>
      <Form.Control
        placeholder='Got A Name?'
        // This name should line up with the state we want to change
        // name='nickname'
        value={profile.nickname}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Avatar</Form.Label>
      <Form.Control
        placeholder='Enter profile avatar, a link to your image'
        // This name should line up with the state we want to change
        // name='avatar'
        value={profile.avatar}
        onChange={handleChange}
      />
      <Button variant="primary" type="submit">
        Create Me
      </Button>
    </Form.Group>
  </Form>
)
export default ProfileForm
