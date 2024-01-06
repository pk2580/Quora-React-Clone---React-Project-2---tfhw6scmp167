import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { email_Pattern } from '../../constants'
import './SignUp.css'

const SignUp = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const name_errorRef = useRef(null)
    const password_errorRef = useRef(null)
    const email_errorRef = useRef(null)
    const successRef = useRef(null)
    const navigate = useNavigate()

    const handleSignUp = (e) => {
        e.preventDefault()
        if (name.length < 6) {
            nameRef.current.style.outlineColor = 'red'
            nameRef.current.focus()
            name_errorRef.current.style.display = 'block'
        }
        else if (!(email.match(email_Pattern))) {
            emailRef.current.style.outlineColor = 'red'
            emailRef.current.focus()
            email_errorRef.current.style.display = 'block'
        }
        else if (password.length < 6) {
            passwordRef.current.style.outlineColor = 'red'
            passwordRef.current.focus()
            password_errorRef.current.style.display = 'block'
        }
        else {
            localStorage.setItem('user',
                JSON.stringify({
                    username: name,
                    email: email,
                    password: password,
                    islogged: false
                }))
            successRef.current.style.display = 'block'
            setTimeout(() => {
                navigate('/login')
                window.location.reload()
            }, 1000)
        }
    }
    const handleNameInput = (e) => {
        setName(e.target.value)
        if (name.length >= 5) {
            name_errorRef.current.style.display = 'none'
            nameRef.current.style.outlineColor = '#1778F2'
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
        nameRef.current.focus()
    }, [])
    return (
        <div className="signup">
            <div className="container">
                <h1 className="title">Sign Up</h1>
                <form action="#" method="post" className="signup_form" onSubmit={handleSignUp}>
                    <div id="success" ref={successRef}>Account successfully created</div>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="eg. John Doe"
                        onChange={handleNameInput}
                        ref={nameRef}
                        value={name}
                    />
                    <div id="name_error" ref={name_errorRef}>Please Enter a valid name (must be 6-characters)</div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="johndoe@email.com"
                        onChange={handleEmailInput}
                        ref={emailRef}
                        value={email}
                    />
                    <div id="email_error" ref={email_errorRef}>Please enter a valid email address</div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter New Password"
                        onChange={handlePasswordInput}
                        ref={passwordRef}
                        value={password}
                        autoComplete='false'
                    />
                    <div id="pass_error" ref={password_errorRef}>Password must be 6 characters</div>
                    <input type="submit" value="Create account" />
                </form>
                <div className="log_in">Existing user? <Link to='/login'>Log In</Link></div>
            </div>
        </div>
    )
}

export default SignUp