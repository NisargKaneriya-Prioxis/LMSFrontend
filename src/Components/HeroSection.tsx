import React from "react";
import "./stylesheet/HeroSection.css"
import Loginpage from "@/app/LoginPage/page";
import Link from "next/link";

export default function HeroSection(){
    return (
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Library Website</h1>
            <p className="hero-subtitle">
              We provide the best book to grow your Knowledge.
            </p>
          <Link href={'/HomePage'}>  <button className="hero-button">Get Started</button></Link>
          </div>
        </section>
      );
}