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
import ButtonBase from '@material-ui/core/ButtonBase'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'material-ui-image'
import paulButton from './static/images/button/Paulbutton.jpg'
import vivianButton from './static/images/button/Vivianbutton.jpg'
import sarahButton from './static/images/button/Sarahbutton.jpg'
import groupButton from './static/images/button/Groupbutton.jpg'
import { Fade } from '@material-ui/core'
import LazyLoad from 'react-lazyload'
import { Transition } from 'react-transition-group'

const duration = 300

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}
class FadeIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false
    }
    this.onLoad = this.onLoad.bind(this)
  }

  onLoad () {
    this.setState({ loaded: true })
  }

  render () {
    const { height, children } = this.props
    const { loaded } = this.state

    return (
      <LazyLoad height={height} offset={150}>
        <Transition in={loaded} timeout={duration}>
          {state =>
            <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
              {children(this.onLoad)}
            </div>}
        </Transition>
      </LazyLoad>
    )
  }
}
const buttonImages = [
  {
    url: groupButton,
    title: 'Group',
    width: '100%'
  },
  {
    url: vivianButton,
    title: 'Vivian',
    width: '100%'
  },
  {
    url: paulButton,
    title: 'Paul',
    width: '100%'
  },
  {
    url: sarahButton,
    title: 'Sarah',
    width: '100%'
  }
]
const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    // backgroundImage: 'url(https://ronnysresource.s3-us-west-2.amazonaws.com/WebImg2+15.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: '3000'
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
  },
  test: {
    // maxWidth: '100%'
    // // height: '200px',
    // // // width: '200px',
    objectFit: 'cover'
  },
  buttonImageRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
    paddingBottom: '5px'
  },
  menuRoot: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  buttonImage: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15
      },
      '& $imageMarked': {
        opacity: 0
      },
      '& $imageTitle': {
        border: '4px solid currentColor'
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    fontSize: '30px'
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
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
        <Box position='absolute' bottom='25px' mt={5}>
          <Copyright />
        </Box>

      </div>
    </Grid>
  )
}

function LeftGrid (props) {
  const classes = useStyles()

  return (
    <Fade in='true'>
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        {/* <Grid item xs={false} sm={4} md={7}> */}
        {/* <div className='test'> */}
        {/* <FadeIn height='100%'>
          {onLoad =>
            <img objectFit='cover' height='100vh' className={classes.test} onLoad={onLoad} src='https://ronnysresource.s3-us-west-2.amazonaws.com/WebImg2+15.jpg' alt='alt' />}
        </FadeIn> */}

        <Image imageStyle={{ objectFit: 'cover' }} style={{ objectFit: 'cover' }} src='https://ronnysresource.s3-us-west-2.amazonaws.com/WebImg2+15.jpg' alt='alt' />
        {/* </div> */}
      </Grid>
    </Fade>
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

function ImageMenuButton (props) {
  const classes = useStyles()
  return (
    <div className={classes.menuRoot}>
      {buttonImages.map((image, index) => (
        <div key={index} className={classes.buttonImageRoot}>
          <Fade in='true'>
            <ButtonBase
              focusRipple
              key={image.title}
              className={classes.buttonImage}
              focusVisibleClassName={classes.focusVisible}
              style={{
                width: image.width
              }}
            >
              <Fade in='true'>
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${image.url})`
                  }}
                />
              </Fade>
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component='span'
                  variant='subtitle1'
                  color='inherit'
                  className={classes.imageTitle}
                >
                  {image.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
          </Fade>
        </div>
      ))}
    </div>
  )
}

// function MenuButton (props) {
//   const classes = useStyles()
//   return (
//     <div>
//       <Button
//         fullWidth
//         variant='contained'
//         color='primary'
//         className={classes.submit}
//         onClick={props.handleLoginClick}
//       >
//               Group
//       </Button>
//       <Button
//         fullWidth
//         variant='contained'
//         color='primary'
//         className={classes.submit}
//         onClick={props.handleLoginClick}
//       >
//               Paul
//       </Button>
//       <Button
//         fullWidth
//         variant='contained'
//         color='primary'
//         className={classes.submit}
//         onClick={props.handleLoginClick}
//       >
//               Sarah
//       </Button>
//       <Button
//         fullWidth
//         variant='contained'
//         color='primary'
//         className={classes.submit}
//         onClick={props.handleLoginClick}
//       >
//               Vivian
//       </Button>
//     </div>
//   )
// }

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
          <Fade in={!this.state.isLoggedin}>
            <LoginForm
              handleUserFieldChange={(event) => this.handleUserFieldChange(event)}
              handlePassFieldChange={(event) => this.handlePassFieldChange(event)}
              handleLoginClick={() => this.handleLoginClick()}
            />

          </Fade>
        </div>
      )
    } else {
      return (
        <ImageMenuButton />
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
