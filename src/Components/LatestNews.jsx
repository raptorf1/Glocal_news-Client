import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Segment, Icon, Header, Grid, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { getCategoryNames } from '../Modules/categoriesData'
import moment from 'moment'

class LatestNews extends Component {
  state = {
    categories: []
  }

  async componentDidMount() {
    let categories = await getCategoryNames()
    this.setState({
      categories: categories,
    })
  }

  render() {

    let filteredArticlesByCountry = []

    this.props.articles.forEach(article => {
      if (this.props.state.locationReducer.country === '') {
        filteredArticlesByCountry = this.props.articles
      } else if (article.country === this.props.state.locationReducer.country) {
        return filteredArticlesByCountry.push(article)
      }
    })

    const sortedArticlesByTime = filteredArticlesByCountry.sort(function (a, b) {
      let dateA = new Date(a.created_at), dateB = new Date(b.created_at);
      return dateB - dateA;
    })

    let articleList = (
      <>
        {sortedArticlesByTime.map(article => {
          if (article.published === true) {

            let dateString = article.created_at
            let dateObj = new Date(dateString);
            let momentObj = moment(dateObj);
            let momentDate = momentObj.format('YYYY-MM-DD');
            let momentTime = momentObj.format('LT');

            let color
            for (let i = 0; i < this.state.categories.length; i++) {
              if (article.category.name === this.state.categories[i].name) {
                color = (
                  this.state.categories[i].color
                )
              }
            }

            return (
              <Segment id={article.id} key={article.id}>
                <Grid columns={2}>
                  <Grid.Column floated='left' width={11}>
                    <p>{momentDate} | {momentTime} </p>
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
          }
        })
        }
      </>
    )

    return (
      <Container id="latest_news">
        <Header>Latest News</Header>
        {articleList}
      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default (connect(mapStateToProps)(LatestNews))
