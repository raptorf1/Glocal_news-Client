import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Container, Grid } from 'semantic-ui-react'

class UserPage extends Component {
  state = {
    articles: []
  }

  componentDidMount () {
    axios.get('/api/v1/articles').then(response => {
      this.setState({ articles: response.data });
    })
  }

  render() {
    let str = this.props.currentUser.attributes.uid
    let nameMatch = str.match(/^([^@]*)@/);
    let name = nameMatch ? nameMatch[1] : null;
    let upperName = name.charAt(0).toUpperCase() + name.slice(1)

    let usersArticles = []
    let publishedArticles = []
    let unpublishedArticles = []
    let declinedArticles = []

    this.state.articles.map(article => {
      if (article.user.id == this.props.currentUser.attributes.id) {
        return usersArticles.push(article)
      }
    })

    usersArticles.map(article => {
      if (article.published === true) {
        return publishedArticles.push(article)
      } else if (article.published === false && article.reviews.length < 3) {
        return unpublishedArticles.push(article)
      } else if (article.published === false && article.reviews.length >= 3) {
        return declinedArticles.push(article)
      }
    })


    return (
      <Container>
        <h3>Hello {upperName}. This is your private page.</h3>
        <Grid columns='equal'>
          <Grid.Column>
            <p>Your published articles</p>
            
            
          </Grid.Column>
          <Grid.Column>
            <p>Your unpublished articles</p>
          </Grid.Column>
          <Grid.Column>
            <p>Your declined articles</p>
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

export default connect(mapStateToProps)(UserPage)
