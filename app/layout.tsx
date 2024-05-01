"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Layout/Footer";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import "../components/NewJob/assets/scss/style.scss"
import { Plus_Jakarta_Sans } from "next/font/google";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

interface User {
  _id: string;
  name: string;
  email: string;
  phone: number;
  role: string;
  // Add any other properties if needed
}

interface ContextProps {
  isAuthorized: boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
  user: User; // Updated to use the User interface
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

// Define the context with initial values
export const Context = createContext<ContextProps>({
  isAuthorized: false,
  setIsAuthorized: () => {},
  user: { _id: "", name: "", email: "", phone: 0, role: "" }, // Initialize user with empty values
  setUser: () => {},
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    phone: 0,
    role: "",
  }); // Initialize user with empty values
  const router = useRouter();

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthorized");
    if (storedAuth) {
      setIsAuthorized(true);
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <Context.Provider
          value={{ isAuthorized, setIsAuthorized, user, setUser }}
        >
          <ToastContainer />
          <Navbar />
          {children}
          <Footer />
        </Context.Provider>
      </body>
    </html>
  );
}
