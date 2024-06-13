"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ResumeModal from "@/components/NewJob/ResumeModal";
import { Context } from "@/app/layout";
import {
  FiBookmark,
  FiClock,
  FiMapPin,
} from "@/components/NewJob/assets/icons/vander";
import ScrollTop from "@/components/NewJob/scrollTop";

interface Application {
  _id: string;
  name: string;
  email: string;
  phone: string;
  jobseekerstatus: string;
  address: string;
  coverLetter: string;
  resume: {
    url: string;
  };
}

interface JobSeekerCardProps {
  element: Application;
  deleteApplication: (id: string) => void;
  openModal: (imageUrl: string) => void;
}

interface EmployerCardProps {
  element: Application;
  openModal: (imageUrl: string) => void;
}

const MyApplications: React.FC = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState<Application[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [resumeImageUrl, setResumeImageUrl] = useState<string>("");
  const [accept, setAccept] = useState<boolean>(true);
  // const [meetingId, setMeetingId]= useState<string>("")
    // const [email, setEmail] = useState<string>("");

  const { isAuthorized } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.role === "Employer") {
          const res = await axios.get(
            "http://localhost:4000/api/v1/application/employer/getall",
            {
              withCredentials: true,
            }
          );
          setApplications(res.data.applications);
        } else {
          const res = await axios.get(
            "http://localhost:4000/api/v1/application/jobseeker/getall",
            {
              withCredentials: true,
            }
          );
          setApplications(res.data.applications);
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
        console.log("this is error");
      }
    };

    if (!isAuthorized) {
      router.push("/login");
    } else {
      fetchData();
      router.push("/application/me");
    }
  }, [isAuthorized, user]);

  const deleteApplication = (id: string) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("this is error");
    }
  };
  


  const openModal = (imageUrl: string) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
                  Filled Employer Job
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="my_applications page">
        {user && user.role === "Job Seeker" ? (
          <div className="container">
            <h1 className="header">My Applications</h1>
            {applications.length <= 0 ? (
              <>
                <h4>No Applications Found</h4>{" "}
              </>
            ) : (
              applications.map((element) => {
                return (
                  <JobSeekerCard
                    element={element}
                    key={element._id}
                    deleteApplication={deleteApplication}
                    openModal={openModal}
                  />
                );
              })
            )}
          </div>
        ) : (
          <div className="container">
            <h1 className="header">Applications From Job Seekers</h1>
            {applications.length <= 0 ? (
              <>
                <h4>No Applications Found</h4>
              </>
            ) : (
              applications.map((element) => {
                return (
                  <EmployerCard
                    element={element}
                    key={element._id}
                    openModal={openModal}
                  />
                );
              })
            )}
          </div>
        )}
        {modalOpen && (
          <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
        )}
      </section>
    </>
  );
};

