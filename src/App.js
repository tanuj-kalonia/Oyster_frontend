import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Update from "./components/Update";
import Home from "./components/Home";

import './App.css';

function App() {

  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [taskId, setTaskId] = useState('');

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' exact element={
          <Login token={token} setToken={setToken} />
        } />
        <Route path='/register' exact element={<Register token={token} />} />
        <Route path='/update' exact element={<Update taskId={taskId} setTaskId={setTaskId} token={token} />} />
        <Route path='/user' exact element={<Home setTaskId={setTaskId} token={token} setToken={setToken} />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
