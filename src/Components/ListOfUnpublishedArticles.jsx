import React, { Component } from 'react'
import axios from 'axios'
import { Header, Container, Grid, Card, Segment, Icon, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import '../CSS/ListOfUnpublishedArticles.css'
import { getCategoryNames } from '../Modules/categoriesData'

class ListOfUnpublishedArticles extends Component {
  state = {
    articles: [],
    review_success_message: false,
    categories: []
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    let categories = await getCategoryNames()
    this.setState({
      categories: categories,
    })
    axios.get('/api/v1/articles').then(response => {
      this.setState({ articles: response.data });
    });
  }

  render() {

    let articleList = (
      <div>
        {this.state.articles.map(article => {
          if (article.published === false && article.reviews.length < 3) {

            let color
            for (let i = 0; i < this.state.categories.length; i++) {
              if (article.category.name === this.state.categories[i].name) {
                color = (
                  this.state.categories[i].color
                )
              }
            }

            return (
              <Card className='article_card_unpublished' style={{ boxShadow: `0 4px 0 0 ${color}, 0 1px 3px 0 #d4d4d5` }} fluid key={article.id} as={Link} to={{ pathname: '/full-article/', state: { success_message: false, review_form: true, id: article.id } }} >
                <Grid id={article.id} >
                  <Grid.Column width={5} className='article_image_unpublished'>

                    <Segment className='small_card_unpublished' style={{
                      background: `url(${article.image})`
                    }} >
                    </Segment>
                  </Grid.Column>
                  <Grid.Column className='card_content_unpublished' width={11}>
                    <Header as='h2' id={`title_${article.id}`}>{article.title}</Header>
                    <p id={`ingress_${article.id}`}>{article.ingress}</p>
                    <Grid.Row columns={2}>
                      <Grid.Column floated='left' width={12}>
                        <p id={`country_city_${article.id}`}><Icon name='map marker alternate' />{`${article.city}, ${article.country}`} </p>
                      </Grid.Column>
                      <Grid.Column floated='right'>
                        <Label horizontal style={{ backgroundColor: `${color}`, color: 'white' }}>
                          {article.category.name}
                        </Label>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid.Column>
                </Grid>
              </Card>
            )
          }
        })}
      </div>
    )

    return (
      <>
        <Container>

          <Header as='h3'>
            Review an article - help the Glocal News to become even better!
          </Header>
          <Grid centered columns={2}>
            <Grid.Column width={12}>
              {articleList}
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
      </>
    )
  }
}

export default ListOfUnpublishedArticles
