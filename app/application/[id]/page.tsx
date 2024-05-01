"use client";
import React, { ChangeEvent, useContext, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Context } from "@/app/layout";

interface ApplicationProps {
  params: {
    id: string;
  };
}

const Application: React.FC<ApplicationProps> = (props) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [resume, setResume] = useState<File | null>(null);

  const { isAuthorized, user } = useContext(Context);
  const router = useRouter();

  // Function to handle file input changes
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const resumeFile = event.target.files?.[0];
    if (resumeFile) {
      setResume(resumeFile);
    }
  };

  const { id } = props.params;

  const handleApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("resume", resume);
    }
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      router.push("/job/getall");
    } catch (error: any) {
      toast.error(error.response?.data.message || "An error occurred");
      console.log("this is error");
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    router.push("/");
    return null;
  }

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
      <Container maxWidth="md" className="application mt-2">
        <Typography variant="h3">Application Form</Typography>
        <form onSubmit={handleApplication}>
          <TextField
            label="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              "& > :not(style)": { mr: 1, mt: 1 },
            }}
          />
          <TextField
            label="Your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              "& > :not(style)": { mr: 1, mt: 1 },
            }}
          />
          <TextField
            label="Your Phone Number"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              "& > :not(style)": { mr: 1, mt: 1 },
            }}
          />
          <TextField
            label="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{
              "& > :not(style)": { mr: 1, mt: 1 },
            }}
          />
          <TextField
            label="Cover Letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            sx={{
              "& > :not(style)": { mr: 1, mt: 1 },
            }}
          />
          <div>
            <Typography>Select Resume</Typography>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              style={{ width: "100%" }}
              variant="outlined"
              sx={{
                "& > :not(style)": { mr: 1, mt: 1 },
              }}
            />
          </div>
          <br></br>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="mt-4 mb-2" // Adjust the margin-top value as needed
          >
            Send Application
          </Button>
        </form>
        <br></br>
      </Container>
    </>
  );
};

export default Application;
