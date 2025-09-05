"use client";
import BookList from "@/Components/Booklist";
import Footer from "@/Components/Footer";
import HeaderSection from "@/Components/HeaderSection";
import HeroSection from "@/Components/HeroSection";
import React from "react";
export default function HomePage(){
    return (
       <>
       <HeaderSection/>
       <HeroSection/>
       <BookList/>
       <Footer/>
       </>
    )
}