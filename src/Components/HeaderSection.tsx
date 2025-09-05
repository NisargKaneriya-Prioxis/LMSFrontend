"use client";
import React, { useEffect, useState } from "react";
import "./stylesheet/Header.css";
import Link from "next/link";

export default function HeaderSection() {
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5171/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    }
    alert("Logged out successfully");
    window.location.href = "/LoginPage";
  };

  return (
    <header className="header">
      <div className="logo">LibraryManagement</div>
      <nav className="nav">
        <a className="active" href="#home">Home</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
        {role !== "Student" && (
                <>
               <Link href={"/User/AllUsers"}>All User</Link>
                </>
            )}
       <Link href={"/Book/BorrowedBook"}>Borrowed Book</Link>
        <a href="#about">Settings</a>
        <a id="logout" onClick={handleLogout}>Logout</a>
      </nav>
    </header>
  );
}
