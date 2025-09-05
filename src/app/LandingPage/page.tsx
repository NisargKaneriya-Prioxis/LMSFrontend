"use client"
import { useRouter } from "next/navigation";
import "./page.css";   

export default function LandingPage() {
  const router = useRouter();

  const handleSelectRole = (role: string) => {
    localStorage.setItem("userRole", role);
    router.push("/HomePage");
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to Library System</h1>
      <div className="button-group">
        <button
          onClick={() => handleSelectRole("Student")}
          className="role-button student-btn"
        >
          Student
        </button>
        <button
          onClick={() => handleSelectRole("Admin")}
          className="role-button admin-btn"
        >
          Admin
        </button>
      </div>
    </div>
  );
}
