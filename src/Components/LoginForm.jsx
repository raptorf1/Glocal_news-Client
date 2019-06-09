import React, { Component } from 'react'
import { Form, Button, Container, Message, Grid, Header } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { signInUser } from '../reduxTokenAuthConfig'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    message: '',
    errorsLogin: ''
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onSubmit = (e) => {
    window.scrollTo(0, 0);
    e.preventDefault();
    const { history, signInUser } = this.props
    const {
      email,
      password
    } = this.state
    signInUser({ email, password })
      .then(response => {
        this.setState({ message: true })
        setTimeout(function () { history.push('/') }, 1000)
      }).catch(error => {
        this.setState({
          errorsLogin: error.response.data.errors[0],
          message: false
        })
      })
  }

  render() {

    let message
    let user = this.props.currentUser.isSignedIn

    if (user === true && this.state.message === true) {
      message = (
        <>
          <br />
          <Message color="green">
            <p>You have succesfully logged in.</p>
          </Message>
        </>
      )
    } else if (this.state.message === false) {
      message = (
        <>
          <br />
          <Message color="red">
            <p>{this.state.errorsLogin}</p>
          </Message>
        </>
      )
    }

    return (
      <Container>
        <Grid centered columns={2}>
          <Grid.Column width={12}>
            <Header as='h3'>
              Login to enjoy the Glocal News!
            </Header>
            <p>{message}</p>
            <Form id="login-form" onSubmit={this.onSubmit}>
              <Form.Input
                required
                id="email"
                value={this.state.email}
                onChange={this.onChangeHandler}
                placeholder="Email"
              />

              <Form.Input
                required
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.onChangeHandler}
                placeholder="Password"
              />
              <Button id="login_form_button">Login</Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={4}>
              <div>
                <a href="https://www.craftacademy.se/">
                  <img className="ad" src="ad_craft.png" />
                </a>
              </div>
              <div>
                <a href="https://www.craftacademy.se/">
                  <img className="ad" src="ad_placeholder.png" />
                </a>
              </div>
              <div>
                <a href="https://www.craftacademy.se/">
                  <img className="ad" src="ad_placeholder.png" />
                </a>
              </div>
            </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps,
  { signInUser },
)(LoginForm)
