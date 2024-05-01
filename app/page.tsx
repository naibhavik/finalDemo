// page.tsx
"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Context } from "./layout";
import NewJob from "@/components/NewJob/NewJob";

export default function App() {
  const { isAuthorized, setIsAuthorized, setUser } = useContext<any>(Context);
  const router = useRouter();
  const fetchUser = async () => {
    try {
      const response = await axios.get<{ user: any }>(
        "http://localhost:4000/api/v1/user/getuser",
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
      console.log("user data", response.data.user);
      setIsAuthorized(true);
    } catch (error) {
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchUser();
    } else {
      router.push("/login");
    }
  }, [isAuthorized, setUser, setIsAuthorized]);

  return (
    <main>
      <NewJob />
    </main>
  );
}
