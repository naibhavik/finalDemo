"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaCheck } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Context } from "@/app/layout";

interface Job {
  _id: string;
  title: string;
  description: string;
  category: string;
  country: string;
  city: string;
  experience: string;
  location: string;
  fixedSalary?: string;
  salaryFrom?: string;
  salaryTo?: string;
  expired: string; // Changed to string type
}

const MyJobs: React.FC = () => {
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [editingMode, setEditingMode] = useState<string | null>(null);
  const { isAuthorized, user }: any = useContext(Context);
  const router = useRouter();

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/job/getmyjobs",
        {
          withCredentials: true,
        }
      );
      setMyJobs(data.myJobs);
    } catch (error) {
      console.log("Error fetching jobs:", error);
      toast.error("Error fetching jobs");
      setMyJobs([]);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchJobs();
      router.push("/job/me");
    } else {
      router.push("/login");
    }
  }, [isAuthorized, router]);

  // useEffect(() => {
  //   if (!isAuthorized || (user && user.role !== "Employer")) {
  //     router.push("/");
  //   }
  // }, [isAuthorized, user]);

  const handleEnableEdit = (jobId: string) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId: string) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      await axios.put(
        `http://localhost:4000/api/v1/job/update/${jobId}`,
        updatedJob,
        {
          withCredentials: true,
        }
      );
      toast.success("Job updated successfully");
      setEditingMode(null);
    } catch (error) {
      console.log("Error updating job:", error);
      toast.error("Error updating job");
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      });
      toast.success("Job deleted successfully");
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.log("Error deleting job:", error);
      toast.error("Error deleting job");
    }
  };

  const handleInputChange = (
    jobId: string,
    field: keyof Job,
    value: string | boolean
  ) => {
    // Convert boolean value to string if the field is 'expired'
    const convertedValue = field === "expired" ? String(value) : value;

    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: convertedValue } : job
      )
    );
  };
  console.log("this is user", user);

  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h1 className="header">Your Posted Jobs</h1>
          {myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map((element) => (
                  <div className="card" key={element._id}>
                    <div className="content">
                      <div className="short_fields">
                        <div>
                          <span>Title:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.title}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "title",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Country:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.country}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "country",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>City:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.city}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "city",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Experience:</span>
                          <input
                            type="text"
                            disabled={editingMode !== element._id}
                            value={element.experience}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "experience",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Category:</span>
                          <select
                            value={element.category}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "category",
                                e.target.value
                              )
                            }
                            disabled={editingMode !== element._id}
                          >
                            <option value="Graphics & Design">
                              Graphics & Design
                            </option>
                            <option value="Mobile App Development">
                              Mobile App Development
                            </option>
                            <option value="Frontend Web Development">
                              Frontend Web Development
                            </option>
                            <option value="MERN Stack Development">
                              MERN STACK Development
                            </option>
                            <option value="Account & Finance">
                              Account & Finance
                            </option>
                            <option value="Artificial Intelligence">
                              Artificial Intelligence
                            </option>
                            <option value="Video Animation">
                              Video Animation
                            </option>
                            <option value="MEAN Stack Development">
                              MEAN STACK Development
                            </option>
                            <option value="MEVN Stack Development">
                              MEVN STACK Development
                            </option>
                            <option value="Data Entry Operator">
                              Data Entry Operator
                            </option>
                          </select>
                        </div>
                        <div>
                          <span>Salary: </span>
                          {element.fixedSalary ? (
                            <input
                              type="number"
                              disabled={editingMode !== element._id}
                              value={element.fixedSalary}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "fixedSalary",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            <div>
                              <input
                                type="number"
                                disabled={editingMode !== element._id}
                                value={element.salaryFrom}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "salaryFrom",
                                    e.target.value
                                  )
                                }
                              />
                              <input
                                type="number"
                                disabled={editingMode !== element._id}
                                value={element.salaryTo}
                                onChange={(e) =>
                                  handleInputChange(
                                    element._id,
                                    "salaryTo",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <span>Expired:</span>
                          <select
                            value={element.expired}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "expired",
                                e.target.value === "true"
                              )
                            }
                            disabled={editingMode !== element._id}
                          >
                            <option value="true">TRUE</option>
                            <option value="false">FALSE</option>
                          </select>
                        </div>
                      </div>
                      <div className="long_field">
                        <div>
                          <span>Description:</span>{" "}
                          <textarea
                            rows={5}
                            value={element.description}
                            disabled={editingMode !== element._id}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <span>Location: </span>
                          <textarea
                            value={element.location}
                            rows={5}
                            disabled={editingMode !== element._id}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "location",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="button_wrapper">
                          <div className="edit_btn_wrapper">
                            {editingMode === element._id ? (
                              <>
                                <button
                                  onClick={() => handleUpdateJob(element._id)}
                                  className="check_btn"
                                >
                                  <FaCheck />
                                </button>
                                <button
                                  onClick={() => handleDisableEdit()}
                                  className="cross_btn"
                                >
                                  <RiCloseLine />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleEnableEdit(element._id)}
                                className="edit_btn"
                              >
                                Edit
                              </button>
                            )}
                          </div>
                          <button
                            onClick={() => handleDeleteJob(element._id)}
                            className="delete_btn"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p>
              Youve not posted any job or may be you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
