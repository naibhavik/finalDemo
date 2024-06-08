"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Context } from "@/app/layout";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Container,
  Grid,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface LocationPrediction {
  description: string;
}

const PostJob: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [experience, setExperience] = useState<string>("");

  const [location, setLocation] = useState<string>("");
  const [salaryFrom, setSalaryFrom] = useState<string>("");
  const [salaryTo, setSalaryTo] = useState<string>("");
  const [fixedSalary, setFixedSalary] = useState<string>("");
  const [salaryType, setSalaryType] = useState<string>("default");
  const [locationSuggestions, setLocationSuggestions] = useState<
    LocationPrediction[]
  >([]);

  const { isAuthorized, user }: any = useContext(Context);
  const router = useRouter();

  const fetchLocationSuggestions = async (input: string) => {
    const options = {
      method: "GET",
      url: "https://map-places.p.rapidapi.com/autocomplete/json",
      params: {
        input,
        radius: "50000",
      },
      headers: {
        "X-RapidAPI-Key": "9c9bb817demsh657b7119fe8d549p18c8ffjsn9f4640bf7ce5",
        "X-RapidAPI-Host": "place-autocomplete1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setLocationSuggestions(response.data.predictions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    fetchLocationSuggestions(value);
  };

  const handleJobPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let postData: any = {
        title,
        description,
        category,
        country,
        city,
        experience,
        location,
      };

      if (salaryType === "Fixed Salary") {
        postData.fixedSalary = fixedSalary;
      } else if (salaryType === "Ranged Salary") {
        postData.salaryFrom = salaryFrom;
        postData.salaryTo = salaryTo;
      }

      const res = await axios.post(
        "http://localhost:4000/api/v1/job/post",
        postData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(res.data.message);
      router.push("/job/post");
    } catch (err: any) {
      toast.error(err.response.data.message);
      console.log("this is error", err);
    }
  };

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/login");
    }
  }, [isAuthorized, user, router]);

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
      <Container className="mt-10 mb-20">
        <Typography variant="h3" className="text-center" gutterBottom>
          Post New Job
        </Typography>
        <form onSubmit={handleJobPost} className="mt-5">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                label="Job Title"
                variant="outlined"
                sx={{
                  "& > :not(style)": { mr: 1, mt: 1 },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select Category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as string)}
                >
                  <MenuItem value="">Select Category</MenuItem>
                  <MenuItem value="Graphics & Design">
                    Data Entry Operator
                  </MenuItem>
                  <MenuItem value="Mobile App Development">
                    Mobile App Development
                  </MenuItem>
                  <MenuItem value="Artificial Intelligence">
                    Artificial Intelligence
                  </MenuItem>
                  <MenuItem value="MEAN STACK Development">
                    MEAN STACK Development
                  </MenuItem>
                  <MenuItem value="Web Development">Web Development</MenuItem>
                  <MenuItem value="Frontend Web Development">
                    Frontend Web Development
                  </MenuItem>
                </Select>
                {category === "" && (
                  <FormHelperText>Please select a category</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                label="Country"
                variant="outlined"
                sx={{
                  "& > :not(style)": { mr: 1, mt: 1 },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                label="City"
                variant="outlined"
                sx={{
                  "& > :not(style)": { mr: 1, mt: 1 },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                label="Experience"
                variant="outlined"
                sx={{
                  "& > :not(style)": { mr: 1, mt: 1 },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                value={location}
                onChange={(event: any, newValue: string | null) => {
                  setLocation(newValue || "");
                }}
                inputValue={location}
                onInputChange={(event, newInputValue) => {
                  setLocation(newInputValue);
                  fetchLocationSuggestions(newInputValue);
                }}
                options={locationSuggestions.map(
                  (option) => option.description
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Location"
                    variant="outlined"
                    sx={{
                      "& > :not(style)": { mr: 1, mt: 1 },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Select
                  value={salaryType}
                  onChange={(e) => setSalaryType(e.target.value as string)}
                  sx={{
                    "& > :not(style)": { mr: 1, mt: 1 },
                  }}
                >
                  <MenuItem value="default">Select Salary Type</MenuItem>
                  <MenuItem value="Fixed Salary">Fixed Salary</MenuItem>
                  <MenuItem value="Ranged Salary">Ranged Salary</MenuItem>
                </Select>
                {salaryType === "default" && (
                  <FormHelperText>Please select a salary type</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {salaryType === "Fixed Salary" && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  value={fixedSalary}
                  onChange={(e) => setFixedSalary(e.target.value)}
                  label="Fixed Salary"
                  variant="outlined"
                  sx={{
                    "& > :not(style)": { mr: 1, mt: 1 },
                  }}
                />
              </Grid>
            )}
            {salaryType === "Ranged Salary" && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    value={salaryFrom}
                    onChange={(e) => setSalaryFrom(e.target.value)}
                    label="Salary From"
                    variant="outlined"
                    sx={{
                      "& > :not(style)": { mr: 1, mt: 1 },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    value={salaryTo}
                    onChange={(e) => setSalaryTo(e.target.value)}
                    label="Salary To"
                    variant="outlined"
                    sx={{
                      "& > :not(style)": { mr: 1, mt: 1 },
                    }}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label="Job Description"
                variant="outlined"
                sx={{
                  "& > :not(style)": { mr: 1, mt: 1 },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  "& > :not(style)": { m: 1 },
                }}
              >
                Create Job
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default PostJob;
