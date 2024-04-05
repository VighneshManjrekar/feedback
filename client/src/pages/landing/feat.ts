import {
  IconAward,
  IconBrandDatabricks,
  IconLayoutGridAdd,
  IconMailForward,
  IconPencilStar,
  IconScanEye,
} from "@tabler/icons-react";

const jobAppFeatures = [
  {
    title: "Pixel Tracking",
    description:
      "Real-time monitoring for insights into user interactions and application strategies.",
    icon: IconScanEye,
    titleColor: "#D8F3DC",
    descriptionColor: "#C7F9CC",
    bgColor: "#74C69D",
  },
  {
    title: "Metric Collection",
    description:
      "Aggregating data for actionable feedback on acceptance rates and response times.",
    icon: IconBrandDatabricks,
    titleColor: "#228CDB",
    descriptionColor: "#979797",
    bgColor: "#E0EAFC",
  },
  {
    title: "Recommendations",
    description: "Machine learning-driven job suggestions based on user data.",
    icon: IconAward,
    titleColor: "#D8F3DC",
    descriptionColor: "#C7F9CC",
    bgColor: "#74C69D",
  },
  {
    title: "Custom Resume",
    description: "Direct platform tool for creating consistent resumes.",
    icon: IconLayoutGridAdd,
    titleColor: "#228CDB",
    descriptionColor: "#979797",
    bgColor: "#E0EAFC",
  },
  {
    title: "Email Tracker",
    description:
      "Monitoring application metrics tied to specific resume versions.",
    icon: IconMailForward,
    titleColor: "#D8F3DC",
    descriptionColor: "#C7F9CC",
    bgColor: "#74C69D",
  },
  {
    title: "Cover Letter Generator",
    description: "Professional email templates for enhanced job applications.",
    icon: IconPencilStar,
    titleColor: "#228CDB",
    descriptionColor: "#979797",
    bgColor: "#E0EAFC",
  },
];

export default jobAppFeatures;
