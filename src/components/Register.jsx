import React, { useState, useEffect } from 'react'
import axios from 'axios'


import { Link, useNavigate } from 'react-router-dom'

const Register = ({ token }) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useNavigate();

    useEffect(() => {
        if (token) {
            history('/user');
        }
    }, [])


    const registerHandler = async (e) => {

        try {
            e.preventDefault()
            const { data } = await axios.post('https://oyster-tanuj.herokuapp.com/api/v1/auth/register', {
                name,
                username,
                password
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log(data)
            if (data.success) {
                history('/login');
            }
            else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error)
        }

    }


    return (

        <div className='main container'>
            <div className="loginSection container">
                <h1>Register</h1>
                <form className='container'>
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Enter Your mail"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required

                    />
                    <input
                        id='password'
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        required
                    />

                    <button
                        type="submit"
                        onClick={registerHandler}
                    >
                        Register
                    </button>

                    <p className='login-register'>Already a user, click <Link to={"/login"} >here </Link>to login</p>
                </form>
            </div>
        </div>
    )
}

export default Register