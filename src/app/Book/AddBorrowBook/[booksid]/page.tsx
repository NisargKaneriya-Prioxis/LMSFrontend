"use client"
import React, { useEffect, useState } from "react"

interface BorrowedBook{
    booksid : string,
    usersid : string,
    issuedate : string,
    duedate : string,
    returndate : string
}

interface book{
    bookSid: string,
    title: string,
    author: string,
    isbn: string,
    edition: string,
    language: string,
    categoryName:string,
    bookPages: string,
    quantity: number,
    availableQuantity: number,
    publishYear: number,
    publisher: string,
}

interface user{
    userSid: string,
    name: string,
    email: string,
    phoneNumber: number,
    address: string, 
}

export default function AddBorrowBook(){
    const [user, setUser] = useState<user[]>([]);
    const [book, setBook] = useState<book[]>([]);
    const [userSid,setUserSid] = useState("");
    const [bookSid,setBookSid] = useState("");
    const [issuedate,setIssuedate] = useState("");
    const [duedate,setDuedate] = useState("");
    const[returndate,setReturndate] = useState("");
    const[loading,setLoading] = useState(true);

    useEffect(() => {
            const fetchBook = async () => {
              try {
                const bookres = await fetch("http://localhost:5171/getallbook");
                const bookdata = await bookres.json();
                setBook(bookdata.result || []);
              } catch (err) {
                console.error("Error fetching Book:", err);
                setBook([]);
              }
            };
            fetchBook();
          }, [])

    useEffect(() => {
            const fetchuser = async () => {
              try {
                const userres = await fetch("http://localhost:5171/getalluser");
                const userdata = await userres.json();
                setUser(userdata.result || []);
              } catch (err) {
                console.error("Error fetching categories:", err);
                setUser([]);
              }
            };
            fetchuser();
          }, [])

          const handleSubmit = async (e: React.FormEvent) => {
                  e.preventDefault();
                  setLoading(true);
          
                  const BorrowedBookdata = {
                    issuedate ,
                    duedate ,
                    returndate 
                  }
          
                  try {
                      const response = await fetch(`http://localhost:5171/Inserborrowedbook?booksid=${bookSid}&usersid=${userSid}`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify([BorrowedBookdata]),
                      });
                
                      if (!response.ok) {
                        throw new Error("Failed to add book");
                      }
                
                      const result = await response.json();
                      console.log("Book added successfully:", result);
                      alert("Book added successfully!");
                    
                    } catch (error) {
                      console.error("Error adding book:", error);
                    } finally {
                      setLoading(false);
                    }
              
                    window.location.href = "/HomePage";
              }
    return (
        <h1>
            Welcom to borow boook 
        </h1>
    )
} 