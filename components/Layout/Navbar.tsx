"use client";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";
// import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { Context } from "@/app/layout";
import Image from "next/image";
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const { isAuthorized, setIsAuthorized, user, setUser }: any =
    useContext(Context);
  const myuser = useSelector((state: any) => state.user);
  setUser(myuser);
  console.log("this is my user", myuser);
  const router = useRouter();
  // const fetchUser = async () => {
  //   try {
  //     const response = await axios.get<{ user: any }>(
  //       "http://localhost:4000/api/v1/user/getuser",
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     setUser(response.data.user);
  //     console.log("user data", response.data.user);
  //     setIsAuthorized(true);
  //   } catch (error) {
  //     setIsAuthorized(false);
  //   }
  // };
  // useEffect(() => {
  //   if (isAuthorized) {
  //     fetchUser();
  //   } else {
  //     router.push("/login");
  //   }
  // }, [isAuthorized, setUser, setIsAuthorized]);

  const handleLogout = async () => {
    try {
      const response = await axios.get<{ message: string }>(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("isAuthorized", "false");
      toast.success(response.data.message);
      setIsAuthorized(false);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("this is error");
      setIsAuthorized(true);
    }
  };
  if (!isAuthorized) {
    router.push("/login"); // Redirect to home page if already authorized
    return null;
  }

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          {/* You need to use Next.js Image component to import images */}
          <img src="/JobZee-logos__white.png" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link href="/" onClick={() => setShow(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/chat" onClick={() => setShow(false)}>
              ChatApp
            </Link>
          </li>
          <li>
            <Link href="/job/getall" onClick={() => setShow(false)}>
              All Jobs
            </Link>
          </li>

          <li>
            <Link href="/application/me" onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "Applicant's Applications"
                : "My Application"}
            </Link>
          </li>
          {user && user.role === "Job Seeker" && (
            <li>
              <Link href="/membership" onClick={() => setShow(false)}>
                Membership
              </Link>
            </li>
          )}

          {user && user.role === "Employer" && (
            <>
              <li>
                <Link href="/job/post" onClick={() => setShow(false)}>
                  Post New Job
                </Link>
              </li>
              <li>
                <Link href="/job/me" onClick={() => setShow(false)}>
                  View Your Jobs
                </Link>
              </li>
            </>
          )}
          <li>
            <button onClick={handleLogout}>LOGOUT</button>
          </li>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
