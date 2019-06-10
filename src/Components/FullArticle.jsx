import React, { Component } from 'react'
import axios from 'axios'
import { Divider, Segment, Header, Image, Container, Grid, Message } from 'semantic-ui-react'
import moment from 'moment'
import ReviewForm from './ReviewForm'

class FullArticle extends Component {
  state = {
    id: '',
    title: '',
    ingress: '',
    body: '',
    image: '',
    written_by: '',
    created_at: '',
    category_name: '',
    country: '',
    city: '',
    success_message: false,
    review_form: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    let mainPath = '/api/v1/articles/'
    let articlePath = (this.props.location.state.id)
    axios.get(mainPath + articlePath).then(response => {
      console.log(response.data)
      this.setState({
        id: response.data.id,
        title: response.data.title,
        ingress: response.data.ingress,
        body: response.data.body,
        image: response.data.image,
        written_by: response.data.written_by,
        created_at: response.data.created_at,
        category_name: response.data.category.name,
        country: response.data.country,
        city: response.data.city
      });
    });
    this.setState({
      success_message: this.props.location.state.success_message,
      review_form: this.props.location.state.review_form
    })
  }

  render() {

    let dateString = this.state.created_at;
    let dateObj = new Date(dateString);
    let momentObj = moment(dateObj);
    let momentString = momentObj.format('YYYY-MM-DD');
    let message
    let review_form

    if (this.state.review_form) {
      review_form = (
        <ReviewForm id={this.state.id} />
      )
    }

    if (this.state.success_message) {
      message = (
        <Message color="green">
          Thank you for sharing your story! Your article is awaiting reviews.
        </Message>
      )
    }

    return (
      <>
        <Container>
          <Grid centered columns={2}>
            <Grid.Column width={12}>
              {message}
              <Segment padded>
                <Header id={`title_${this.state.id}`} as="h1">{this.state.title}</Header>
                <Divider />
                <Image id={`photo_${this.state.id}`} src={this.state.image} size="large" floated="left"></Image>
                <p id={`ingress_${this.state.id}`} style={{ fontSize: "1.2em" }}>{this.state.ingress}</p>
                <p id={`body_${this.state.id}`}>{this.state.body}</p>
                <Divider />
                <strong id={`written_${this.state.id}`}>Written by: {this.state.written_by}</strong>
                <br></br>
                <i id={`date_${this.state.id}`}>{momentString}</i>
                <br></br>
                <strong id={`category_${this.state.id}`}>Category: {this.state.category_name}</strong>
                <br></br>
                <strong id={`country_${this.state.id}`}>Country: {this.state.country}</strong>
                <br></br>
                <strong id={`city_${this.state.id}`}>City: {this.state.city}</strong>
              </Segment>
              {review_form}
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment vertical textAlign='center' className='ads_placeholder'>
                <p>Ads placeholder</p>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
      </>
    )
  }
}

export default FullArticle
