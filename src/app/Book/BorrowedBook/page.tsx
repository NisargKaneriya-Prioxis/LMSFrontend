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
      
            const res = await fetch(
              `http://localhost:5171/getallborrowedbook?${params}`
            );
      
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
            <table className="borrowed-book-table">
                <thead>
                    <tr>
                        <th>Borrowed SID</th>
                        <th>Student Name</th>
                        <th>Book Title</th>
                        <th>Issue Date</th>
                        <th>Due Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
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
                                <td>{item.borrowedSID}</td>
                                <td>{item.name}</td>
                                <td>{item.title}</td>
                                <td>{item.issueDate}</td>
                                <td>{item.dueDate}</td>
                                <td>{item.returnDate || "-"}</td>
                                <td>{item.borrowedBookStatus === 9 ? "Borrowed" : "Returned"}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
          )
}