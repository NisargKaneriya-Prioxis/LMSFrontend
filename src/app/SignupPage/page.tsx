"use client"
import { useState } from 'react'
import './page.css'


export default function SignupPage() {
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        role: "User"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormdata(prev => ({ ...prev, [name]: value }));
    };

    const handlesubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5171/InsertUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([formdata])
            });

            if (response.ok) {
                alert("Signup successful");
                setFormdata({ name: "", email: "", password: "", phoneNumber: "", address: "", role: "User" });
                window.location.href = "/HomePage";
            } else {
                const error = await response.text();
                alert("Signup failed" + error);
            }
        } catch (err) {
            console.error("Error during signup:", err);
            alert("Something went wrong");
        }
    }



    return (
        <>
            <div className="loginContainer">
                <form className="loginForm" onSubmit={handlesubmit}>
                    <h2 className="loginTitle">Signup</h2>
                    <input type="text" name="name" placeholder="Name" value={formdata.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={formdata.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formdata.password} onChange={handleChange} required />
                    <input type="number" name="phoneNumber" placeholder="Phone number" value={formdata.phoneNumber} onChange={handleChange} required />
                    <input type="text" name="address" placeholder="Address" value={formdata.address} onChange={handleChange} required />

                    <div className="roleContainer">
                        <label>
                            <input type="radio" name="role" value="Student" checked={formdata.role === "Student"} onChange={handleChange} /> Student
                        </label>
                        <label>
                            <input type="radio" name="role" value="Admin" checked={formdata.role === "Admin"} onChange={handleChange} /> Admin
                        </label>
                    </div>

                    <button type="submit">Sign Up</button>
                    <p className="signupText">
                        Already have an account? <a href={"/LoginPage"}>Login</a>
                    </p>
                </form>
            </div>

        </>
    )
}