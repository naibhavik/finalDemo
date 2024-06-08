import React, { useState } from "react";
import Link from "next/link";
// import ModalVideo from "react-modal-video";

export default function VideoModal() {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="position-absolute top-50 start-50 translate-middle">
        <Link
          href="#!"
          scroll={false}
          onClick={() => setOpen(true)}
          className="avatar avatar-md-md rounded-pill shadow card d-flex justify-content-center align-items-center lightbox"
        >
          <i className="mdi mdi-play mdi-24px text-primary"></i>
        </Link>
      </div>
     
    </>
  );
}
