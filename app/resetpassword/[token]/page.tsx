"use client";
import React, { useState, useContext } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // corrected import
// import { Context } from "@/app/layout";



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
      router.push("/login"); // Redirect to login page after successful password reset
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

// "use client";
// import React, { useContext, useState } from "react";
// import { FaRegUser } from "react-icons/fa";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { RiLock2Fill } from "react-icons/ri";
// import axios from "axios";
// import { toast } from "react-toastify"; // Corrected import
// import "react-toastify/dist/ReactToastify.css";

// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// // import { Context } from "../layout";

// interface Props {
//   params: {
//     token: string;
//   };
// }

// const Reset: React.FC<Props> = (props) => {
//   //   const [email, setEmail] = useState<string>("naibhavik68@gmail.com");
//   const [password, setPassword] = useState<string>(" ");
//   //   const [password, setPassword] = useState<string>("Bhavik@123");
//   //   const [role, setRole] = useState<string>("Employer");
//   const router = useRouter();
//   const { token } = props.params;

//   //   const { isAuthorized, setIsAuthorized }: any = useContext(Context);

//   const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post<{ message: string }>(
//         `http://localhost:4000/api/v1/user/reset_password/${token}`,
//         { password },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       toast.success(data.message);
//       setPassword("");
//       router.push("/login"); // Redirect to home page after successful login
//     } catch (error: any) {
//       toast.error(error.response.data.message);
//       console.log("this is error");
//     }
//   };

//   // if (isAuthorized) {
//   //   router.push("/"); // Redirect to home page if already authorized
//   //   return null;
//   // }

//   return (
//     <>
//       <section className="authPage">
//         <div className="container">
//           <div className="header">
//             <Image src="/JobZeelogo.png" alt="logo" width={100} height={100} />
//             <h3>Reset Your Password</h3>
//           </div>
//           <form onSubmit={handleReset}>
//             <div className="inputTag">
//               {/* <label>Emai Address</label> */}
//               <div>
//                 <input
//                   type="password"
//                   placeholder="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <MdOutlineMailOutline />
//               </div>
//             </div>

//             <button type="submit">Resetpassword</button>
//             <p>
//               <Link href="/login"> Login Now</Link>
//             </p>
//             <p>
//               Dont have an account? <Link href="/register">Register Now</Link>
//             </p>
//           </form>
//         </div>
//         <div className="banner">
//           <Image src="/login.png" alt="login" width={400} height={400} />
//         </div>
//       </section>
//     </>
//   );
// };

// export default Reset;

// "use client"
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify"; // Corrected import
// import "react-toastify/dist/ReactToastify.css";

// interface Props {
//   params: {
//     token: string;
//   };
// }

// const ResetPassword: React.FC<Props> = (props) => {
//   const [password, setPassword] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const { token } = props.params;
//   const router = useRouter();

//   const handleResetPassword = async () => {
//     try {
//       const response = await axios.post<{ msg: string }>(
//         `http://localhost:4000/api/v1/user/reset_password/${token}`,
//         { password }
//       );
// 	   setMessage(response.data.msg);

//       router.push("/login");

//     } catch (error: any) {
//       setMessage(error.response.data.msg);
//     }
//   };
//   useEffect(() => {
//     if (!token) {
//       // Redirect to some error page or handle accordingly
//       router.push("/error");
//     }
//   }, [token, router]);

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <input
//         type="password"
//         placeholder="Enter new password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleResetPassword}>Reset Password</button>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default ResetPassword;
