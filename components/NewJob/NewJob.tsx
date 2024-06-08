"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import Companies from "./companies";
import AboutUs from "./aboutUs";
import Counter from "./counter";

import {
  FiSearch,
  FiClock,
  FiMapPin,
  FiDollarSign,
} from "./assets/icons/vander";
import { jobData, categoriesTwoData } from "./data";
import ScrollTop from "./scrollTop";
import { Context } from "@/app/layout";
// import Blog from "./blog";

interface JobItem {
  id: number;
  title: string;
  posted: number;
  jobTime: string;
  salary: number;
  image: string;
  name: string;
  country: string;
}
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

const NewJob: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { isAuthorized, user }: any = useContext(Context);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
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
      router.push("/");
      fetchData();
    } else {
      router.push("/login");
    }
  }, [isAuthorized, router]);
  useEffect(() => {
  
    const filtered = jobs.filter((job) =>
      job.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [jobs, searchQuery]);
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <section
        className="bg-half-260 pb-lg-0 pb-md-4 bg-primary d-table w-100"
        style={{ backgroundImage: "url('/images/hero/bg3.jpg')" }}
        id="home"
      >
        <div className="bg-overlay bg-black" style={{ opacity: "0.8" }}></div>
        <div className="container">
          <div className="row g-4 position-relative z-1">
            <div className="col-lg-7 col-md-6 col-12 mt-lg-5">
              <div className="title-heading">
                <h1 className="heading text-white title-dark mb-4">
                  Find a new job and <br /> build career
                </h1>
                <p className="para-desc text-white-50">
                  Find Jobs, Employment & Career Opportunities. Some of the
                  companies weve helped recruit excellent applicants over the
                  years.
                </p>

                {/* <div className="d-md-flex justify-content-between align-items-center bg-white shadow rounded p-2 mt-4">
                  <form className="card-body text-start">
                    <div className="registration-form text-dark text-start">
                      <div className="row g-lg-0">
                        <div className="col-lg-9 col-md-8 col-12">
                          <div className="mb-3 mb-sm-0">
                            <label className="form-label d-none fs-6">
                              Search :
                            </label>
                            <div className="filter-search-form position-relative filter-border">
                              <FiSearch className="fea icon-20 icons" />
                              <input
                                name="name"
                                type="text"
                                placeholder="Search by category..."
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                className="form-control filter-input-box ml-6 bg-light border-0"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-3 col-md-4 col-12">
                          <input
                            type="submit"
                            id="search"
                            name="search"
                            style={{ height: "60px" }}
                            className="btn btn-primary searchbtn w-100"
                            value="Search"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div> */}
                <div className="mt-2">
                  <span className="text-white-50">
                    <span className="text-white">Popular Searches :</span>{" "}
                    Mern Stack Developer,Designer, Developer, Web, IOS, PHP Senior Engineer
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-5 col-md-6 col-12">
              <div className="bg-white rounded shadow p-2 position-relative">
                <Image
                  src="/images/hero.jpg"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  className="img-fluid rounded"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-relative">
        <div className="shape overflow-hidden text-white">
          <svg
            viewBox="0 0 2880 250"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M720 125L2160 0H2880V250H0V125H720Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <br/>
      <Counter />
      <section className="section">
        <div className="container">
          <div className="row justify-content-center mb-4 pb-2">
            <div className="col-12">
              <div className="section-title text-center">
                <h4 className="title mb-3">Browse by Categories</h4>
                <p className="text-muted para-desc mx-auto mb-0">
                  Search all the open positions on the web. Get your own
                  personalized salary estimate. Read reviews on over 30000+
                  companies worldwide.
                </p>
              </div>
            </div>
          </div>
          <div className="d-md-flex justify-content-between align-items-center bg-white shadow rounded p-2 mt-4">
            <form className="card-body text-start">
              <div className="registration-form text-dark text-start">
                <div className="row g-lg-0">
                  <div className="col-lg-9 col-md-8 col-12">
                    <div className="mb-3 mb-sm-0">
                      <label className="form-label d-none fs-6">Search :</label>
                      <div className="filter-search-form position-relative filter-border">
                        <FiSearch className="fea icon-20 icons" />
                        <input
                          name="name"
                          type="text"
                          placeholder="Search by category..."
                          value={searchQuery}
                          onChange={handleSearchInputChange}
                          className="form-control filter-input-box ml-6 bg-light border-0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-4 col-12">
                    <input
                      type="submit"
                      // id="search"
                      name="search"
                      style={{ height: "60px" }}
                      className="btn btn-primary w-100"
                      // value="Search"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4 mt-0">
            {filteredJobs.slice(0, 6).map((item, index) => {
              return (
                <div className="col" key={index}>
                  <div className="job-category job-category-two rounded shadow bg-light p-3">
                    <h5 className="mb-1">{item.category}</h5>
                    <p className="text-muted para mb-2">{item.experience}</p>
                    <p className="text-muted para mb-2">{item.country}</p>
                    <p className="text-muted para mb-2">
                      {item.salaryFrom} to {item.salaryTo}
                    </p>
                    <Link href="" className="text-primary fw-medium link">
                      Explore Jobs <i className="mdi mdi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <div className="text-center">
                <Link
                  href="/job/getall"
                  className="btn btn-link primary text-muted"
                >
                  See More Categories <i className="mdi mdi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <Counter /> */}

        <div className="container mt-100 mt-60">
          <div className="row justify-content-center mb-4 pb-2">
            <div className="col-12">
              <div className="section-title text-center">
                <h4 className="title mb-3">Popular Job Listing</h4>
                <p className="text-muted para-desc mx-auto mb-0">
                  Search all the open positions on the web. Get your own
                  personalized salary estimate. Read reviews on over 30000+
                  companies worldwide.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-0">
            {jobData.slice(0, 6).map((item: any, index: number) => {
              return (
                <div className="col-lg-4 col-md-6 col-12" key={index}>
                  <div className="job-post rounded shadow bg-white">
                    <div className="p-4">
                      <Link
                        href={`/job-detail-two/${item.id}`}
                        className="text-dark title h5"
                      >
                        {item.title}
                      </Link>

                      <p className="text-muted d-flex align-items-center small mt-3">
                        <FiClock className="fea icon-sm text-primary me-1" />
                        Posted {item.posted} Days ago
                      </p>

                      <ul className="list-unstyled d-flex justify-content-between align-items-center mb-0 mt-3">
                        <li className="list-inline-item">
                          <span className="badge bg-soft-primary">
                            {item.jobTime}
                          </span>
                        </li>
                        <li className="list-inline-item">
                          <span className="text-muted d-flex align-items-center small">
                            <FiDollarSign className="fea icon-sm text-primary me-1" />
                            {item.salary}/mo
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="d-flex align-items-center p-4 border-top">
                      <Image
                        src={item.image}
                        width={65}
                        height={65}
                        className="avatar avatar-small rounded shadow p-3 bg-white"
                        alt=""
                      />

                      <div className="ms-3">
                        <Link
                          href="/employer-profile"
                          className="h5 company text-dark"
                        >
                          {item.name}
                        </Link>
                        <span className="text-muted d-flex align-items-center mt-1">
                          <FiMapPin className="fea icon-sm me-1" />
                          {item.country}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <AboutUs containerClass="container mt-100 mt-60" />

        <div className="container mt-100 mt-60">
          <Companies />
        </div>

        {/* <div className="container mt-100 mt-60">
          <div className="row justify-content-center">
            <div className="col">
              <div className="section-title text-center mb-4 pb-2">
                <h4 className="title mb-3">Latest Blog or News</h4>
                <p className="text-muted para-desc mb-0 mx-auto">
                  Search all the open positions on the web. Get your own
                  personalized salary estimate. Read reviews on over 30000+
                  companies worldwide.
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </section>
      <ScrollTop />
    </>
  );
};

export default NewJob;
