"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";
import "./page.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/HomePage"); 
    }
  }, [router]);

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setError("");
  
  //   try {
  //     const res = await fetch("http://localhost:5171/Auth/Login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });
  
  //     if (!res.ok) {
  //       const err = await res.json();
  //       throw new Error(err.message || "Login failed");
  //     }
  
  //     const data = await res.json();
  
  //     localStorage.setItem("token", data.token);
  //     localStorage.setItem("user", JSON.stringify(data));

  //     router.push("/HomePage");
  //   } catch (err: any) {
  //     setError(err.message);
  //   }
  // };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch("http://localhost:5171/Auth/Login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Login failed");
    }

    const data = await res.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data));
    
    const decoded: any = jwtDecode(data.token);
    const expiryTime = decoded.exp * 1000; 
    localStorage.setItem("tokenExpiry", expiryTime.toString());

    const timeLeft = expiryTime - Date.now();
    if (timeLeft > 0) {
      setTimeout(() => {
        alert("Your session has expired. Please log in again.");
        localStorage.clear();
        window.location.href = "/LoginPage";
      }, timeLeft);
    }

    router.push("/HomePage");
  } catch (err: any) {
    setError(err.message);
  }
};

  return (
    <div className="loginContainer">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h2 className="loginTitle">Login</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

        <button type="submit">Login</button>

        <p className="signupText">
          Don't have an account? <a href={"/SignupPage"}>Sign Up</a>
        </p>
      </form>
    </div>
  );
}
