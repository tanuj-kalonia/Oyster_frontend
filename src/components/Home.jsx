import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Home = ({ setTaskId, token, setToken }) => {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState('')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const history = useNavigate();


    const fetchTasks = async () => {
        console.log(token)
        await axios.post("https://oyster-tanuj.herokuapp.com/api/v1/user", { user: token })
            .then(res => {
                console.log(res.data);
                setName(res.data.user.name)
                setTasks(res.data.allTask);
            })
            .catch(err => console.log(err));
    }

    const addHandler = async (e) => {
        try {
            e.preventDefault();

            await axios.post('https://oyster-tanuj.herokuapp.com/api/v1/task', { title, description, userId: token })
                .then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        // localStorage.setItem('token', res.data.user.id);
                        // setStatus('Logged in');
                        // setToken(res.data.user.id);
                        // history('/user');
                        console.log(res.data);
                        fetchTasks();

                    }
                    // else setStatus('')
                })
                .catch(err => console.log(err))


        } catch (err) {
            console.log(err);
        }
    }

    const logoutHandler = async () => {

        try {
            await axios.get("https://oyster-tanuj.herokuapp.com/api/v1/auth/logout");

            history('/login');
            localStorage.removeItem('token');
            setToken('');
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        if (token) {

            fetchTasks();
        }
        else history('/login');
    }, [token])
    console.log(token);
    return (
        <div className='home container'>
            <button onClick={logoutHandler}>Logout</button>
            <div className="welcome">
                <h1>Welcome, {name}</h1>
                <h4>This is your task list, where you can add, delete and update the tasks</h4>

                <div className="input">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title of the task"
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description of the task"
                    />
                    <button onClick={addHandler}>Add Task</button>
                </div>
            </div>

            <div className="allTasks container">
                <h1>All Tasks</h1>

                <div className="taskArray container">
                    {tasks.map((task, index) => (
                        <Task
                            key={index}
                            id={task._id}
                            title={task.title}
                            description={task.description}
                            token={token}
                            fetchTasks={fetchTasks}
                            setTaskId={setTaskId}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home


const Task = ({ id, title, description, token, fetchTasks, setTaskId }) => {

    const history = useNavigate();

    const deleteTask = async (taskId) => {

        try {
            console.log(`taskid : ${taskId}`);
            await axios.post(`https://oyster-tanuj.herokuapp.com/api/v1/task/delete`, { taskId, userId: token })
                .then(res => {
                    console.log(res);
                    fetchTasks();
                }).catch(err => console.log(err))

        } catch (error) {
            console.log(error);
        }
    }

    const updateHandler = (taskId) => {
        console.log(taskId);
        setTaskId(taskId);
        history("/update")
    }

    return (
        <div className="task">
            <h3>{title}</h3>
            <p>{description}</p>

            <button className='update-btn' onClick={() => updateHandler(id)} >Update</button>

            <button className='update-btn' onClick={() => deleteTask(id)}>Delete</button>

        </div>
    )
}