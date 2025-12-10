"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";

export function useTokenCheck(): void {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/LoginPage");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (!decoded.exp) {
        console.error("Token does not contain an expiry time");
        localStorage.clear();
        router.push("/LoginPage");
        return;
      }

      const expiry = decoded.exp * 1000; 

      if (Date.now() >= expiry) {
        alert("Your session has expired. Please log in again.");
        localStorage.clear();
        router.push("/LoginPage");
      } else {
        const timeout = expiry - Date.now();
        const timer = setTimeout(() => {
          alert("Your session has expired. Please log in again.");
          localStorage.clear();
          window.location.href = "/LoginPage";
        }, timeout);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      localStorage.clear();
      router.push("/LoginPage");
    }
  }, [router]);
}
