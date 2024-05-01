import React, { useContext } from "react";
import Link from "next/link";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Context } from "@/app/layout";

const Footer: React.FC = () => {
	
  const { isAuthorized, setIsAuthorized,}: any = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Nai Bhavik.</div>
      <div>
        <Link href="" passHref>
          <FaFacebookF />
        </Link>
        <Link href="" passHref>
          <FaYoutube />
        </Link>
        <Link href="" passHref>
          <FaLinkedin />
        </Link>
        <Link href="" passHref>
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
