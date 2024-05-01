"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Context } from "@/app/layout";

interface Job {
  _id: string;
  category: string;
  title: string;
  country: string;
  location: string;
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
      fetchData()
    }
      else{
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
    <section className="jobs page">
      <div className="container">
        <h1 className="header">ALL AVAILABLE JOBS</h1>
        {/* Search input fields */}
        <div className="grid grid-cols-2 gap-4">
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

        <div className="banner flex items-center">
          {/* Display filtered jobs */}
          {filteredJobs.length > 0 ? (
            filteredJobs.map((element) => (
              <div className="card " key={element._id}>
                <p>{element.category}</p>
                <p>{element.title}</p>
                <p>{element.country}</p>
                <p>{element.location}</p>
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
    </section>
  );
};

export default Jobs;
