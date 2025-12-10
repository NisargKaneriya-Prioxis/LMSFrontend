"use client"
import React, { useState } from "react"
import "./page.css"


interface Category{
    categorySid: string;
    categoryName: string;
    books: any[];
}

export default function AddCategory(){
    const [categoryName,setCategoryName] = useState("");
    const[loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const CategoryData = {
           categoryName,
        }

        try{
            const response = await fetch("http://localhost:5171/addcategory",
                {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify([CategoryData]),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to Category");
              }
            
              const result = await response.json();
              console.log("Category successfully:", result);
              alert("Category successfully!");
            
            setCategoryName("")
            } catch (error) {
              console.error("Error adding Category:", error);
            } finally {
              setLoading(false);
            }
      
            window.location.href = "/Categories/AllCategories";
    }
    return (
        <div className="add-book-container">
        <h2>Add New Category</h2>
        <form className="add-book-form" onSubmit={handleSubmit}>
       
          <label>Category Name:<input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required /></label>
  
          <button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Book"}
          </button>
        </form>
      </div>
    )
}