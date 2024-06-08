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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const router = useRouter();

  const { isAuthorized, setIsAuthorized }: any = useContext(Context);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<{ message: string }>(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      const mylocal = localStorage.setItem("isAuthorized", "true");
      setIsAuthorized(true);
      console.log("local", mylocal);

      router.push("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("this is error");
    }
  };

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <Image src="/JobZeelogo.png" alt="logo" width={100} height={100} />
            <h3>Login to your account</h3>
          </div>
          <form onSubmit={handleLogin}>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit">Login</button>
            <div>

            <p>
              forgotpassword{" "}
              <Link href="/forgotpassword"> Forgotpassword Now</Link>
            </p>
            <p>
              Dont have an account? <Link href="/register">Register Now</Link>
            </p>
            </div>
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
