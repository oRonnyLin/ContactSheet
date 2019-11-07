/* global fetch */
import React from 'react'
import {
  HashRouter as Router,
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
import GroupContactSheet from './groupContact.js'
import RightGrid from './components/RightGrid.js'
import UnauthPage from './components/UnauthPage.js'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

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
      render={({ location }) => props.isLoggedin ? (
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
      loginPage: [],
      actionPage: [],
      isLoggedin: false,
      token: null,
      accountId: '',
      password: '',
      backgroundLoaded: false,
      logginError: false
    }
    this.handlePassFieldChange = this.handlePassFieldChange.bind(this)
    this.handleUserFieldChange = this.handleUserFieldChange.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
  }

  routeChange () {
    const path = 'newPath'
    this.props.history.push(path)
  }

  handleUserFieldChange (event) {
    this.setState({
      accountId: event.target.value
    })
  }

  handlePassFieldChange (event) {
    this.setState({
      password: event.target.value
    })
  }

  onBackgroundLoaded () {
    this.setState({
      backgroundLoaded: true
    })
  }

  setLoginStatus (status) {
    if (status) {
      this.setState({
        isLoggedin: status
      })
    } else {
      this.setState({
        loggingError: true
      })
    }
  }

  handleButtonPaul () {

  }

  handleButtonVivian () {

  }

  handleButtonSarah () {

  }

  handleButtonGroup () {

  }

  handleLoginClick () {
    const { accountId, password } = this.state
    // const history = useHistory()
    if (accountId === '' || password === '') {
      this.setState({ loginMessage: 'accountId and password cannot be empty', logginError: true })
    } else {
      const user = {
        accountId: accountId,
        password: password
      }
      fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)

      }).then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server')
        }
        response.json().then((data) => {
          console.log(data)
          if (data.code === 0) { // security leak, should use token and get page?
            const date = new Date()
            date.setTime(date.getTime() + (1440 * 60 * 1000)) // expires in 1 day
            // cookie.save("savedAltumUser", user, {path: "/", expires: date});
            this.setState({ isLoggedin: true, loginMessage: 'Login Successfully', success: true })
            // history.replace('/menu')
          } else {
            this.setState({ logginError: true, loginMessage: 'Wrong username or password', success: false })
          }
        })
      }).catch((error) => {
        console.log(error)
        this.setState({ logginError: true, loginMessage: 'Internal Server Error', success: false })
      })
      // console.log('HERE@@@@@@@@@@@@@@@@@@', user)
      // if (accountId === 'Ronny' && password === '123') {
      //   this.setState({ isLoggedin: true, loginMessage: 'Login Successfully', success: true })
      // } else {
      //   this.setState({ isLoggedin: false, loginMessage: 'Wrong username or password', success: false })
      // }
    }
  }

  // componentWillMount () {
  //   const loginPage = []
  //   loginPage.push(<LoginTemp appContext={this} />)
  //   this.setState({ loginPage: loginPage })
  // }

  renderMessage () {
    if (this.state.logginError) {
      return (<div><font color='red'>Wrong username or password</font></div>)
    }
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/login' />
          </Route>
          <Route path='/group'>
            <GroupContactSheet />
          </Route>
          <Route
            render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.pathname}
                  classNames='fade'
                  timeout={600}
                >
                  {/* <div className='App'> */}
                  <GridMain>
                    <LeftGrid onBGLoad={() => { this.onBackgroundLoaded() }} isBGLoaded={this.state.backgroundLoaded} />
                    <RightGrid isBGLoaded={this.state.backgroundLoaded}>
                      <Switch>
                        <Route path='/login'>
                          <LoginForm
                            isBGLoaded={this.state.backgroundLoaded}
                            onLogin={(status) => { this.setLoginStatus(status) }}
                            isLoggedin={this.state.isLoggedin}
                          />
                          {this.renderMessage()}
                        </Route>
                        <ProtectedRoute path='/menu' isLoggedin={this.state.isLoggedin}>
                          <Menu />
                        </ProtectedRoute>
                        <Route path='/unauthorized'>
                          <UnauthPage />
                        </Route>
                      </Switch>
                    </RightGrid>
                  </GridMain>
                  {/* </div> */}
                </CSSTransition>
              </TransitionGroup>
            )}
          />
        </Switch>
      </Router>

    )
  }
}

export default App
