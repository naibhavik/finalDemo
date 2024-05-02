// page.tsx
"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Context } from "./layout";
import NewJob from "@/components/NewJob/NewJob";
import { addUserSuccess } from "./redux/slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
export default function App() {
  const dispatch = useDispatch();
  const myuser = useSelector((state: any) => state.getUser);
  const { isAuthorized, setIsAuthorized, setUser } = useContext<any>(Context);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const fetchUser = async () => {
    try {
      const response = await axios.get<{ user: any }>(
        "http://localhost:4000/api/v1/user/getuser",
        {
          withCredentials: true,
        }
      );
      console.log("Response: " + JSON.stringify(response.data.user));
      dispatch(addUserSuccess(response.data.user));
      setUser(response.data.user);

      // console.log("user data", response.data.user);
      setIsAuthorized(true);
      setLoading(true);
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

  useEffect(() => {
    console.log(myuser);
  }, [loading]);

  return (
    <main>
      <NewJob />
    </main>
  );
}
