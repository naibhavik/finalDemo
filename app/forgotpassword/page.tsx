"use client";
import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify"; // Corrected import
import "react-toastify/dist/ReactToastify.css";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Context } from "../layout";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("naibhavik68@gmail.com");
//   const [password, setPassword] = useState<string>("Bhavik@123");
//   const [role, setRole] = useState<string>("Employer");
  const router = useRouter();

  const { isAuthorized, setIsAuthorized }: any = useContext(Context);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<{ message: string }>(
        "http://localhost:4000/api/v1/user/forget-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
     
    //   const mylocal = localStorage.setItem("isAuthorized", "true");
    //   setIsAuthorized(true);
    //   console.log("local", mylocal);

      router.push("/login"); // Redirect to home page after successful login
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("this is error");
    }
  };

  // if (isAuthorized) {
  //   router.push("/"); // Redirect to home page if already authorized
  //   return null;
  // }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <Image src="/JobZeelogo.png" alt="logo" width={100} height={100} />
            <h3>Forgot Your Paaword</h3>
          </div>
          <form onSubmit={handleLogin}>
            
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="zk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            
            <button type="submit">Forgotpassword</button>
            <p>
               <Link href="/login"> Login Now</Link>
            </p>
            <p>
              Dont have an account? <Link href="/register">Register Now</Link>
            </p>
          </form>
        </div>
        <div className="banner">
          <Image src="/login.png" alt="login" width={400} height={400} />
        </div>
      </section>
    </>
  );
};

export default Login;
