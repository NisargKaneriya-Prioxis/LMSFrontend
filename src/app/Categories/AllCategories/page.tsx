"use client"

import React, { useEffect, useState } from "react"
import "./page.css"
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Category{
    categorySid: string;
    categoryName: string;
    books: any[];
}

interface ApiResponse {
    meta: {
      page: number;
      page_size: number;
      total_results: number;
      total_page_num: number;
      next_page_exists: boolean;
    };
    result: Category[];
  }
  
export default function AllCategories(){
    const [categories, setCategories] = useState<Category[]>([]);
    const [categorySid, setCategorySid] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [sortColumn, setSortColumn] = useState("title");
    const [sortOrder, setSortOrder] = useState("asc");
    const router = useRouter();

      // const fetchCategory = async () => {
      //   setLoading(true);
      //   try {
      //     const params = new URLSearchParams({
      //       Page: currentPage.toString(),
      //       PageSize: pageSize.toString(),
      //       SearchText: search || "%",
      //       SortColumn: sortColumn,
      //       SortOrder: sortOrder,
    
      //     });
    
      //     const res = await fetch(
      //       `http://localhost:5171/getallcategory?${params}`
      //     );
    
      //     const data: ApiResponse = await res.json();
      //     setCategories(data.result || []);
      //     setTotalPages(data.meta?.total_page_num || 1);
      //   } catch (err) {
      //     console.error("Error fetching books:", err);
      //     setCategories([]);
      //   } finally {
      //     setLoading(false);
      //   }
      // };
      const fetchCategory = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/LoginPage"); // redirect if no token
          return;
        }
      
        try {
          const params = new URLSearchParams({
            Page: currentPage.toString(),
            PageSize: pageSize.toString(),
            SearchText: search || "%",
            SortColumn: sortColumn,
            SortOrder: sortOrder,
          });
      
          const res = await fetch(
            `http://localhost:5171/getallcategory?${params}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
          if (res.status === 401) {
            router.push("/LoginPage"); 
            return;
          }
      
          const data: ApiResponse = await res.json();
          setCategories(data.result || []);
          setTotalPages(data.meta?.total_page_num || 1);
        } catch (err) {
          console.error("Error fetching categories:", err);
          setCategories([]);
        } finally {
          setLoading(false);
        }
      };
      
    
      useEffect(() => {
        fetchCategory();
      }, [currentPage, sortColumn, sortOrder]);
    
      if (loading) return <p className="text-center mt-10">Loading Category...</p>;

    return (
        <>
         <div className="Category-container">
            <h2>All Categories</h2>
            <div className="search-filter-container">
                <input type="text" placeholder="Search by categoryName" value={search} onChange={(e) => setSearch(e.target.value)} className="search-input"/>

                <button onClick={() => {
                        setCurrentPage(1);
                        fetchCategory();
                    }}
                    className="search-btn"
                >
                    Search
                </button>

                <select value={sortColumn} onChange={(e) => setSortColumn(e.target.value)} className="filter-select">
                    <option value="categoryName">categoryName</option>
                </select>

                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="filter-select">
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>

                <Link className="add-btn" href={"/Categories/AddCategory"}>
                     + Add Category
                </Link>
            </div>
            <table className="Category-table">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Category Name</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center">No Category Found</td>
                        </tr>
                    ) : (
                        categories.map((item,index) => (
                            <tr key={item.categorySid}>
                                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                <td>{item.categoryName}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        </>
    )
}