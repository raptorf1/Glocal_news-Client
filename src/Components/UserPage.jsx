import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Container, Grid, Segment, Icon, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class UserPage extends Component {
  state = {
    articles: []
  }

  componentDidMount() {
    axios.get('/api/v1/articles').then(response => {
      this.setState({ articles: response.data });
    })
  }

  render() {
    let publishedArticlesToDisplay
    let unpublishedArticlesToDisplay
    let declinedArticlesToDisplay
    let upperName

    if (this.props.currentUser.isSignedIn === true) {
      let str = this.props.currentUser.attributes.uid
      let nameMatch = str.match(/^([^@]*)@/);
      let name = nameMatch ? nameMatch[1] : null;
      upperName = name.charAt(0).toUpperCase() + name.slice(1)
  
      let publishedArticles = []
      let unpublishedArticles = []
      let declinedArticles = []
  
      this.state.articles.map(article => {
        if (article.user.id === this.props.currentUser.attributes.id) {
          if (article.published === true) {
            return publishedArticles.push(article)
          } else if (article.published === false && article.reviews.length < 3) {
            return unpublishedArticles.push(article)
          } else if (article.published === false && article.reviews.length >= 3) {
            return declinedArticles.push(article)
          }
        }
      })
  
      publishedArticlesToDisplay = (
        publishedArticles.map(article => {
          return (
            <Segment id={article.id} key={article.id}>
              <Header id={`title_${article.id}`} as={Link} to={{ pathname: '/full-article', state: { id: `${article.id}` } }}>{article.title}</Header>
              <p id={`country_city_${article.id}`}><Icon name='map marker alternate' />{`${article.city}, ${article.country}`}</p>
            </Segment>
          )
        })
      )
  
      unpublishedArticlesToDisplay = (
        unpublishedArticles.map(article => {
          return (
            <Segment id={article.id} key={article.id}>
              <Header id={`title_${article.id}`} as={Link} to={{ pathname: '/full-article', state: { id: `${article.id}` } }}>{article.title}</Header>
              <p id={`country_city_${article.id}`}><Icon name='map marker alternate' />{`${article.city}, ${article.country}`}</p>
            </Segment>
          )
        })
      )
  
      declinedArticlesToDisplay = (
        declinedArticles.map(article => {
          return (
            <Segment id={article.id} key={article.id}>
              <Header id={`title_${article.id}`} as={Link} to={{ pathname: '/full-article', state: { id: `${article.id}` } }}>{article.title}</Header>
              <p id={`country_city_${article.id}`}><Icon name='map marker alternate' />{`${article.city}, ${article.country}`}</p>
            </Segment>
          )
        })
      )
    }


    return (
      <Container>
        <h3>Hello {upperName}. This is your private page.</h3>
        <Grid columns='equal'>
          <Grid.Column id="published_articles">
            <p>Your published articles</p>
            {publishedArticlesToDisplay}
          </Grid.Column>
          <Grid.Column id="unpublished_articles">
            <p>Your unpublished articles</p>
            {unpublishedArticlesToDisplay}
          </Grid.Column>
          <Grid.Column id="declined_articles">
            <p>Your declined articles</p>
            {declinedArticlesToDisplay}
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
