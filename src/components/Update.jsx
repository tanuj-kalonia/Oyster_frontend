import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Update = ({ taskId, setTaskId, token }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    // const [completed, setCompleted] = useState(false)

    const history = useNavigate();
    const updateHandler = (e) => {
        try {
            e.preventDefault();
            console.log(taskId, token)
            axios.post("http://localhost:4000/api/v1/task/update", { taskId, userId: token, title, description })
                .then(res => {
                    console.log(res.data)
                    setTaskId('');
                    history('/user');
                })
                .catch(err => console.log(err))

        } catch (error) {
            console.log(error)
        }

    }
    return (

        <div className='main container'>
            <div className="loginSection container">
                <h1>Update Task</h1>
                <form className='container'>
                    <input
                        type="text"
                        placeholder="New Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="New Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required

                    />

                    <button
                        type="submit"
                        onClick={updateHandler}
                    >
                        Update
                    </button>
                    <Link to={"/user"} ><button>Cancel</button></Link>


                </form>
            </div>
        </div>
    )
}

export default Update;