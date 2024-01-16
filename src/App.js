import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/home/home';
import About from './views/about/about';
import DefaultCoin from './views/defaultcoin/defaultcoin';
import SignUp from './views/signup/signup';
import Login from './views/login/login';
import Dashboard from "./views/dashboard/dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/defaultcoin" element={<DefaultCoin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
