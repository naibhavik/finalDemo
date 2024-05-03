"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Context } from "@/app/layout";
import ScrollTop from "@/components/NewJob/scrollTop";
import Image from "next/image";
import {
  FiBookmark,
  FiClock,
  FiMapPin,
} from "@/components/NewJob/assets/icons/vander";
import { jobData } from "@/components/NewJob/data";
interface Job {
  _id: string;
  category: string;
  title: string;
  country: string;
  location: string;
  experience: string;
  salaryFrom: string;
  salaryTo: string;
}

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const { isAuthorized, user }: any = useContext(Context);
  const [searchLocation, setSearchLocation] = useState<string>("");
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await axios.get<{ jobs: Job[] }>(
        "http://localhost:4000/api/v1/job/getall",
        {
          withCredentials: true,
        }
      );
      setJobs(res.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      router.push("/job/getall");
      fetchData();
    } else {
      router.push("/login");
    }
  }, [isAuthorized, router]);

  useEffect(() => {
    // Filter jobs based on search query
    const filtered = jobs.filter((job) =>
      job.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [jobs, searchQuery]);

  useEffect(() => {
    // Filter jobs based on search location
    const filtered = jobs.filter((job) =>
      job.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [jobs, searchLocation]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchLocationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchLocation(event.target.value);
  };
  console.log("user data1111", user);

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
                  Job Application Form
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="jobs page">
        <div className="container">
          <h1 className="header">ALL AVAILABLE JOBS</h1>
          {/* Search input fields */}
          <div className="grid grid-cols-2 gap-10">
            <input
              type="text"
              placeholder="Search by category..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="search-input"
            />
            <input
              type="text"
              placeholder="Search by location..."
              value={searchLocation}
              onChange={handleSearchLocationChange}
              className="search-input"
            />
          </div>

          <div className="container mt-60">
            <div className="row g-4">
              {filteredJobs.map((item, index) => {
                return (
                  <div className="col-12" key={index}>
                    <div className="job-post job-post-list rounded shadow p-4 d-md-flex align-items-center justify-content-between position-relative">
                      <div className="d-flex align-items-center w-310px">
                        {/* <Image
                          src={jobData.}
                          width={65}
                          height={65}
                          className="avatar avatar-small rounded shadow p-3 bg-white"
                          alt=""
                        /> */}

                        <div className="ms-3">
                          <Link
                            href={`/job-detail-one/${""}`}
                            className="h5 title text-dark"
                          >
                            {item.category}
                          </Link>
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between d-md-block mt-3 mt-md-0 w-100px">
                        <span className="badge bg-soft-primary rounded-pill">
                          {item.experience}
                        </span>
                        <span className="text-muted d-flex align-items-center fw-medium mt-md-2">
                          <FiClock className="fea icon-sm me-1 align-middle" />
                          {item.location}
                        </span>
                      </div>

                      <div className="d-flex align-items-center justify-content-between d-md-block mt-2 mt-md-0 w-130px">
                        <span className="text-muted d-flex align-items-center">
                          <FiMapPin className="fea icon-sm me-1 align-middle" />
                          {item.country}
                        </span>
                        <span className="d-flex fw-medium mt-md-2">
                          {item.salaryFrom} LPA
                        </span>
                        <label>--</label>
                        <span className="d-flex fw-medium mt-md-2">
                          {item.salaryTo} LPA
                        </span>
                      </div>

                      <div className="mt-3 mt-md-0">
                        <Link
                          href=""
                          className="btn btn-sm btn-icon btn-pills btn-soft-primary bookmark"
                        >
                          <FiBookmark className="icons" />
                        </Link>

                        <Link
                          href={`/job/${item._id}`}
                          className="btn btn-sm btn-primary w-full ms-md-1"
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="row">
              <div className="col-12 mt-4 pt-2">
                <ul className="pagination justify-content-center mb-0">
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">
                        <i className="mdi mdi-chevron-left fs-6"></i>
                      </span>
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" href="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">
                        <i className="mdi mdi-chevron-right fs-6"></i>
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* <div className=" w-6job-post job-post-list rounded shadow p-4 d-md-flex align-items-center justify-content-between position-relative">
            <div className="d-flex align-items-center w-310px ">
              <div className="banner flex items-center">
                
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((element) => (
                    <div className="card " key={element._id}>
                      <p>Category: {element.category}</p>
                      <p>Experience: {element.experience}</p>
                    
                      <p>Country: {element.country}</p>
                      <p>Location: {element.location}</p>
                      <Link href={`/job/${element._id}`} passHref>
                        Job Details
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>No jobs found.</p>
                )}
              </div>
            </div>
          </div> */}
        </div>
      </section>
      <ScrollTop />
    </>
  );
};

export default Jobs;
