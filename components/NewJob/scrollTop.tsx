"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiArrowUp } from "./assets/icons/vander";

export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", toggleVisible);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", toggleVisible);
      }
    };
  }, []);

  return (
    <Link
      href="#"
      onClick={scrollToTop}
      id="back-to-top"
      className="back-to-top rounded fs-5"
      style={{ display: visible ? "block" : "none" }}
    >
      <FiArrowUp className="fea icon-sm align-middle" />
    </Link>
  );
}
