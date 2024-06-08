"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IconType } from "react-icons";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

import { contactData } from "../../components/NewJob/data";
import ScrollTop from "@/components/NewJob/scrollTop";

export default function ContactUs() {
  const currentDate = new Date().toString();
  console.log(currentDate)
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
                <p className="text-white-50 para-desc mx-auto mb-0">
                  Get in touch !
                </p>
                <h5 className="heading fw-semibold mb-0 sub-heading text-white title-dark">
                  Contact us
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

      <section className="section pb-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <Image
                src="/images/svg/contact.svg"
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="img-fluid"
                alt=""
              />
            </div>
            <div className="col-md-6">
              <div className="p-4 rounded shadow ms-lg-5">
                <h4>Get in touch !</h4>
                <form
                  action="https://formspree.io/f/mjvnlodl"
                  method="POST"
                  className="mt-4"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Your Name <span className="text-danger">*</span>
                        </label>
                        <input
                          name="name"
                          id="name"
                          type="text"
                          className="form-control"
                          placeholder="Name :"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Your Email <span className="text-danger">*</span>
                        </label>
                        <input
                          name="email"
                          id="email"
                          type="email"
                          className="form-control"
                          placeholder="Email :"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Subject
                        </label>
                        <input
                          name="subject"
                          id="subject"
                          className="form-control"
                          placeholder="Subject :"
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">
                          Comments <span className="text-danger">*</span>
                        </label>
                        <textarea
                          name="comments"
                          id="comments"
                          rows={4}
                          className="form-control"
                          placeholder="Message :"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="d-grid">
                        <button
                          type="submit"
                          id="submit"
                          name="send"
                          className="btn btn-primary"
                        >
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-100 mt-60">
          <div className="row g-4">
            {contactData.map((item: any, index: number) => {
              let Icon: IconType = item.icon;
              return (
                <div className="col-md-4" key={index}>
                  <div className="position-relative features text-center mx-lg-4 px-md-1">
                    <div className="feature-icon bg-soft-primary rounded shadow mx-auto position-relative overflow-hidden d-flex justify-content-center align-items-center">
                      <Icon className="fea icon-ex-md" />
                    </div>

                    <div className="mt-4">
                      <h5 className="mb-3">{item.title}</h5>
                      <p className="text-muted">{item.desc}</p>
                      <Link href={item.link} className="text-primary">
                        {item.link}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="container-fluid mt-100 mt-60">
          <div className="row">
            <div className="col-12 p-0">
              <div className="card map border-0">
                <div className="card-body p-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.1126834817846!2d72.75503515916405!3d21.145907877118226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d806232a989%3A0xf791a1e083b2bca3!2sLa%20Net%20Team%20Software%20Solutions%20Pvt.%20LTD.!5e0!3m2!1sen!2sin!4v1717654451300!5m2!1sen!2sin"
                    title="jobnova"
                    style={{ border: "0" }}
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ScrollTop />
    </>
  );
}
