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
      <div className="cards-container">
        {books.map((item) => (
          <div key={item.bookSid} className="card">
            <h3>Title : {item.title}</h3>
            <p>Author : {item.author || item.language}</p>
            <a

              href={`BookDetail/${item.bookSid}`}
              className="mx-2 px-2 py-2 rounded-lg border border-neutral-600 text-neutral-700 bg-white hover:bg-green-300 transition duration-200"
            >
              Detail Book
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}