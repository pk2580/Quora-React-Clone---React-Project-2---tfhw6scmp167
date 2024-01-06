import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { email_Pattern, user } from '../../constants'
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const email_errorRef = useRef(null)
  const password_errorRef = useRef(null)
  const navigate = useNavigate()
  const handleLogIn = (e) => {
    e.preventDefault()
    if (email !== user?.email) {
      emailRef.current.style.outlineColor = 'red'
      emailRef.current.focus()
      email_errorRef.current.style.display = 'block'

    }
    else if (password !== user?.password) {
      passwordRef.current.style.outlineColor = 'red'
      passwordRef.current.focus()
      password_errorRef.current.style.display = 'block'

    }

    else {
      localStorage.setItem('user', JSON.stringify({ ...user, islogged: true }))
      navigate('/')
      window.location.reload()
    }

  }
  const handleEmailInput = (e) => {
    setEmail(e.target.value.toLowerCase())
    if (email.match(email_Pattern)) {
      email_errorRef.current.style.display = 'none'
      emailRef.current.style.outlineColor = '#1778F2'
    }

  }
  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
    if (password.length >= 5) {
      password_errorRef.current.style.display = 'none'
      passwordRef.current.style.outlineColor = '#1778F2'
    }
  }
  useEffect(() => {
    emailRef.current.focus()
    if (user?.islogged) {
      navigate('/')
    }
  }, [user?.islogged])
  return (
    <div className="login">
      <div className='container'>
        <h1 className="title">Log In</h1>
        <form action="#" method="post" className="login_form" onSubmit={handleLogIn}>
          <label htmlFor='email'>Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter Email*"
            onChange={handleEmailInput}
            ref={emailRef}
            value={email}
          />
          <div id="email_error" ref={email_errorRef}>The email address you entered isn't connected to an account. Find your account and log in.</div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password*"
            onChange={handlePasswordInput}
            ref={passwordRef}
            value={password}
            autoComplete='true'
          />
          <div id="pass_error" ref={password_errorRef}>Wrong password entered</div>
          <input type="submit" value="Login" />
        </form>
        <div className="sign_up">No account yet? <Link to='/signup'>Sign Up</Link></div>
      </div>
    </div>
  )
}

export default Login