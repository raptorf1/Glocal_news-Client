import React, { Component } from 'react'
import { Button, Form, Dropdown, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'


class ReviewForm extends Component {
  state = {
    score: '',
    comment: '',
    errors: '',
    review_error_message: false,
    review_success_message: false,
    review_form: true,
    article_id: this.props.id
  }


  handleChangeScore = (e, { value }) => {
    this.setState({ score: value })
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onSubmit = (e) => {
    window.scrollTo(0, 0);
    e.preventDefault();
    const path = `/api/v1/articles/${this.props.id}/reviews`
    const payload = {
      score: this.state.score,
      comment: this.state.comment,
    }
    axios.post(path, payload)
      .then(() =>
        this.setState({
          review_success_message: true,
          review_error_message: false,
          review_form: false
        })
      )
      .catch(error => {
        this.setState({
          review_error_message: true,
          errors: error.response.data.error
        })
      })
  }

  render() {
    const options = [
      { key: '1', text: '1', value: '1' },
      { key: '2', text: '2', value: '2' },
      { key: '3', text: '3', value: '3' },
      { key: '4', text: '4', value: '4' },
      { key: '5', text: '5', value: '5' },
      { key: '6', text: '6', value: '6' },
      { key: '7', text: '7', value: '7' },
      { key: '8', text: '8', value: '8' },
      { key: '9', text: '9', value: '9' },
      { key: '10', text: '10', value: '10' }
    ]

    let review_error_message
    let success_message
    let review_form

    if (this.state.review_error_message) {
      review_error_message = (
        <Message color="red">
          <p>Your review could not be created because of following error(s):</p>
          <ul>
            {this.state.errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </Message>
      )
    }

    if (this.state.review_success_message) {
      success_message = (
        <Message color="green">
          <p>Thank you! Your review has been succesfully saved!</p>
        </Message>
      )
    }

    if (this.state.review_form) {
      review_form = (
        <Segment>
          <Form onSubmit={this.onSubmit}>
            <Dropdown
              style={{ margin: '4px' }}
              clearable
              search
              selection
              placeholder="Select Score"
              options={options}
              id="score_select"
              onChange={this.handleChangeScore}
            />

            <Form.TextArea
              id="comment"
              required
              value={this.state.comment}
              onChange={this.onChangeHandler}
              placeholder="Comment"
            />

            <Button id="create_review">Send Review</Button>
          </Form>
        </Segment>
      )
    }

    return (
      <>
        {review_error_message}
        {review_form}
        {success_message}
      </>
    )
  }
}

export default ReviewForm
