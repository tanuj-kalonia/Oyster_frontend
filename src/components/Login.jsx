import React, { useState } from 'react'
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom'

const Login = ({ token, setToken }) => {
    const [username, setusername] = useState('')
    const [password, setPassword] = useState('')

    const [status, setStatus] = useState('');
    const history = useNavigate();

    // useEffect(() => {
    //     if (token) {
    //         history('/user');
    //         setStatus('Logged in');
    //     }
    // }, [status, token])

    const loginHandler = async (e) => {
        try {
            e.preventDefault();
            setStatus('Logging in...');

            await axios.post('https://oyster-tanuj.herokuapp.com/api/v1/auth/login', { username, password })
                .then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        localStorage.setItem('token', res.data.user.id);
                        setStatus('Logged in');
                        setToken(res.data.user.id);
                        history('/user');

                    }
                    else setStatus('')
                })
                .catch(err => console.log(err))


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
        </div>
    )
}

export default Login