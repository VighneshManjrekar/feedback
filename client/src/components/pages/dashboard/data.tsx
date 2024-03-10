import {
  BackpackIcon,
  LayersIcon,
  Pencil2Icon,
  PersonIcon,
  TokensIcon,
} from "@radix-ui/react-icons";
import {
  IconUserShield,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
} from "@tabler/icons-react";

export interface NavLink {
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
    title: "Dashboard",
    label: "3",
    href: "/dashboard",
    icon: <TokensIcon />,
  },
  {
    title: "Jobs",
    label: "9",
    href: "/jobs",
    icon: <BackpackIcon />,
  },
  {
    title: "Applied",
    label: "",
    href: "/applied",
    icon: <LayersIcon />,
  },
  {
    title: "Profile",
    label: "",
    href: "/profiles",
    icon: <PersonIcon />,
  },
  {
    title: "Employer",
    label: "",
    href: "",
    icon: <IconUserShield size={18} />,
    sub: [
      {
        title: "Post Jobs",
        label: "",
        href: "/post-job",
        icon: <IconHexagonNumber1 size={18} />,
      },
      {
        title: "View Application",
        label: "",
        href: "/view-application",
        icon: <IconHexagonNumber2 size={18} />,
      },
    ],
  },
];
