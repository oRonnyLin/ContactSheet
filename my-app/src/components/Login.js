/* global fetch */
import React, { useState } from 'react'
import { Fade } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

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
  const history = useHistory()
  const [accountId, setAccountId] = useState('')
  const [password, setPassword] = useState('')
  const login = async () => {
    const user = {
      accountId: accountId,
      password: password
    }
    const loginResponse = await fetch('http://54.183.206.9:4000/credential', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    const jsonResponse = await loginResponse.json()
    console.log(jsonResponse)
    if (jsonResponse.code === 0) {
      props.onLogin(true)
      history.push('/menu')
    } else {
      props.onLogin(false)
    }
  }
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
          value={accountId}
          onChange={(event) => { setAccountId(event.target.value) }}
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
          value={password}
          onChange={(event) => { setPassword(event.target.value) }}
        />
      </Fade>
      <Fade in={props.isBGLoaded} timeout={1000}>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          className={classes.submit}
          onClick={login}
        >
                Login
        </Button>
      </Fade>
    </form>
  )
}

export default LoginForm
