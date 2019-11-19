import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import './App.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import LeftGrid from './components/LeftGrid.js'
import LoginForm from './components/Login.js'
import Menu from './components/Menu.js'
import RightGrid from './components/RightGrid.js'
import RedirectPage from './components/RedirectPage.js'
import paulButton from './static/images/button/Paulbutton.jpg'
import vivianButton from './static/images/button/Vivianbutton.jpg'
import sarahButton from './static/images/button/Sarahbutton.jpg'
import groupButton from './static/images/button/Groupbutton.jpg'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  }
}))

function GridMain (props) {
  const classes = useStyles()
  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      {props.children}
    </Grid>
  )
}

function ProtectedRoute (props) {
  return (
    <Route
      path={props.path}
      exact
      render={({ location }) =>
        sessionStorage.getItem('isLoggedin') === 'true' ? (
          props.children
        ) : (
          <Redirect
            to={{
              pathname: '/unauthorized',
              state: { from: location }
            }}
          />
      )}
    />
  )
}

class App extends React.Component {
  constructor (props) {
    super(props)
    // const { cookies } = props;
    this.state = {
      isLoggedin: false,
      logginError: false,
      loadMenuPage: false
    }
    this.setLoginStatus = this.setLoginStatus.bind(this)
    this.setLoadMenuPage = this.setLoadMenuPage.bind(this)
  }

  routeChange () {
    const path = 'newPath'
    this.props.history.push(path)
  }

  setLoadMenuPage (status) {
    this.setState({
      loadMenuPage: true
    })
  }

  setLoginStatus (status) {
    if (status) {
      this.setState({
        isLoggedin: status,
        logginError: false
      })
    } else {
      this.setState({
        logginError: true,
        isLoggedin: status
      })
    }
  }

  renderMessage () {
    if (this.state.logginError) {
      return (<div><font color='red'>Something went wrong, please check if password or username is correct</font></div>)
    } else {
      return null
    }
  }

  render () {
    return (

      <GridMain>
        <div id='preload'>
          <img src={groupButton} alt='preloader' />
          <img src={vivianButton} alt='preloader' />
          <img src={paulButton} alt='preloader' />
          <img src={sarahButton} alt='preloader' />
        </div>
        <LeftGrid />
        <RightGrid isMenuPageLoaded={this.state.loadMenuPage}>
          <Router>
            <Switch>
              <Route path='/' exact>
                <Redirect to='/login' />
              </Route>
              <Route path='/group' exact>
                <Redirect to='/unauthorized' />
              </Route>
              <Route path='/harp' exact>
                <Redirect to='/unauthorized' />
              </Route>
              <Route path='/flute' exact>
                <Redirect to='/unauthorized' />
              </Route>
              <Route path='/viola' exact>
                <Redirect to='/unauthorized' />
              </Route>
              <Route path='/login'>
                <LoginForm
                  // isBGLoaded={this.state.backgroundLoaded}
                  onLogin={(status) => {
                    this.setLoginStatus(status)
                  }}
                  isLoggedin={this.state.isLoggedin}
                />
                {this.renderMessage()}
              </Route>
              <ProtectedRoute path='/menu' isLoggedin={this.state.isLoggedin}>
                <Menu setLoadMenuPage={(status) => { this.setLoadMenuPage(status) }} />
              </ProtectedRoute>
              <Route path='/unauthorized'>
                <RedirectPage Message='Session may have expired or you have not logged in, please try logging in.' />
              </Route>
              <Route>
                <RedirectPage Message='We can not find that page, please start by logging in.' />
              </Route>
            </Switch>
          </Router>
        </RightGrid>
      </GridMain>

    )
  }
}

export default App
