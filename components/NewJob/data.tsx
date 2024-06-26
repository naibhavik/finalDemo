import {
  FiAirplay,
  FiAward,
  FiAtSign,
  FiCodesandbox,
  FiChrome,
  FiCopy,
  FiCpu,
  FiPhone,
  FiActivity,
  FiClock,
  FiFileText,
  FiUsers,
  FiUser,
  FiInbox,
  FiThumbsUp,
  FiUmbrella,
  FiHelpCircle,
  FiBookmark,
  FiSettings,
  FiMail,
  FiMapPin,
} from "./assets/icons/vander";

export interface Job {
  id: number;
  image: string;
  name: string;
  title: string;
  country: string;
  city: string;
  applied: string;
  vacancy: string;
  date: string;
  salary: string;
  posted: string;
  jobTime: string;
  desc: string;
}

export const jobData:Job[]= [
  {
    id: 1,
    image: "/images/company/facebook-logo.png",
    name: "Facebook",
    title: "Web Designer / Developer",
    country: "Australia",
    city: "Vienna",
    applied: "20",
    vacancy: "40",
    date: "13th Sep 2023",
    salary: "950 - 1100",
    posted: "2",
    jobTime: "Full Time",
    desc: "Looking for an experienced Web Designer for an our company.",
  },
  {
    id: 2,
    image: "/images/company/google-logo.png",
    name: "Google",
    title: "Marketing Director",
    country: "Russia",
    city: "Moscow",
    applied: "20",
    vacancy: "40",
    date: "29th Nov 2023",
    salary: "950 - 1100",
    posted: "5",
    jobTime: "Part Time",
    desc: "Looking for an experienced Web Designer for an our company.",
  },
  {
    id: 3,
    image: "/images/company/android.png",
    name: "Android",
    title: "Application Developer",
    country: "Germany",
    city: "Berlin",
    applied: "20",
    vacancy: "40",
    date: "29th Dec 2023",
    salary: "950 - 1100",
    posted: "3",
    jobTime: "Remote",
    desc: "Looking for an experienced Web Designer for an our company.",
  },
  {
    id: 4,
    image: "/images/company/lenovo-logo.png",
    name: "Lenovo",
    title: "Senior Product Designer",
    country: "Italy",
    city: "Rome",
    applied: "20",
    vacancy: "40",
    date: "13th March 2023",
    salary: "950 - 1100",
    posted: "2",
    jobTime: "WFH",
    desc: "Looking for an experienced Web Designer for an our company.",
  },
  {
    id: 5,
    image: "/images/company/spotify.png",
    name: "Spotify",
    title: "C++ Developer",
    country: "France",
    city: "Paris",
    applied: "20",
    vacancy: "40",
    date: "5th May 2023",
    salary: "950 - 1100",
    posted: "3",
    jobTime: "Full Time",
    desc: "Looking for an experienced Web Designer for an our company.",
  },
  {
    id: 6,
    image: "/images/company/linkedin.png",
    name: "Linkedin",
    title: "Php Developer",
    country: "Greece",
    city: "Athens",
    applied: "20",
    vacancy: "40",
    date: "19th June 2023",
    salary: "950 - 1100",
    posted: "7",
    jobTime: "Remote",
    desc: "Looking for an experienced Web Designer for an our company.",
  },
  {
    id: 7,
    image: "/images/company/circle-logo.png",
    name: "Circle CI",
    title: "Web Designer / Developer",
    country: "China",
    city: "Beijing",
    applied: "20",
    vacancy: "40",
    date: "20th June 2023",
    salary: "950 - 1100",
    posted: "1",
    jobTime: "Full Time",
    desc: "Looking for an experienced Web Designer for an our company.",
  },
  {
    id: 8,
    image: "/images/company/skype.png",
    name: "Skype",
    title: "Marketing Director",
    country: "Japan",
    city: "Tokyo",
    applied: "20",
    vacancy: "40",
    date: "31th Aug 2023",
    salary: "950 - 1100",
    posted: "2",
    jobTime: "Part Time",
    desc: "Looking for an experienced Web Designer for an our company.",
  },
  {
    id: 9,
    image: "/images/company/snapchat.png",
    name: "Snapchat",
    title: "Application Developer",
    country: "Singapore",
    city: "Singapore",
    applied: "20",
    vacancy: "40",
    date: "1th Sep 2023",
    salary: "950 - 1100",
    posted: "4",
    jobTime: "Remote ",
    desc: "Looking for an experienced Web Designer for an our company.",
  },
  {
    id: 10,
    image: "/images/company/shree-logo.png",
    name: "Shreethemes",
    title: "Senior Product Designer",
    country: "United States",
    city: "Washington",
    applied: "20",
    vacancy: "40",
    date: "13th May 2023",
    salary: "950 - 1100",
    posted: "3",
    jobTime: "WFH",
    desc: "Looking for an experienced Web Designer for an our company.",
  },
  {
    id: 11,
    image: "/images/company/telegram.png",
    name: "Telegram",
    title: "C++ Developer",
    country: "Spain",
    city: "Madrid",
    applied: "20",
    vacancy: "40",
    date: "13th March 2023",
    salary: "950 - 1100",
    posted: "2",
    jobTime: "Full Time",
    desc: "Looking for an experienced Web Designer for an our company.",
  },
  {
    id: 12,
    image: "/images/company/whatsapp.png",
    name: "Whatsapp",
    title: "Php Developer",
    country: "Jordan",
    city: "Amman",
    applied: "20",
    vacancy: "40",
    date: "13th June 2023",
    salary: "950 - 1100",
    posted: "5",
    jobTime: "Remote",
    desc: "Looking for an experienced Web Designer for an our company.",
  },
];

