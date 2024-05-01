"use client"
import React from "react";
import Link from "next/link";

const NotFound: React.FC = () => {
  return (
    <>
      <section className="page notfound">
        <div className="content">
          <img src="/notfound.png" alt="notfound" />
          <Link href="/">RETURN TO HOME PAGE</Link>
        </div>
      </section>
    </>
  );
};

export default NotFound;
