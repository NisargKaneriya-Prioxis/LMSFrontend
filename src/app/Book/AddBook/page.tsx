"use client"
import React, { useEffect, useState } from "react"
import "./page.css"

interface Book {
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

  interface Category {
    categorySid: string;
    categoryName: string;
    books: any[];
  }
  
export default function AddBook(){
    const[title,setTitle] = useState("");
    const[author,setAuthor]=useState("");
    const[isbn,setIsbn] = useState("");
    const[edition,setEdition] = useState("");
    const[language,setLanguage] = useState("");
    const[bookPages,setBookpages] = useState("");
    const[quantity,setQuantity] = useState("");
    const[availableQuantity,setAvailableQuantity] = useState("");
    const[publishYear,setPublishYear] = useState("");
    const[publisher,setPublisher] = useState("");
    const[loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [categorySid, setCategorySid] = useState("");
  

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const res = await fetch("http://localhost:5171/getallcategory");
            const data = await res.json();
            setCategories(data.result || []);
          } catch (err) {
            console.error("Error fetching categories:", err);
            setCategories([]);
          }
        };
        fetchCategories();
      }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const bookData = {
            title,
            author,
            isbn,
            edition,
            language,
            bookPages,
            quantity: Number(quantity),
            availableQuantity : Number(availableQuantity),
            publishYear : Number(publishYear),
            publisher
        }

        try {
            const response = await fetch(`http://localhost:5171/InsertBook?CategorySID=${categorySid}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify([bookData]),
            });
      
            if (!response.ok) {
              throw new Error("Failed to add book");
            }
      
            const result = await response.json();
            console.log("Book added successfully:", result);
            alert("Book added successfully!");
          
            setTitle("");
            setAuthor("");
            setIsbn("");
            setBookpages("");
            setEdition("");
            setLanguage("");
            setPublishYear("");
            setQuantity("");
            setAvailableQuantity("");
            setPublisher("")
          } catch (error) {
            console.error("Error adding book:", error);
          } finally {
            setLoading(false);
          }
    
          window.location.href = "/HomePage";
    }

    return (
        <div className="add-book-container">
        <h2>Add New Book</h2>
        <form className="add-book-form" onSubmit={handleSubmit}>
        <label>
          Category:
          <select
            value={categorySid}
            onChange={(e) => setCategorySid(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.categorySid} value={cat.categorySid}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </label>
  
          <label>Title:<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /></label>
  
          <label>Author:<input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required /></label>
  
          <label>ISBN:<input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} /></label>
  
          <label>Edition:<input type="text" value={edition} onChange={(e) => setEdition(e.target.value)} /></label>
  
          <label>Language:<input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} /></label>
  
          <label>Pages:<input type="text" value={bookPages} onChange={(e) => setBookpages(e.target.value)} /></label>
  
          <label>Quantity:<input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></label>
  
          <label>Available Quantity: <input type="number" value={availableQuantity} onChange={(e) => setAvailableQuantity(e.target.value)} /></label>

          <label>Publish Year:<input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} /></label>

          <label>Publisher:<input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} /></label>
  
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    );
}