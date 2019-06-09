import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

class UserPage extends Component {
  state = {
  }
  render() {
    let str = this.props.currentUser.attributes.uid
    let nameMatch = str.match(/^([^@]*)@/);
    let name = nameMatch ? nameMatch[1] : null;
    let upperName = name.charAt(0).toUpperCase() + name.slice(1)

    return (
      <>
        <p>Hello {upperName}. This is your private page.</p>
        <p>Your published articles</p>
        <p>Your unpublished articles</p>
        <p>Reviews you have left</p>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(mapStateToProps)(UserPage)
