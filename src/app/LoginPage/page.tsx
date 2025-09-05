"use client";
import React, { useState } from "react";
import "./page.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5171/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Login failed");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      if (data.role?.toLowerCase() === "student") {
        alert("Welcome Student!");
        window.location.href ="/HomePage";
      } else if (data.role?.toLowerCase() === "admin") {
        alert("Welcome Admin!");
        window.location.href ="/HomePage";
      } else {
        alert("Welcome " + data.name);
        window.location.href ="/HomePage";
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="loginContainer">
      <form className="loginForm" onSubmit={handleLogin}>
        <h2 className="loginTitle">Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p className="signupText">
          Don't have an account? <a href={"/SignupPage"}>Sign Up</a>
        </p>
      </form>
    </div>
  );
}
