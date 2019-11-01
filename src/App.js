import React from 'react'
// import logo from './logo.svg'
import './App.css'

function UserGreeting (props) {
  return <h1>Welcome back!</h1>
}

function GuestGreeting (props) {
  return <h1>Please sign up.</h1>
}
function Greeting (props) {
  const isLoggedIn = props.isLoggedIn
  if (isLoggedIn) {
    return <UserGreeting />
  }
  return <GuestGreeting />
}
function LoginButton (props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  )
}

function LogoutButton (props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  )
}

function PaulWebLink (props) {
  return (
    <button>
      Paul
    </button>
  )
}
function SarahWebLink (props) {
  return (
    <button>
      Sarah
    </button>
  )
}
function VivianWebLink (props) {
  return (
    <button>
      Vivian
    </button>
  )
}

function ContactMenu (props) {
  const isLoggedIn = props.isLoggedIn
  return (
    <div>
      {isLoggedIn ? (
        <>
          <PaulWebLink />
          <SarahWebLink />
          <VivianWebLink />
        </>
      ) : (
        null
      )}
    </div>
  )
}
class App extends React.Component {
  constructor (props) {
    super(props)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.state = { isLoggedIn: false }
  }

  handleLoginClick () {
    this.setState({ isLoggedIn: true })
  }

  handleLogoutClick () {
    this.setState({ isLoggedIn: false })
  }

  render () {
    const isLoggedIn = this.state.isLoggedIn
    let button

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />
    }

    return (
      <div className='App'>
        <div className='App-Header'>
          <Greeting isLoggedIn={isLoggedIn} />
        </div>
        <ContactMenu isLoggedIn={isLoggedIn} />
        {button}
      </div>
    )
  }
}

// function App () {
//   return (
//     <div className='App'>
//       <header className='App-header'>
//         <img src={logo} className='App-logo' alt='logo' />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className='App-link'
//           href='https://reactjs.org'
//           target='_blank'
//           rel='noopener noreferrer'
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   )
// }

export default App
