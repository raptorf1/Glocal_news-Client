import React, { Component } from 'react';
import HeaderCategory from './HeaderCategory'
import { Menu, Header, Container, Divider, Segment, Icon, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import '../CSS/Header.css'
import { signOutUser } from '../reduxTokenAuthConfig';
import { withRouter } from 'react-router-dom';
import { COUNTRY_OPTIONS } from '../Modules/countriesData'

class HeaderMain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'news'
    }
  };

  handleItemClick = (e) => {
    const category = e.target.id[0].toLowerCase() + e.target.id.slice(1);
    this.setState({ activeItem: category })
    window.scrollTo(0, 0)
  }

  signOut = (e) => {
    e.preventDefault()
    const { history, signOutUser } = this.props
    signOutUser()
      .then(response => {
        history.push('/')
      })
  }

  handleCountryChange = (e, { value }) => {
    this.props.countryChangedHandler(value)
  }

  render() {


    window.onscroll = function () { headerSticky() };

    let header = document.getElementById("sticky_header");
    let sticky = 5;

    let headerSticky = () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky_class");
      } else {
        header.classList.remove("sticky_class");
      }
    }


    const mainLabels = [
      {
        name: 'Write An Article',
        link: '/write-article',
        id: 'write_article'
      }, {
        name: 'Review Articles',
        link: '/review-articles',
        id: 'review_articles'
      }
    ]

    const { signOut } = this

    let user = this.props.currentUser.isSignedIn
    let userSession = this.props.currentUser.attributes.uid
    let labels
    if (user === true) {
      let str = userSession
      let nameMatch = str.match(/^([^@]*)@/);
      let name = nameMatch ? nameMatch[1] : null;
      labels = (
        <>
          <Menu.Item
            key='welcome'
            name={`Welcome ${name}`}
            id='welcome'
          />

          <Menu.Item
            key='logOut'
            name='LogOut'
            onClick={signOut}
            id='logOut'
          />
        </>
      )
    } else {
      labels = (
        <>
          <Menu.Item
            key='signup'
            name='Sign Up'
            as={Link}
            to='/signup'
            id='sign_up'
          />

          <Menu.Item
            key='login'
            name='Log In'
            as={Link}
            to='/login'
            id='login'
          />
        </>
      )
    }

    return (
      <>
        <Container id="header" textAlign="center">
          <Divider hidden />
          <Header
            id='news'
            name='logo'
            as={Link}
            to={{ pathname: '/', state: { activeItem: this.state.activeItem } }}
            style={{ fontSize: "1em" }}
            onClick={this.handleItemClick}
          >
            <h1 id="news_logo" style={{ color: '#2C4138', fontSize: "3em" }}>
              GL
              <Icon fitted name='globe' size='large'
                style={{ color: '#86A499' }}
              />
              CAL NEWS
            </h1>
          </Header>
          <Divider hidden />
        </Container>

        <Container>
          <Container id="sticky_header">
            <Container>
              <Segment className='header_segment' inverted>
                <Menu secondary>

                  <Dropdown
                    clearable
                    search
                    selection
                    style={{ border: 'none', margin: '2px' }}
                    placeholder="Select Country"
                    options={COUNTRY_OPTIONS}
                    id="country"
                    onChange={this.handleCountryChange}
                  />

                  {mainLabels.map(m => (
                    <Menu.Item
                      key={m.name}
                      name={m.name}
                      as={Link}
                      to={m.link}
                      id={m.id}
                    />
                  ))}
                  <Menu.Menu position='right'>
                    {labels}
                  </Menu.Menu>
                </Menu>
              </Segment>
            </Container>

            <Container>
              <HeaderCategory
                handleItemClick={this.handleItemClick} activeItem={this.state.activeItem} />
            </Container>
          </Container>
        </Container>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    currentUser: state.reduxTokenAuth.currentUser
  }
}

const mapDispatchToProps = {
  countryChangedHandler: country => ({
    type: "CHANGE_COUNTRY",
    country: country
  }),
  signOutUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderMain))
