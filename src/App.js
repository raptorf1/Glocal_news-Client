import React, { Component } from 'react';
import HeaderMain from './Components/HeaderMain.jsx'
import WriteArticle from './Components/WriteArticle'
import ListOfUnpublishedArticles from './Components/ListOfUnpublishedArticles'
import { Switch, Route, Redirect } from 'react-router-dom'
import FullArticle from './Components/FullArticle'
import ArticlesByCategory from './Components/ArticlesByCategory'
import UserPage from './Components/UserPage'
import { getCategoryPaths } from './Modules/categoriesData'
import LoginForm from './Components/LoginForm';
import SignUpForm from './Components/SignUpForm';
import { generateRequireSignInWrapper } from 'redux-token-auth';


const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/login',
})

class App extends Component {
  state = {
    paths: [],
    country: ''
  }

  async componentWillMount() {
    let categoryPaths = await getCategoryPaths()
    this.setState({ paths: categoryPaths })
  }

  render() {
    return (
      <>
        <HeaderMain />
        <Switch>
          <Route exact path='/' render={() => (<Redirect to="/news" component={ArticlesByCategory} activeItem={'news'} />)}></Route>
          <Route exact path={this.state.paths} component={ArticlesByCategory}></Route>
          <Route exact path='/write-article' component={requireSignIn(WriteArticle)}></Route>
          <Route exact path='/review-articles' component={requireSignIn(ListOfUnpublishedArticles)}></Route>
          <Route exact path='/full-article' component={requireSignIn(FullArticle)}></Route>
          <Route exact path='/login' component={LoginForm}></Route>
          <Route exact path='/signup' component={SignUpForm}></Route>
          <Route exact path='/user-page' component={UserPage}></Route>
        </Switch>
      </>
    );
  }
}

export default App
