"use client"
import { useRouter } from "next/navigation";
import "./page.css";   
import LoginPage from "../LoginPage/page";

export default function LandingPage() {
  const router = useRouter();

  const handleSelectRole = (role: string) => {
    localStorage.setItem("userRole", role);
    router.push("/HomePage");
  };

  return (
    <LoginPage/>
  );
}
