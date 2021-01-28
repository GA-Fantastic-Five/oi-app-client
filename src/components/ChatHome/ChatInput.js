import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

class ChatInput extends Component {
  render () {
    return (
      <Form onSubmit={this.handleMessage}>
        <InputGroup className="mb-3">
          <Form.Control
            name="chat_message"
            value={this.state.chat_message}
            onChange={this.handleChange}
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" type="submit">SEND</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
    )
  }
}

export default ChatInput
