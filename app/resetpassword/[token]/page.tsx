"use client";
import React, { useState, useContext } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; 




interface Props {
  params: {
    token: string;
  };
}

const Reset: React.FC<Props> = (props) => {
  const [password, setPassword] = useState<string>("");
    const [authorized, setIsAuthorized] = useState<boolean>(false);


  const router = useRouter();
  const { token } = props.params;

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post<{ message: string }>(
        `http://localhost:4000/api/v1/user/reset_password/${token}`,
        { password},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message || "reset ok");
      setPassword("");
      router.push("/login"); 

    } catch (error:any) {
      toast.error(error.response?.data?.message || "An error occurred.");
      console.error("Error:", error);
    }
  };

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <Image src="/JobZeelogo.png" alt="logo" width={100} height={100} />
            <h3>Reset Your Password</h3>
          </div>
          <form onSubmit={handleReset}>
            <div className="inputTag">
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <button type="submit">Reset Password</button>
            <p>
              <Link href="/login">Login Now</Link>
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

export default Reset;

