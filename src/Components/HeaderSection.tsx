"use client";
import React, { useEffect, useState } from "react";
import "./stylesheet/Header.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTokenCheck } from "@/app/TokenExpire/page";

export default function HeaderSection() {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();


  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setRole(parsed.role);
    }
}, []);

const handleLogout = async () => {
  const confirmLogout = window.confirm("Are you sure you want to log out?");
  if (!confirmLogout) return; 

  const token = localStorage.getItem("token");
  
  if (!token) {
    window.location.href = "/LoginPage";
    return;
  }

  try {
    await fetch("http://localhost:5171/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Logout request failed:", error);
  }

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
        <Link href={"/AboutUsPage"}>About</Link>
        {role && role !== "Student" && (
                <>
               <Link href={"/User/AllUsers"}>Users</Link>
               <Link href={"/Categories/AllCategories"}>Category</Link>
               <Link href={"/Book/RequestBook"}>BookRequest</Link>
                </>
            )}
            <Link href={"/Book/BorrowedBook"}>Borrowed Book</Link>
        <a href="#about">Settings</a>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}
