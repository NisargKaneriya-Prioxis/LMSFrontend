"use client";
import React, { useState } from "react";
import "./stylesheet/Header.css";
import Link from "next/link";

export default function HeaderSection() {
      const [userRole, setUserRole] = useState<string>("Admin"); 
   const handleLogout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/LoginPage"; 
          };
  return (
    <header className="header">
      <div className="logo">LibraryManagement</div>
      <nav className="nav">
        <a className="active" href="#home">Home</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
        {userRole !== "Student" && (
                <>
               <Link href={"/User/AllUsers"}>All User</Link>
               <a href="#about">Add User</a>
                </>
            )}
       <Link href={"/Book/BorrowedBook"}>Borrowed Book</Link>
        <a href="#about">Settings</a>
        <a id="logout" onClick={handleLogout}>Logout</a>
      </nav>
    </header>
  );
}
