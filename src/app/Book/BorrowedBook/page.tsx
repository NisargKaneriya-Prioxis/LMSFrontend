"use client"
import { useEffect, useState } from "react";
import "./page.css"

interface BorrowedBook{
    borrowedSID:string,
    name: string,
    title: string,
    issueDate: string,
    dueDate: string,
    returnDate: string,
    borrowedBookStatus: number
}

interface ApiResponse {
    meta: {
      page: number;
      page_size: number;
      total_results: number;
      total_page_num: number;
      next_page_exists: boolean;
    };
    result: BorrowedBook[];
  }

export default function BorrowedBook(){
      const [borrowedbooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
      const [loading, setLoading] = useState(true);
      const [currentPage, setCurrentPage] = useState(1);
      const [pageSize] = useState(10);
      const [totalPages, setTotalPages] = useState(1);
      const [search, setSearch] = useState("");
      const [sortColumn, setSortColumn] = useState("title");
      const [sortOrder, setSortOrder] = useState("asc");
      const [role, setRole] = useState<string | null>(null);

      useEffect(() => {
        const storedRole = localStorage.getItem("userRole");
        setRole(storedRole);
      }, []);


       const fetchBorrowedBooks = async () => {
          setLoading(true);
          try {
            const params = new URLSearchParams({
              Page: currentPage.toString(),
              PageSize: pageSize.toString(),
              SearchText: search || "%",
              SortColumn: sortColumn,
              SortOrder: sortOrder,
      
            });
            const api =
            role === "Admin"
              ? `http://localhost:5171/getallborrowedbook?${params}` 
              : `http://localhost:5171/getallborrowedbookStudent?${params}`; 
            const res = await fetch(api);
      
            const data: ApiResponse = await res.json();
            setBorrowedBooks(data.result || []);
            setTotalPages(data.meta?.total_page_num || 1);
          } catch (err) {
            console.error("Error fetching books:", err);
            setBorrowedBooks([]);
          } finally {
            setLoading(false);
          }
        };
      
        useEffect(() => {
            fetchBorrowedBooks();
        }, [currentPage, sortColumn, sortOrder]);
      
        if (loading) return <p className="text-center mt-10">Loading books...</p>;
    
        return (
            <div className="borrowed-book-container">
            <h2>Borrowed Books</h2>
            <div className="search-filter-container">
                <input type="text" placeholder="Search by name or title" value={search} onChange={(e) => setSearch(e.target.value)} className="search-input"/>

                <button onClick={() => {
                        setCurrentPage(1);
                        fetchBorrowedBooks();
                    }}
                    className="search-btn"
                >
                    Search
                </button>

                <select value={sortColumn} onChange={(e) => setSortColumn(e.target.value)} className="filter-select">
                    <option value="title">Book Title</option>
                    <option value="name">Student Name</option>
                    <option value="issueDate">Issue Date</option>
                    <option value="dueDate">Due Date</option>
                </select>

                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="filter-select">
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            <table className="borrowed-book-table">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Book Title</th>
                        <th>Issue Date</th>
                        <th>Due Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                    {role === "Admin" && (
                        <th>Actions</th>
                    )}
                    </tr>
                </thead>
                <tbody>
                    {borrowedbooks.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center">No borrowed books found</td>
                        </tr>
                    ) : (
                        borrowedbooks.map((item) => (
                            <tr key={item.borrowedSID}>
                                <td>{item.name}</td>
                                <td>{item.title}</td>
                                <td>{item.issueDate}</td>
                                <td>{item.dueDate}</td>
                                <td>{item.returnDate || "-"}</td>
                                <td>{item.borrowedBookStatus === 9 ? "Borrowed" : "Returned"}</td>
                                {role === "Admin" && (
                                <td className="action-buttons">
                                {item.borrowedBookStatus === 9 ?  <button className="btn return">
                                    Return
                                </button> : "already Returned"}
                                </td>
                                )}
                               
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
          )
}