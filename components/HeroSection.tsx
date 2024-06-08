import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

interface Detail {
  id: number;
  title: string;
  subTitle: string;
  icon: JSX.Element;
}

const HeroSection: React.FC = () => {
  const details: Detail[] = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h3>Find a job that suits your interests and skills</h3>
           
            <p>
              Join our team and embark on a journey where passion meets purpose.
              We are on the lookout for a dedicated professional who is ready to
              dive into a challenging yet rewarding role. As an innovative
              company, we value creativity, collaboration, and the drive to make
              a lasting impact. We offer a platform where your skills will be
              honed, your achievements recognized, and your personal growth
              nurtured. If you are eager to contribute to a team that pushes the
              boundaries of Your Industry/Field, we invite you to apply and help
              us shape the future together.
            </p>
          </div>
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
