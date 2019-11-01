/* global fetch */
import React from 'react'
import { styled } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #a6a6a6 30%, #666666 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(115, 115, 115, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px'
})

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loginMessage: '',
      isLogined: false,
      success: false
    }
  }

  login () {
    console.log('try to login')
    const { accountId, password } = this.state

    if (accountId === '' || password === '') {
      this.setState({ loginMessage: 'accountId and password cannot be empty', success: false })
    } else {
      const user = {
        accountId: accountId,
        password: password
      }
      console.log(user)
      if (accountId === 'Ronny' && password === '123') {
        this.setState({ isLogined: true, loginMessage: 'Login Successfully', success: true })
      } else {
        this.setState({ isLogined: false, loginMessage: 'Wrong username or password', success: false })
      }
    }
  }

  renderLoginMessage () {
    if (this.state.success) {
      return (<div><font color='green'>{this.state.loginMessage}</font></div>)
    } else {
      return (<div><font color='red'>{this.state.loginMessage}</font></div>)
    }
  }

  render () {
    return (
      <div className='Login'>
        <div className=' w3-card w3-round w3-white'>
          <div className='w3-padding-16 form-inline'>
            <TextField
              label='User name'
              margin='normal'
              variant='outlined'
              floatinglabeltext='Account Id'
              value={this.state.accountId}
              onChange={(event) => this.setState({ accountId: event.target.value })}
            />
            <br />
            <TextField
              label='Password'
              type='password'
              margin='normal'
              variant='outlined'
              floatinglabeltext='Password'
              value={this.state.password}
              onChange={(event) => this.setState({ password: event.target.value })}
            />
            <br />
            <br />
            <MyButton onClick={() => this.login()}> Login </MyButton>
            <br />
          </div>
        </div>
        <div className='w3-container'>
          {this.renderLoginMessage}
        </div>
      </div>
    )
  }
}

export default Login
