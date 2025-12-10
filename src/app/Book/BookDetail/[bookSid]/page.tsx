"use client"
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import "./page.css"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

interface Book {
    bookSid: string,
    title: string,
    author: string,
    isbn: string,
    edition: string,
    language: string,
    bookPages: string,
    quantity: number,
    categoryName: string,
    availableQuantity: number,
    publishYear: number,
    publisher: string,
}

interface DecodedToken {
    userId: number;
    role: string;
    email: string;
    exp: number; 
    iat: number; 
  }

function requestforbook(sid: String){
    const confirmDelete = window.confirm(
        "Are you sure you want to request for book this book?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
if (token) {
  const decoded = jwtDecode<DecodedToken>(token);
  console.log(decoded.userId);  
  console.log(decoded.role);   
}
}

function handledelete(sid: string) {
    const confirmDelete = window.confirm(
        "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    fetch(`http://localhost:5171/deletebook/${sid}`, {
        method: "DELETE",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            alert("Book deleted successfully!");
            window.location.href = "/HomePage";
        })
        .catch((error) => {
            console.error("Error deleting book:", error);
            alert("Failed to delete book.");
        });
}

export default function BookDetail() {
    const { bookSid } = useParams();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setRole(parsed.role);
        }
    }, []);

    useEffect(() => {
        const fetchBooks = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                router.push("/LoginPage");
                return;
            }
            try {
                const response = await fetch(`http://localhost:5171/dynamic/${bookSid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (data) {
                    setBooks([data]);
                } else {
                    setBooks([]);
                }
            } catch (error) {
                console.error("Error fetching book details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [router, bookSid]);
    if (loading) {
        return <p className="text-center mt-10">Loading book details...</p>;
    }
    if (books.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen text-white text-xl">
                Book not found!
            </div>
        );
    }

    return (
        <div>
            <div>
                <h2>Book</h2>
            </div>
            <div className="cards-container">
                <h3>Title : {books[0].title}</h3>
                <p>Author : {books[0].author}</p>
                <p>ISBN : {books[0].isbn}</p>
                <p>Edition : {books[0].edition}</p>
                <p>Language : {books[0].language}</p>
                <p>BookPages : {books[0].bookPages}</p>
                <p>Quantity : {books[0].quantity}</p>
                <p>CategoryName : {books[0].categoryName}</p>
                <p>AvailableQuantity : {books[0].availableQuantity}</p>
                <p>PublishYear : {books[0].publishYear}</p>
                <p>Publisher : {books[0].publisher}</p>
                {
                    role && role !== "Admin" && (
                        <div className="actions-request">
                            <a onClick={() => requestforbook(books[0].bookSid)} className="delete-btn">
                            Request Book
                        </a>
                        </div>
                    )
                }
                {role && role !== "Student" && (
                    <div className="actions">
                        <a
                            href={`/Book/UpdateBook/${books[0].bookSid}`}
                        >
                            Update Book
                        </a>
                        <a onClick={() => handledelete(books[0].bookSid)} className="delete-btn">
                            Delete Book
                        </a>
                        {books[0].availableQuantity == 0 ? "All Book Borrow " : <a href={`/Book/AddBorrowBook/${books[0].bookSid}`}>Borrow</a>}
                    </div>
                )}

            </div>
        </div>
    )

}