import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getCategoryNames } from '../Modules/categoriesData'
import { Menu, Divider, Container } from 'semantic-ui-react'
import '../CSS/Header.css'

class HeaderCategory extends Component {
  state = {
    categories: []
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    let categories = await getCategoryNames()
    this.setState({
      categories: categories,
    })
  }

  render() {

    return (
      <>
        <Container id="header_category" >
          <Menu pointing secondary style={{ backgroundColor: "white" }}>
            {this.state.categories.map(c => (
              <Menu.Item
                style={{ margin: "auto" }}
                color={`${c.semantic}`}
                id={c.name.toLowerCase()}
                key={c.id}
                name={c.name}
                as={Link}
                to={{ pathname: `/${c.name.toLowerCase()}`, state: { categoryName: `${c.name}` } }}
                active={this.props.activeItem === c.name.toLowerCase()}
                onClick={this.props.handleItemClick}
              />
            ))}
          </Menu>
          <Divider hidden />
        </Container>
      </>
    )
  }
}
export default HeaderCategory
