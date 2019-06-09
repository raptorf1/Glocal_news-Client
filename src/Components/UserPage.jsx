import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Container, Grid } from 'semantic-ui-react'

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
    let str = this.props.currentUser.attributes.uid
    let nameMatch = str.match(/^([^@]*)@/);
    let name = nameMatch ? nameMatch[1] : null;
    let upperName = name.charAt(0).toUpperCase() + name.slice(1)

    let publishedArticles = []
    let unpublishedArticles = []
    let declinedArticles = []

    this.state.articles.map(article => {
      if (article.user.id == this.props.currentUser.attributes.id) {
        if (article.published === true) {
          return publishedArticles.push(article)
        } else if (article.published === false && article.reviews.length < 3) {
          return unpublishedArticles.push(article)
        } else if (article.published === false && article.reviews.length >= 3) {
          return declinedArticles.push(article)
        }
      }
    })

    let publishedArticlesToDisplay = (
      publishedArticles.map(article => {
        return (
          <Segment id={article.id} color={color} key={article.id}>
            <Grid columns={2}>
              <Grid.Column floated='left' width={11}>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Label tag style={{ backgroundColor: `${color}`, color: 'white' }}>
                  {article.category.name}
                </Label>
              </Grid.Column>
            </Grid>

            <Header id={`title_${article.id}`} as={Link} to={{ pathname: '/full-article', state: { id: `${article.id}` } }}>{article.title}</Header>
            <p id={`country_city_${article.id}`}><Icon name='map marker alternate' />{`${article.city}, ${article.country}`}</p>
          </Segment>
        )
      })

    )

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
