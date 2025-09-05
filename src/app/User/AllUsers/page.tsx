"use client"
import { useEffect, useState } from "react";
import "./page.css"

interface User{
    userSid: string,
    name: string,
    email: string,
    phoneNumber: number,
    address: string,
}

interface ApiResponse {
    meta: {
      page: number;
      page_size: number;
      total_results: number;
      total_page_num: number;
      next_page_exists: boolean;
    };
    result: User[];
}

export default function AllUsers(){
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [sortColumn, setSortColumn] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                Page: currentPage.toString(),
                PageSize: pageSize.toString(),
                SearchText: search || "%",
                SortColumn: sortColumn,
                SortOrder: sortOrder,
            });

            const res = await fetch(`http://localhost:5171/getalluser?${params}`);
            const data: ApiResponse = await res.json();
            setUsers(data.result || []);
            setTotalPages(data.meta?.total_page_num || 1);
        } catch (err) {
            console.error("Error fetching users:", err);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage, sortColumn, sortOrder]);

    const handleDelete = (userSid: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        fetch(`http://localhost:5171/deleteuser/${userSid}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) throw new Error("Failed to delete user");
                alert("User deleted successfully!");
                fetchUsers(); 
            })
            .catch(err => {
                console.error(err);
                alert("Error deleting user");
            });
    };

    if (loading) return <p className="text-center mt-10">Loading users...</p>;

    return (
        <div className="users-page">
            <h2>All Users</h2>
            <p>Manage all users</p>
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center">No users found</td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.userSid}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.address}</td>
                                <td className="action-buttons">
                                    <button className="btn update" onClick={() => window.location.href=`/UpdateUser/${user.userSid}`}>
                                        Update
                                    </button>
                                    <button className="btn delete" onClick={() => handleDelete(user.userSid)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
