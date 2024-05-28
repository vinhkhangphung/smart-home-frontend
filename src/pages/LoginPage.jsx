import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './css/Login.css'
import { set } from 'lodash'
import { useAuth } from '../context/AuthContext'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const { user, login, logout } = useAuth();

  const navigate = useNavigate()

  const onButtonClick = () => {
    // navigate('/home')
    checkAccountExists((accountExists) => {
        // If yes, log in
        if (accountExists) {
            logIn()
            
        }
        // Else, ask user if they want to create a new account and if yes, then log in
        // else if (
        //   window.confirm(
        //     'An account does not exist with this email address: ' + email + '. Do you want to create a new account?',
        //   )
        // ) {
        //   logIn()
        // }
      })
  }

  const checkAccountExists = (callback) => {
    fetch('http://localhost:3080/check-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((r) => r.json())
      .then((r) => {
        callback(r?.userExists)
      })
  }

  const logIn = () => {
    fetch('http://localhost:3080/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => r.json())
      .then((r) => {
        if ('success' === r.message) {
          localStorage.setItem('user', JSON.stringify({ email }))
          // setLoggedIn(true)
          login({ username: "username", password: "password" });
          
          console.log('Logged in')
          navigate('/home')
        } else {
          window.alert('Wrong email or password')
          
        }
      })
  }

  return (
    <div className={'mainContainer'} >
      <div className={'titleContainer'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
    </div>
  )
}

export default Login