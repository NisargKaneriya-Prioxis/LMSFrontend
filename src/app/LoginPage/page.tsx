"use client"
import React from "react";
import './page.css'

export default function LoginPage(){
    return (
        <>
         <div className="loginContainer">
      <form className="loginForm">
        <h2 className="loginTitle">Login</h2>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
        <p className="signupText">
          Don't have an account? <a href={"/SignupPage"}>Sign Up</a>
        </p>
      </form>
    </div>
        </>
        
    )
} 