"use client"
import { useEffect, useState } from "react";
import "./stylesheet/Booklist.css"
import Link from "next/link";

interface Book {
    bookSid: string,
    title: string,
    author: string,
    isbn: string,
    edition: string,
    language: string,
    bookPages: string,
    quantity: number,
    availableQuantity: number,
    publishYear: number,
    publisher: string,
}

export default function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState<string>("Admin");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch("http://localhost:5171/getallbook");
                const data = await res.json();

                console.log("Api response:", data);

                if (data?.result && Array.isArray(data.result)) {
                    setBooks(data.result);
                } else {
                    setBooks([]);
                }
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Loading books...</p>;
    }

    const displayedBooks = books.slice(0, 6);

    return (
        <div>
            <div>
                <h2>All Books</h2>
                <p>Read the best book</p>
            </div>
            <div className="cards-container">
                {displayedBooks.map((item) => (
                    <div key={item.bookSid} className="card">
                        <h3>Title : {item.title}</h3>
                        <p>Author : {item.author || item.language}</p>
                    </div>
                ))}
            </div>
            <div className="btn-container">
                <Link href={"/Book/AllBooks"} className="btn primary">
                    View All Books
                </Link>
                {userRole !== "Student" && (
                    <Link href={"/AddNewBook"} className="btn secondary">
                        + Add New Book
                    </Link>
                )}
            </div>

        </div>
    )
}
