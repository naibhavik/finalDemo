"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Context } from "@/app/layout";
import { Typography, Button } from "@mui/material";

interface Job {
  _id: string;
  title: string;
  category: string;
  country: string;
  city: string;
  location: string;
  experience: string;
  description: string;
  jobPostedOn: string;
  fixedSalary?: number;
  salaryFrom?: number;
  salaryTo?: number;
}

interface Props {
  params: {
    id: string;
  };
}

const JobDetails: React.FC<Props> = (props) => {
  const router = useRouter();
  const { id } = props.params;
  const [job, setJob] = useState<any>({});
  const { isAuthorized, user }: any = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<{ job: Job }>(
          `http://localhost:4000/api/v1/job/${id}`,
          {
            withCredentials: true,
          }
        );
        setJob(res.data.job);
      } catch (error) {
        router.push("/notfound");
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/login");
    }
  }, [isAuthorized]);

  return (
    <>
      <section
        className="bg-half-170 d-table w-100"
        style={{
          backgroundImage: "url('/images/hero/bg.jpg')",
          backgroundPosition: "top",
        }}
      >
        <div className="bg-overlay bg-gradient-overlay"></div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <div className="col-12">
              <div className="title-heading text-center">
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  Job Apply
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="page"
        style={{ backgroundImage: "url('/application.png')" }}
      >
        <div>
          <div
            style={{
              marginTop: "80px",
              paddingLeft: "200px",
            }}
          >
            <Typography
              className=" w-30"
              style={{
                position: "sticky",
                fontSize: "30px",
                color: "black",
                borderRadius: "8px",
                fontWeight: "bold",
                display: "inline-block",
              }}
            >
              Job Details
            </Typography>
          </div>

          <div className="job-details-container relative mt-5 mb-10 gap-8 w-30 fixed">
            <div className=" h-[400px] w-[500px] rounded shadow p-4 ml-8 ">
              <Typography>
                <span className="font-bold text-lg">Title:</span>{" "}
                <span>{job.title}</span>
              </Typography>
              <Typography>
                <span className="font-bold text-lg">Category:</span>{" "}
                <span>{job.category}</span>
              </Typography>
              <Typography>
                <span className="font-bold text-lg">Country:</span>{" "}
                <span>{job.country}</span>
              </Typography>
              <Typography>
                <span className="font-bold text-lg">City:</span> <span>{job.city}</span>
              </Typography>
              <Typography>
                <span className="font-bold text-lg">Experience:</span>{" "}
                <span>{job.experience}</span>
              </Typography>
              <Typography>
                <span className="font-bold text-lg">Location:</span>{" "}
                <span>{job.location}</span>
              </Typography>
              <Typography>
                <span className="font-bold text-lg">Description:</span>{" "}
                <span>{job.description}</span>
              </Typography>
              <Typography>
                <span className="font-bold text-lg">Job Posted On:</span>{" "}
                <span>{job.jobPostedOn}</span>
              </Typography>
              <Typography>
                <span className="font-bold text-lg">Salary:</span>{" "}
                {job.fixedSalary ? (
                  <span>{job.fixedSalary}</span>
                ) : (
                  <span>
                    {job.salaryFrom} - {job.salaryTo}
                  </span>
                )}
              </Typography>
              {user && user.role === "Employer" ? (
                <></>
              ) : (
                <Link
                  href={`/application/${job._id}`}
                  className="btn btn-sm btn-primary max-w-fit ms-md-1"
                >
                  Apply Now
                </Link>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
        .page {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding: 50px; /* Adjust as needed */
          width: 100%;
          height: 95vh; /* Make sure the container spans the entire viewport height */
        }
        .job-details-container {
          
          background-size:100%
          display: flex;
          justify-content: center;
          border-radius: 15px;
          border: "5px solid black";
          
          
        }

        .job-details-content {
          border: 1px solid #ccc;
          padding: 20px;
          max-width: 600px;
        }

        .bold {
           fontSize:80px
          font-weight: bold;
        }
      `}</style>
      </div>
    </>
  );
};

export default JobDetails;
