"use client"
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ResumeModal from "@/components/ResumeModal";
import { Context } from "@/app/layout";


interface Application {
  _id: string;
  name: string;
  email: string;
  phone: string;
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
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard: React.FC<EmployerCardProps> = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>CoverLetter:</span> {element.coverLetter}
          </p>
        </div>
        <div className="resume">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};

export default MyApplications;
