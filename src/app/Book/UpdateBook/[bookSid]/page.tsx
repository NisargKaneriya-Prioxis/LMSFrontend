"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import "./page.css"

export default function UpdateBook() {
  const router = useRouter();
  const { bookSid } = useParams();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({
    title: "",
    author: "",
    isbn: "",
    edition: "",
    language: "",
    bookPages: "",
    quantity: "",
    availableQuantity: "",
    publishYear: "",
    publisher: "",
  });


  useEffect(() => {
    if (bookSid) {
      fetch(`http://localhost:5171/dynamic/${bookSid}`)
        .then((res) => res.json())
        .then((data) => {
          setBook({
            title: data.title,
            author: data.author,
            isbn: data.isbn,
            edition: data.edition,
            language: data.language,
            bookPages: data.bookPages,
            quantity: data.quantity,
            availableQuantity: data.availableQuantity,
            publishYear: data.publishYear,
            publisher: data.publisher
          });
        });
    }
  },[bookSid]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5171/updateBook/${bookSid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...book,
          quantity: Number(book.quantity),
          availableQuantity: Number(book.availableQuantity),
          publishYear: Number(book.publishYear),
        }),
      });

      if (!response.ok) throw new Error("Failed to update book");

      alert("Book updated successfully!");
    } catch (err) {
      console.error("Error updating book:", err);
      alert("Error updating book");
    } finally {
      setLoading(false);
    }
    window.location.href = "/HomePage";
  };

  return(
    <div className="update-book-container">
    <h2>Update Book</h2>
    <form onSubmit={handleSubmit} className="update-book-form">
      <label>Title:<input type="text" name="title" value={book.title} onChange={handleChange} required/></label>

      <label>Author:<input type="text" name="author" value={book.author} onChange={handleChange} required/></label>

      <label>ISBN:<input type="text" name="isbn" value={book.isbn} onChange={handleChange}/></label>

      <label>Edition:<input type="text" name="edition" value={book.edition} onChange={handleChange}/></label>

      <label>Language:<input type="text" name="language" value={book.language} onChange={handleChange}/></label>

      <label>Pages:<input type="text" name="bookPages" value={book.bookPages} onChange={handleChange}/></label>

      <label>Quantity:<input type="number" name="quantity" value={book.quantity} onChange={handleChange}/></label>

      <label>Available Quantity:<input type="number" name="availableQuantity" value={book.availableQuantity} onChange={handleChange}/></label>

      <label>Publish Year:<input type="number" name="publishYear" value={book.publishYear} onChange={handleChange}/></label>

      <label>Publisher:<input type="text" name="publisher" value={book.publisher} onChange={handleChange}/></label>

      <button type="submit">
        Update Book
      </button>
    </form>
  </div>
  )
}