const JobSeekerCard: React.FC<JobSeekerCardProps> = ({
  element,
  deleteApplication,
  openModal,
}) => {
  const truncateText = (text: string) => {
    const maxLength = 12;
    if (text?.length > maxLength) {
      return text?.substring(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <div className="job-post job-post-list rounded shadow p-4 d-md-flex align-items-center justify-content-between position-relative">
      <div className="d-flex align-items-center w-130px">
        <div className="ms-3">
          <span className="fw-bold">Name:</span> {truncateText(element.name)}
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between d-md-block mt-3 mt-md-0 w-200px  pr-10">
        <span className="badge bg-soft-primary rounded-pill">
          <span className="fw-bold">Email:</span> {element.email}
        </span>
        <span className="text-muted d-flex align-items-center fw-medium mt-md-2">
          <FiClock className="fea icon-sm me-1 align-middle" />
          <span className="fw-bold">Phone:</span> {element.phone}
        </span>
        <span className="text-muted d-flex align-items-center fw-medium mt-md-2">
          <FiClock className="fea icon-sm me-1 align-middle" />
          <span className="fw-bold">Job Seeker Application Status:</span>{" "}
          {element.jobseekerstatus}
        </span>
        <span className="text-muted d-flex align-items-center">
          <FiMapPin
            className="fea icon-sm me-1 align-middle"
            style={{ display: "inline-block" }}
          />
          <span className="fw-bold">
            Address:
            {element.address}
          </span>
        </span>
      </div>
      <div className="d-flex align-items-center justify-content-between d-md-block mt-2 mt-md-0 w-130px">
        <span className="d-flex fw-medium mt-md-2">
          <span className="fw-bold pr-3">
            Cover Letter: {truncateText(element.coverLetter)}
          </span>
        </span>
      </div>

      <div className="w-40 h-30">
        <img
          src={element.resume.url}
          alt="resume"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="btn_area">
        <button
          className="btn btn-danger"
          onClick={() => deleteApplication(element._id)}
        >
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard: React.FC<any> = ({ element, openModal }) => {
  const [newRoomId, setNewRoomId] = useState<string>("Pending");
  const [showMailModal, setShowMailModal] = useState(false);
  const [meetingId, setMeetingId] = useState("");
  const [mydate, setMydate] = useState("");
     const [email, setEmail] = useState<string>("");

  const handleRoomIdChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewRoomId(event.target.value);
  };

  console.log("status", newRoomId);
  const handleStatusChange = async () => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/application/updateRoomId/${element._id}`,
        { jobseekerstatus: newRoomId },
        { withCredentials: true }
      );
     
      if (res.data.success) {
        toast.success("Room ID updated successfully");
        
        if (newRoomId === "Approved") {
         
          setShowMailModal(true);
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("Error updating room ID");
    }
  };
   const handleApplication = async (e: React.FormEvent) => {
     e.preventDefault();
     try {
       const { data } = await axios.post(
         "http://localhost:4000/schedulemeeting",
         { meetingId, email, mydate },
         {
           withCredentials: true,
           headers: {
             "Content-Type": "application/json",
           },
         }
       );
       toast.success(data.message);
       setShowMailModal(false);
     } catch (error: any) {
       toast.error(error.response?.data.message || "An error occurred");
       console.log("Error scheduling meeting and sending mail");
     }
   };

  const truncateText = (text: string) => {
    const maxLength = 12;
    if (text?.length > maxLength) {
      return text?.substring(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <>
      <div className="job-post job-post-list rounded shadow p-4 d-md-flex align-items-center justify-content-between position-relative">
        <div className="d-flex align-items-center w-80px">
          <div className="ms-3">
            <span className="fw-bold">Name:</span> {element.name}
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between d-md-block mt-3 mt-md-0 w-200px  pr-10">
          <span className="badge bg-soft-primary rounded-pill">
            <span className="fw-bold">Email:</span> {element.email}
          </span>
          <span className="text-muted d-flex align-items-center fw-medium mt-md-2">
            <FiClock className="fea icon-sm me-1 align-middle" />
            <span className="fw-bold">Phone:</span> {element.phone}
          </span>
          <span className="text-muted d-flex align-items-center">
            <FiMapPin
              className="fea icon-sm me-1 align-middle"
              style={{ display: "inline-block" }}
            />
            <span className="fw-bold">
              Address:
              {element.address}
            </span>

            <span className="text-muted d-flex align-items-center fw-medium mt-md-2">
              <FiClock className="fea icon-sm me-1 align-middle" />
              <span className="fw-bold">
                Application Status of Job Seeker:
              </span>{" "}
              <select
                value={newRoomId}
                onChange={(e) => {
                  setNewRoomId(e.target.value);
                }}
              >
                {["Pending", "Approved", "Rejected"].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </span>
          </span>
          <>
            <div className="text-center">
              <button
                className="btn btn-primary mt-2"
                onClick={handleStatusChange}
              >
                Job Jobseeker Request Status Edit
              </button>
            </div>
          </>
        </div>
        <div className="d-flex align-items-center justify-content-between d-md-block mt-2 mt-md-0 w-130px">
          <span className="d-flex fw-medium mt-md-2">
            <span className="fw-bold pr-3">
              Cover Letter: {truncateText(element.coverLetter)}
            </span>
          </span>
        </div>

        <div className="w-40 h-30">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>

      {newRoomId === "Approved" && (
        <button
          className="btn btn-primary mt-2"
          onClick={() => setShowMailModal(true)}
        >
          Send to Mail
        </button>
      )}
    
      {showMailModal && (
        <div className="mail-modal">
          <form onSubmit={handleApplication}>
            <input
              type="text"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              placeholder="Enter your meeting ID"
            />
            <input
              type="datetime-local"
              value={mydate}
              onChange={(e) => setMydate(e.target.value)}
            />
            <input
              type="text"
              value={email}
              placeholder="Enter Jobseeker email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Schedule and Send Mail
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowMailModal(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <ScrollTop />
    </>
  );
};

export default MyApplications;
