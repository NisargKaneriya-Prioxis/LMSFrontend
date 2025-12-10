"use client"
import { useEffect, useState } from "react";
import "./page.css"
import { useRouter } from "next/navigation";

interface RequestBook{
    requestBookSid:string,
    name: string,
    title: string,
    requestDate: string,
    requestBookStatus: number
}

interface ApiResponse {
    meta: {
      page: number;
      page_size: number;
      total_results: number;
      total_page_num: number;
      next_page_exists: boolean;
    };
    result: RequestBook[];
  }

export default function RequestBook(){
      const [requestBooks, setrequestBooks] = useState<RequestBook[]>([]);
         const [loading, setLoading] = useState(true);
         const [currentPage, setCurrentPage] = useState(1);
         const [pageSize] = useState(10);
         const [totalPages, setTotalPages] = useState(1);
         const [search, setSearch] = useState("");
         const [sortColumn, setSortColumn] = useState("title");
         const [sortOrder, setSortOrder] = useState("asc");
         const [role, setRole] = useState<string | null>(null);
         const router = useRouter();
   
     useEffect(() => {
       const storedRole = localStorage.getItem("userRole");
       setRole(storedRole);
     }, []);
   
     useEffect(() => {
       const userStr = localStorage.getItem("user");
       if (!userStr) {
         router.push("/LoginPage"); 
         return;
       }
       const user = JSON.parse(userStr);
       setRole(user.role);
     }, [router]);
   
          const fetchRequestedBooks = async () => {
             setLoading(true);
             const token = localStorage.getItem("token");
             if (!token) {
               router.push("/LoginPage");
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
               const res = await fetch(`http://localhost:5171/getallrequestbooks?${params}`,{
                   headers: {
                       Authorization: `Bearer ${token}`,
                   },
               });
         
               const data: ApiResponse = await res.json();
               setrequestBooks(data.result || []);
               setTotalPages(data.meta?.total_page_num || 1);
             } catch (err) {
               console.error("Error fetching Request books:", err);
               setrequestBooks([]);
             } finally {
               setLoading(false);
             }
           };
         
           useEffect(() => {
            fetchRequestedBooks();
           }, [router,currentPage, sortColumn, sortOrder]);
         
           if (loading) return <p className="text-center mt-10">Loading books...</p>;
       
           return (
               <div className="Request-book-container">
               <h2>Book Request</h2>
               <div className="search-filter-container">
                   <input type="text" placeholder="Search by title or name" value={search} onChange={(e) => setSearch(e.target.value)} className="search-input"/>
   
                   <button onClick={() => {
                           setCurrentPage(1);
                           fetchRequestedBooks();
                       }}
                       className="search-btn">
                       Search
                   </button>
   
                   <select value={sortColumn} onChange={(e) => setSortColumn(e.target.value)} className="filter-select">
                       <option value="title">Book Title</option>
                       {role && role !== "Student" && ( 
                           <option value="name">Student Name</option>
                        )}
                       <option value="requestdate">Request Date</option>
                   </select>
   
                   <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="filter-select">
                       <option value="asc">Ascending</option>
                       <option value="desc">Descending</option>
                   </select>
               </div>
               <table className="Request-book-table">
                   <thead>
                       <tr>
                           <th>Student Name</th>
                           <th>Book Title</th>
                           <th>Request Date</th>
                           <th>Actions</th>
                       </tr>
                   </thead>
                   <tbody>
                       {requestBooks.length === 0 ? (
                           <tr>
                               <td colSpan={7} className="text-center">No book Request found</td>
                           </tr>
                       ) : (
                        requestBooks.map((item) => (
                               <tr key={item.requestBookSid}>
                                    <td>{item.name}</td>
                                   <td>{item.title}</td>
                                   <td>{item.requestDate}</td>
                                   {role && role !== "Student" && (
                                   <td className="action-buttons">
                                   {item.requestBookStatus === 12 ?  <button className="btn return">
                                       Accept
                                   </button> : "already Accepted"}
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