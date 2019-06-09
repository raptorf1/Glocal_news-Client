import React, { Component } from 'react'
import { Form, Container, Button, Message, Dropdown, Header } from 'semantic-ui-react'
import axios from 'axios'
import { COUNTRY_OPTIONS } from '../Modules/countriesData'
import { getCategories } from '../Modules/categoriesData'

class WriteArticle extends Component {
  state = {
    id: '',
    title: '',
    ingress: '',
    body: '',
    image: '',
    written_by: '',
    category_id: '',
    errors: '',
    categories: [],
    country: '',
    city: '',
    success_message: false,
    error_message: false
  }

  async componentDidMount() {
    let categories = await getCategories()
    this.setState({ categories: categories });
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onSubmit = (e) => {
    window.scrollTo(0, 0);
    e.preventDefault();
    const path = '/api/v1/articles'
    const payload = { ...this.state }
    axios.post(path, payload)
      .then(response => {
        console.log(response)
        this.props.history.push({
          pathname: '/full-article',
          state: { success_message: true, review_form: false, id: response.data.article_id }
        })

      })
      .catch(error => {
        this.setState({
          error_message: true,
          errors: error.response.data.error
        })
      })
  }

  handleChangeCategory = (e, { value }) => {
    this.setState({ category_id: value })
  }

  handleChangeCountry = (e, { value }) => {
    this.setState({ country: value })
  }

  render() {
    let message

    const options = this.state.categories.map(category => {
      return { key: category.id, text: category.name, value: category.id }
    })

    if (this.state.error_message) {
      message = (
        <>
          <br />
          <Message color="red">
            <p>Your article could not be created because of following error(s):</p>
            <ul>
              {this.state.errors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Message>
        </>
      )
    }

    return (
      <>
        <Container>
          <Header as='h3'>
            Write an article and share your story glocally!
          </Header>
          <p>{message}</p>
          <Form type="medium" id="write-article" onSubmit={this.onSubmit}>
            <Form.Input
              id="title"
              required
              value={this.state.title}
              onChange={this.onChangeHandler}
              placeholder="Title"
            />
            <Form.TextArea
              id="ingress"
              required
              value={this.state.ingress}
              onChange={this.onChangeHandler}
              placeholder="Ingress"
            />
            <Form.TextArea rows={15}
              id="body"
              required
              value={this.state.body}
              onChange={this.onChangeHandler}
              placeholder="Body"
            />
            <Form.Input
              id="written_by"
              required
              value={this.state.written_by}
              onChange={this.onChangeHandler}
              placeholder="Written By"
            />
            <Form.Input
              id="image"
              required
              value={this.state.image}
              onChange={this.onChangeHandler}
              placeholder="https://image.com"
            />
            <Dropdown
              clearable
              search
              selection
              placeholder="Select Category"
              options={options}
              id="category_select"
              onChange={this.handleChangeCategory}
            />
            <br></br>
            <br></br>
            <Dropdown
              clearable
              search
              selection
              placeholder="Select Country"
              options={COUNTRY_OPTIONS}
              id="select_country"
              onChange={this.handleChangeCountry}
            />
            <br></br>
            <br></br>
            <Form.Input
              id="city"
              required
              value={this.state.city}
              onChange={this.onChangeHandler}
              placeholder="City Name"
            />
            <br></br>
            <br></br>
            <Button id="create">Create Article</Button>
          </Form>
        </Container>
      </>
    )
  }
}

export default WriteArticle
