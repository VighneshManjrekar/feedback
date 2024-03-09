export interface NavLink {
  title: string;
  label?: string;
  href: string;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "3",
    href: "/dashboard",
  },
  {
    title: "Jobs",
    label: "9",
    href: "/jobs",
  },
  {
    title: "Applied",
    label: "",
    href: "/applied",
  },
  {
    title: "Status",
    label: "",
    href: "/status",
  },
  {
    title: "Analysis",
    label: "",
    href: "/analysis",
  },
  {
    title: "Profile",
    label: "",
    href: "/profiles",
  },
];
