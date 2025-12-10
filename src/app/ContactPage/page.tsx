"use client"
import React, { FormEvent, useEffect, useState } from 'react';
export default function ContactUs() {
 return (
        <>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-8 max-w-lg w-full text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-white-700 mb-8">We would love to hear from you!</p>
            <form className="w-full max-w-md space-y-6 ">
                <input
                    name='name'
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    name='email'
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name='message'
                    placeholder="Your Message"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                ></textarea>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                    Send Message
                    
                </button>
            </form>
            </div>
        </div>
    </>
    )

}

