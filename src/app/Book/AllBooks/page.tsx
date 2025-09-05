"use client"
import { useEffect, useState } from "react";
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

interface ApiResponse {
  meta: {
    page: number;
    page_size: number;
    total_results: number;
    total_page_num: number;
    next_page_exists: boolean;
  };
  result: Book[];
}


export default function AllBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchBooks = async () => {
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
        `http://localhost:5171/getallbook?${params}`
      );

      const data: ApiResponse = await res.json();
      setBooks(data.result || []);
      setTotalPages(data.meta?.total_page_num || 1);
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [currentPage, sortColumn, sortOrder]);

  if (loading) return <p className="text-center mt-10">Loading books...</p>;

  return (
    <div>
      <div>
        <h2>All Books</h2>
        <p>Read the best book</p>
      </div>
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="Search by title, author, ISBN"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <button
          onClick={() => {
            setCurrentPage(1);
            fetchBooks();
          }}
          className="search-btn"
        >
          Search
        </button>

        <select
          value={sortColumn}
          onChange={(e) => setSortColumn(e.target.value)}
          className="filter-select"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="isbn">ISBN</option>
          <option value="publishedYear">Published Year</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="filter-select"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {books.length === 0 && !loading ? (
    <p className="text-center text-white text-lg">No books found.</p>
  ) 
     :(
      <div className="cards-container">
        {books.map((item) => (
          <div key={item.bookSid} className="card">
            <h3>Title : {item.title}</h3>
            <p>Author : {item.author || item.language}</p>
            <a

              href={`BookDetail/${item.bookSid}`}
            >
              Detail Book
            </a>
          </div>
        ))}
      </div>
     )}
      
    </div>
  )
}
