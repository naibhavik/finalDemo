"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "../components/NewJob/assets/scss/style.scss";
import { Plus_Jakarta_Sans } from "next/font/google";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Providers from "./redux/Provider";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: number;
  role: string;
 
}

interface ContextProps {
  isAuthorized: boolean;
  subcription:boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
  user: User; 
  setUser: React.Dispatch<React.SetStateAction<User>>;
}


export const Context = createContext<ContextProps>({
  isAuthorized: false,
  subcription:false,
  setIsAuthorized: () => {},
  user: { _id: "", name: "", email: "", phone: 0, role: "" }, 
  setUser: () => {},
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [subcription, setSubcription]=useState<boolean>(false)
  const [user, setUser] = useState<User>({
    _id: "",
    name: "",
    email: "",
    phone: 0,
    role: "",
  }); 
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
        <Providers>
          <PersistGate loading={null} persistor={persistor}>
            <Context.Provider
              value={{
                isAuthorized,
                setIsAuthorized,
                user,
                setUser,
                subcription
              }}
            >
              <ToastContainer />
              <Navbar />
              {children}
              <Footer />
            </Context.Provider>
          </PersistGate>
        </Providers>
      </body>
    </html>
  );
}
