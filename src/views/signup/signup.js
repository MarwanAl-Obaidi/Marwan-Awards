import React, { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Navbar from '../../components/navbar/navbar';

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("User signed up successfully!");
        } catch (error) {
            console.error("Error signing up:", error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <h2>Sign Up</h2>
            <label>Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default SignUp;
