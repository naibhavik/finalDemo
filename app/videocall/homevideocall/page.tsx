"use client"
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useState } from "react";

const HomePage = () => {
  const [value, setValue] = useState<string>("");
  const router = useRouter();

  const handleJoinRoom = useCallback(() => {
    router.push(`/videocall/mainpagevideocall/${value}`);
  }, [router, value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <section
        className="bg-half-170 d-table w-100"
        style={{
          backgroundImage: "url('/images/hero/bg2.jpg')",
          backgroundPosition: "top",
        }}
      >
        <div className="bg-overlay bg-gradient-overlay"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  Job Application Form
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="text-center py-4">
        <h1 className="text-4xl font-bold mt-5 mb-3 text-gray-800">
          Create your videocall room ID
        </h1>
      </div>
	  <br></br>
      <div className=" mb-5 text-center gap-8">
        <input
          className="mr-4 px-4 py-2 border border-gray-300 rounded-md"
          value={value}
          onChange={handleChange}
          type="text"
          placeholder="Enter Room Code"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={handleJoinRoom}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default HomePage;
