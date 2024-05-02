"use client";
import React, { useState, useContext, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowRightCircle } from "../../components/NewJob/assets/icons/vander";
import {
  Button,
  CircularProgress,
  Typography,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Context } from "../layout";

const stripePromise = loadStripe(
  "pk_test_51P10z2SGpizPxAHaZX4shNR2tZgY8ZH8afiNaqS40IyTI9iLV2V4OLKh0kPiOGmZlyEbeftDtwXF3jf3cNZoFgBp00Q0SEYQOr"
);

interface Product {
  name: string;
  price: number;
  quantity: number;
}

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  //   padding: theme.spacing(4),
  //   backgroundImage: `url(job.jpg)`,
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
  //   minHeight: "100vh",
  // },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left", // Align text to left
    color: theme.palette.text.secondary,
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const SubscriptionPage: React.FC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  const { isAuthorized, setIsAuthorized, user }: any = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/login");
    }
  }, [isAuthorized]);

  console.log("this is uer for membership", user);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const products: Product[] = [
        { name: "Membership", price: 10000, quantity: 1 },
      ];

      const response = await fetch(
        "http://localhost:4000/api/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(products),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();

      const stripe: any = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error: any) {
      console.error("Error:", error.message);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
                    Pricing Plans
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="position-relative">
          <div className="shape overflow-hidden text-white">
            <svg
              viewBox="0 0 2880 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="row g-4 align-items-lg-center">
              <div className="col-lg-3 col-md-6 col-12">
                <div className="pricing text-center rounded position-relative shadow">
                  <div className="price-header rounded-top bg-dark bg-white-dark pt-5 pb-5">
                    <h5 className="price-title text-white title-dark">
                      Starter
                    </h5>
                    <p className="mb-0 text-white-50">Suitable for Starter</p>
                  </div>
                  <div className="d-flex justify-content-center bg-light border-bottom py-4">
                    <span className="h6 mb-0">$</span>
                    <span className="price h4 mb-0 ms-1">0.00</span>
                    <span className="h6 align-self-end mb-1">/mo</span>
                  </div>
                  <div className="pricing-features text-start">
                    <ul className="feature list-unstyled py-4 p-3 mb-0">
                      <li className="feature-list text-muted">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        Full Access
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        Enhanced Security
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        Source Files
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        1 Domain Free
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        Free Appointments
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        Free Installment
                      </li>
                    </ul>
                    <div className="border-top text-center py-4">
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        // onClick={handlePayment}
                        disabled={loading}
                      >
                        Subscribe Now
                        {/* {loading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Subscribe Now"
                        )} */}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-12">
                <div className="pricing text-center rounded position-relative overflow-hidden shadow">
                  <div className="ribbon ribbon-right overflow-hidden">
                    <span className="text-center bg-warning d-block shadow small h6">
                      Best
                    </span>
                  </div>
                  <div className="price-header rounded-top bg-dark bg-white-dark pt-5 pb-5">
                    <h5 className="price-title text-white title-dark">
                      Professional
                    </h5>
                    <p className="mb-0 text-white-50">Suitable for Regular</p>
                  </div>
                  <div className="d-flex justify-content-center bg-light border-bottom py-4">
                    <span className="h6 mb-0">$</span>
                    <span className="price h4 mb-0 ms-1">9.99</span>
                    <span className="h6 align-self-end mb-1">/mo</span>
                  </div>
                  <div className="pricing-features text-start">
                    <ul className="feature list-unstyled py-4 p-3 mb-0">
                      <li className="feature-list text-muted">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        Full Access
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        Enhanced Security
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        Source Files
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        1 Domain Free
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        Free Appointments
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        Free Installment
                      </li>
                    </ul>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      // onClick={handlePayment}
                      disabled={loading}
                    >
                      Subscribe Now
                      {/* {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Subscribe Now"
                      )} */}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-12">
                <div className="pricing text-center rounded position-relative shadow-lg bg-light">
                  <div className="price-header rounded-top bg-primary pt-5 pb-5">
                    <h5 className="price-title text-white title-dark">
                      Standerd
                    </h5>
                    <p className="mb-0 text-white-50">Suitable for Business</p>
                  </div>
                  <div className="d-flex justify-content-center bg-light border-bottom py-5">
                    <span className="h6 mb-0">$</span>
                    <span className="price h4 mb-0 ms-1">19.99</span>
                    <span className="h6 align-self-end mb-1">/mo</span>
                  </div>
                  <div className="pricing-features text-start">
                    <ul className="feature list-unstyled py-4 p-3 mb-0">
                      <li className="feature-list text-muted">
                        <FiArrowRightCircle className="fea icon-sm text-primary me-2" />
                        Full Access
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-primary me-2" />
                        Enhanced Security
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-primary me-2" />
                        Source Files
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-primary me-2" />
                        1 Domain Free
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-primary me-2" />
                        Free Appointments
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-primary me-2" />
                        Free Installment
                      </li>
                    </ul>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={handlePayment}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Subscribe Now"
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-12">
                <div className="pricing text-center rounded position-relative shadow">
                  <div className="price-header rounded-top bg-dark bg-white-dark pt-5 pb-5">
                    <h5 className="price-title text-white title-dark">
                      Premium
                    </h5>
                    <p className="mb-0 text-white-50">Suitable for Premium</p>
                  </div>
                  <div className="d-flex justify-content-center bg-light border-bottom py-4">
                    <span className="h6 mb-0">$</span>
                    <span className="price h4 mb-0 ms-1">29.99</span>
                    <span className="h6 align-self-end mb-1">/mo</span>
                  </div>
                  <div className="pricing-features text-start">
                    <ul className="feature list-unstyled py-4 p-3 mb-0">
                      <li className="feature-list text-muted">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        Full Access
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        Enhanced Security
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        Source Files
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        1 Domain Free
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        Free Appointments
                      </li>
                      <li className="feature-list text-muted mt-2">
                        <FiArrowRightCircle className="fea icon-sm text-dark me-2" />
                        Free Installment
                      </li>
                    </ul>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      // onClick={handlePayment}
                      disabled={loading}
                    >
                      Subscribe Now
                      {/* {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Subscribe Now"
                      )} */}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>

      {/* <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Subscribe Now"
        )}
      </Button> */}
    </div>
  );
};

export default SubscriptionPage;
