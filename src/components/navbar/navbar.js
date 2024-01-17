import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../authprovider/authprovider';

const Navbar = () => {
    const { user } = useAuth();

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/defaultcoin">Default Coin</Link>
                </li>
                <li>
                    <Link to="/awards">Awards</Link>
                </li>
                {!user && (
                    <>
                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/awardupload">Award Upload</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