export interface BlogData {
  id: number;
  image: string;
  title: string;
  date: string;
  time: string;
  tag: string;
  company: string;
}
export const blogData:BlogData[]= [
  {
    id: 1,
    image: "/images/blog/01.jpg",
    title: "11 Tips to Help You Get New Clients Through Cold Calling",
    date: "13th Sep 2023",
    time: "5 min read",
    tag: "Arts",
    company: "Google",
  },
  {
    id: 2,
    image: "/images/blog/02.jpg",
    title: "DigitalOcean launches first Canadian data centre in Toronto",
    date: "29th Nov 2023",
    time: "5 min read",
    tag: "Illustration",
    company: "Facebook",
  },
  {
    id: 3,
    image: "/images/blog/03.jpg",
    title: "Using Banner Stands To Increase Trade Show Traffic",
    date: "29th Dec 2023",
    time: "5 min read",
    tag: "Music",
    company: "Linkedin",
  },
  {
    id: 4,
    image: "/images/blog/04.jpg",
    title: "11 Tips to Help You Get New Clients Through Cold Calling",
    date: "13th March 2023",
    time: "5 min read",
    tag: "Arts",
    company: "Google",
  },
  {
    id: 5,
    image: "/images/blog/05.jpg",
    title: "DigitalOcean launches first Canadian data centre in Toronto",
    date: "5th May 2023",
    time: "5 min read",
    tag: "Illustration",
    company: "Facebook",
  },
  {
    id: 6,
    image: "/images/blog/06.jpg",
    title: "Using Banner Stands To Increase Trade Show Traffic",
    date: "19th June 2023",
    time: "5 min read",
    tag: "Music",
    company: "Linkedin",
  },
  {
    id: 7,
    image: "/images/blog/07.jpg",
    title: "11 Tips to Help You Get New Clients Through Cold Calling",
    date: "20th June 2023",
    time: "5 min read",
    tag: "Arts",
    company: "Google",
  },
  {
    id: 8,
    image: "/images/blog/08.jpg",
    title: "DigitalOcean launches first Canadian data centre in Toronto",
    date: "31st Aug 2023",
    time: "5 min read",
    tag: "Illustration",
    company: "Facebook",
  },
  {
    id: 9,
    image: "/images/blog/09.jpg",
    title: "Using Banner Stands To Increase Trade Show Traffic",
    date: "1st Sep 2024",
    time: "5 min read",
    tag: "Music",
    company: "Linkedin",
  },
];

export interface CategoriesTwoData {

  title: string;
  job: string;
}
export const categoriesTwoData: CategoriesTwoData []= [
  {
    title: "Human Resource",
    job: "90 Jobs Available",
  },
  {
    title: "It & Networking",
    job: "90 Jobs Available",
  },
  {
    title: "Sales & Marketing",
    job: "90 Jobs Available",
  },
  {
    title: "Accounting",
    job: "90 Jobs Available",
  },
  {
    title: "Delivery Boy",
    job: "90 Jobs Available",
  },
  {
    title: "Data Science",
    job: "90 Jobs Available",
  },
  {
    title: "Project Manager",
    job: "90 Jobs Available",
  },
  {
    title: "Engineering",
    job: "90 Jobs Available",
  },
  {
    title: "Help Center",
    job: "90 Jobs Available",
  },
  {
    title: "Full Stack Developer",
    job: "90 Jobs Available",
  },
];
interface ContactItem {
  icon: any;
  title: string;
  desc: string;
  link: string;
}

export const contactData: ContactItem[] = [
  {
    icon: FiPhone,
    title: "Phone",
    desc: "Start working with over team that can provide everything",
    link: "tel:+91 6352360058",
  },
  {
    icon: FiMail,
    title: "Email",
    desc: "Start working with with over team that can provide everything",
    link: "contact@example.com",
  },
  {
    icon: FiMapPin,
    title: "Location",
    desc: "Start working with with over team can provide everything",
    link: "View on Google map",
  },
];
interface Teamdata{
    image:string,
    name:string,
    title:string
}
export const teamData: Teamdata[] = [
  {
    image: "/images/team/01.jpg",
    name: "Jack John",
    title: "Job Seeker",
  },
  {
    image: "/images/team/02.jpg",
    name: "Krista John",
    title: "Job Seeker",
  },
  {
    image: "/images/team/03.jpg",
    name: "Roger Jackson",
    title: "Job Seeker",
  },
  {
    image: "/images/team/04.jpg",
    name: "Johnny English",
    title: "Job Seeker",
  },
];
interface ServicesData {
  icon: any;
  title: string;
  desc: string;
}
export const servicesData: ServicesData[] = [
  {
    icon: FiPhone,
    title: "24/7 Support",
    desc: "Many desktop publishing now use and a search for job.",
  },
  {
    icon: FiCpu,
    title: "Tech & Startup Jobs",
    desc: "Many desktop publishing now use and a search for job.",
  },
  {
    icon: FiActivity,
    title: "Quick & Easy",
    desc: "Many desktop publishing now use and a search for job.",
  },
  {
    icon: FiClock,
    title: "Save Time",
    desc: "Many desktop publishing now use and a search for job.",
  },
  {
    icon: FiFileText,
    title: "Apply with confidence",
    desc: "Many desktop publishing now use and a search for job.",
  },
  {
    icon: FiCodesandbox,
    title: "Reduce Hiring Bias",
    desc: "Many desktop publishing now use and a search for job.",
  },
  {
    icon: FiUsers,
    title: "Proactive Employers",
    desc: "Many desktop publishing now use and a search for job.",
  },
  {
    icon: FiUser,
    title: "Proactive Employers",
    desc: "Many desktop publishing now use and a search for job.",
  },
];