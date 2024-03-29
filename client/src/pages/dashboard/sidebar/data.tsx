import {
  BackpackIcon,
  LayersIcon,
  PersonIcon,
  TokensIcon,
} from "@radix-ui/react-icons";
import { IconHexagonNumber1, IconHexagonNumber2 } from "@tabler/icons-react";

export interface NavLink {
  role: string;
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    role: "",
    title: "Dashboard",
    label: "3",
    href: "/dashboard",
    icon: <TokensIcon />,
  },
  {
    role: "seeker",
    title: "Jobs",
    label: "9",
    href: "/jobs",
    icon: <BackpackIcon />,
  },
  {
    role: "seeker",
    title: "Applied",
    label: "",
    href: "/applied",
    icon: <LayersIcon />,
  },
  {
    role: "",
    title: "Profile",
    label: "",
    href: "/profiles",
    icon: <PersonIcon />,
  },
  {
    role: "employer",
    title: "Post Jobs",
    label: "",
    href: "/post-job",
    icon: <IconHexagonNumber1 size={18} />,
  },
  {
    role: "employer",
    title: "View Application",
    label: "",
    href: "/view-application",
    icon: <IconHexagonNumber2 size={18} />,
  },
];
