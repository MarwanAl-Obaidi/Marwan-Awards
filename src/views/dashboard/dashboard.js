import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully!");
            navigate('/login');
        } catch (error) {
            console.error("Error signing out:", error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <h2>Dashboard</h2>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default Dashboard;
