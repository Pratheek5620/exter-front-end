"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    const router = useRouter();

    const handleLogin = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        // Hardcoded credentials for demonstration
        const hardcodedUsername = "admin";
        const hardcodedPassword = "password";

        // Basic validation
        if (username !== hardcodedUsername || password !== hardcodedPassword) {
            setError("Invalid username or password.");
            return;
        }

        try {
            // Set login status to true
            setIsLoggedIn(true);

            // Redirect user after successful login
            router.push('/dashboard');
        } catch (error) {
            setError("Failed to log in. Please try again.");
        }
    };
    const buttonStyle = {
        backgroundColor: "#44D62C", // Set background color to #44D62C
        ":hover": {
          backgroundColor: "#3182ce", // hover:bg-blue-700
        },
        color: "white", // text-white
        fontWeight: "bold", // font-bold
        padding: "0.5rem 1rem", // py-2 px-4
        borderRadius: "0.25rem", // rounded
        outline: "none", // focus:outline-none // focus:shadow-outline
      };
    
    
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    <div className="flex items-center justify-between">
                    <a
                        className="inline-block align-baseline font-bold text-sm text-color:#FFCD00 hover:text-yellow-400"
                        href="#"
                    >
                    Forgot Password?
                    </a>
                    <button style={buttonStyle}
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
