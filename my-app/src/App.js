/* global fetch */
import React from 'react'
// import logo from './logo.svg'
import './App.css'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://ronnysresource.s3-us-west-2.amazonaws.com/WebImg2+15.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

function Copyright () {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://www.elysiantrio.com/'>
        Elysian Trio
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

function LoginForm (props) {
  const classes = useStyles()
  return (
    <form className={classes.form}>
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='email'
        label='Username'
        name='email'
        autoComplete='email'
        autoFocus
        value={props.accountId}
        onChange={props.handleUserFieldChange}
      />
      <TextField
        variant='outlined'
        margin='normal'
        required
        fullWidth
        name='password'
        label='Password'
        type='password'
        id='password'
        autoComplete='current-password'
        value={props.password}
        onChange={props.handlePassFieldChange}
      />
      <Button
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        onClick={props.handleLoginClick}
      >
              Login
      </Button>

    </form>
  )
}

function RightGrid (props) {
  const classes = useStyles()
  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
            Trio Photo
        </Typography>
        {props.children}
        <Box position='absolute' bottom='50px' mt={5}>
          <Copyright />
        </Box>

      </div>
    </Grid>
  )
}

function LeftGrid (props) {
  const classes = useStyles()

  return (
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
  )
}

function GridMain (props) {
  const classes = useStyles()
  return (
    <Grid container component='main' className={classes.root}>
      <CssBaseline />
      {props.children}
    </Grid>
  )
}

function MenuButton (props) {
  const classes = useStyles()
  return (
    <div>
      <Button
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        onClick={props.handleLoginClick}
      >
              Group
      </Button>
      <Button
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        onClick={props.handleLoginClick}
      >
              Paul
      </Button>
      <Button
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        onClick={props.handleLoginClick}
      >
              Sarah
      </Button>
      <Button
        fullWidth
        variant='contained'
        color='primary'
        className={classes.submit}
        onClick={props.handleLoginClick}
      >
              Vivian
      </Button>
    </div>
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
      password: ''
    }
    this.handlePassFieldChange = this.handlePassFieldChange.bind(this)
    this.handleUserFieldChange = this.handleUserFieldChange.bind(this)
    this.handleLoginClick = this.handleLoginClick.bind(this)
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

  handleLoginClick () {
    const { accountId, password } = this.state
    if (accountId === '' || password === '') {
      this.setState({ loginMessage: 'accountId and password cannot be empty', success: false })
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
          } else {
            this.setState({ isLogined: false, loginMessage: 'Wrong username or password', success: false })
          }
        })
      }).catch((error) => {
        console.log(error)
        this.setState({ isLogined: false, loginMessage: 'Internal Server Error', success: false })
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
    if (this.state.isLoggedin) {
      return (<div><font color='green'>Logged in</font></div>)
    }
  }

  renderRightGrid () {
    if (!this.state.isLoggedin) {
      return (
        <div>
          <LoginForm
            handleUserFieldChange={(event) => this.handleUserFieldChange(event)}
            handlePassFieldChange={(event) => this.handlePassFieldChange(event)}
            handleLoginClick={() => this.handleLoginClick()}
          />
          {this.renderMessage()}
        </div>
      )
    } else {
      return (
        <MenuButton />
      )
    }
  }

  render () {
    return (
      <div className='App'>
        <GridMain>
          <LeftGrid />
          <RightGrid>
            {this.renderRightGrid()}
          </RightGrid>
        </GridMain>
      </div>
    )
  }
}

export default App
