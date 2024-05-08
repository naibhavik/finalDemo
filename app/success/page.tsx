"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Context } from "../layout";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios"; // Import axios for making HTTP requests

const Success: React.FC = () => {
  const router = useRouter();
  const myuser = useSelector((state: any) => state.user);
  console.log("this is user id",myuser)
  // const { user } = useContext(Context);

  // Function to update subscription status
  const updateSubscriptionStatus = async () => {
    try {
      const { _id } = myuser;
      // Make a request to your backend API to update subscription status
      const response = await axios.put(
        "http://localhost:4000/api/v1/user/updatesubscription",
        { userId: _id }
      );

      console.log("Success: " + JSON.stringify(response));
      console.log("Subscription updated successfully");
      toast.success("Jobseeker Status Successfully");
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  useEffect(() => {
    // Call the function to update subscription status when component mounts
    updateSubscriptionStatus();
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const handlePaymentSuccess = () => {
    router.push("/");
  };

  return (
    <div className="m-0 p-0">
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center">
        <div className="my-10 text-green-600 text-2xl mx-auto flex flex-col justify-center items-center">
          <img src="/success.png" alt="" width={220} height={220} />
          <h3 className="text-4xl pt-20 lg:pt-0 font-bold text-center text-slate-700">
            Payment Successful
          </h3>
          <button
            onClick={handlePaymentSuccess}
            className="w-40 uppercase bg-[#009C96] text-white text-xl my-16 px-2 py-2 rounded"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
