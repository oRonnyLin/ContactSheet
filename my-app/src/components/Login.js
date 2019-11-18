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
    try {
      const loginResponse = await fetch('http://54.241.230.117:4000/credential', {
        mode: 'cors',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      const jsonResponse = await loginResponse.json()
      console.log(jsonResponse)
      if (jsonResponse.code === 0) {
        props.onLogin(true)
        sessionStorage.setItem('token', jsonResponse.token)
        sessionStorage.setItem('isLoggedin', 'true')
        history.push('/menu')
      } else {
        props.onLogin(false)
      }
    } catch (error) {
      console.log('error: ', error)
      props.onLogin(false)
    }
  }
  return (
    <form className={classes.form}>
      <Fade in timeout={1000}>
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
      <Fade in timeout={1000}>
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
      <Fade in timeout={1000}>
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
