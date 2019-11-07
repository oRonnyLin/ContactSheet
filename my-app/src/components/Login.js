import React from 'react'
import { Fade } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }

}))
function LoginForm (props) {
  const classes = useStyles()
  return (
    <form className={classes.form}>
      <Fade in={props.isBGLoaded} timeout={1000}>
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
      </Fade>
      <Fade in={props.isBGLoaded} timeout={1000}>
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
      </Fade>
      <Fade in={props.isBGLoaded} timeout={1000}>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={props.handleLoginClick}
        >
                Login
        </Button>
      </Fade>
    </form>
  )
}

export default LoginForm
