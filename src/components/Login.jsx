import React, { useState, useEffect } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


import { Link, useNavigate } from 'react-router-dom'

const Login = ({ token, setToken }) => {
    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')

    const [status, setStatus] = useState('');
    const history = useNavigate();

    useEffect(() => {
        if (token) {
            history('/user');
            setStatus('Logged in');
        }
    }, [status, token])

    const loginHandler = async (e) => {
        try {
            e.preventDefault();
            setStatus('Logging in...');

            await axios.post('http://localhost:4000/api/v1/auth/login', { username, password })
                .then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        localStorage.setItem('token', res.data.user.id);
                        setStatus('Logged in');
                        toast.success(`Welcome ${res.data.user.name}`, { duration: 3000 })
                        setToken(res.data.user.id);
                        history('/user');

                    }
                    else {
                        toast.error('Something went wrong', { duration: 3000 })
                        setStatus('')
                    }
                })
                .catch(err => {
                    console.log(err);
                    toast('Incorrect Email or Password')
                })


        } catch (err) {
            console.log(err);
        }


    }
    return (

        <div className='main container'>
            <div className="loginSection container">
                <h1>Login</h1>
                <form action="" className='container'>
                    <input
                        type="text"
                        placeholder="Enter Your mail"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" onClick={loginHandler}> Login</button>
                    <p className='login-register'>First time here, click <Link to={"/register"} >here </Link>to register</p>

                </form>
            </div>
            <Toaster />
        </div>
    )
}

export default Login