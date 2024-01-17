import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './views/home/home';
import About from './views/about/about';
import DefaultCoin from './views/defaultcoin/defaultcoin';
import SignUp from './views/signup/signup';
import Login from './views/login/login';
import Dashboard from "./views/dashboard/dashboard";
import { useAuth } from './components/authprovider/authprovider';
// import Navbar from "./components/navbar/navbar";
import AwardUpload from "./views/awardupload/awardupload";
import Awards from "./views/awards/awards";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/defaultcoin" element={<DefaultCoin />} />
        <Route path="/awards" element={<Awards />} />
        {user ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/awardupload" element={<AwardUpload />} />
            <Route path="/signup" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Navigate to="/login" />} />
            <Route path="/awardupload" element={<Navigate to="/login" />} />
          </>
        )}
        <Route path="*" element={<h1>Not Found!</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
