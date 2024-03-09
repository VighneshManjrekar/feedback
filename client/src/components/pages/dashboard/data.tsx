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
    title: "Post Job",
    label: "9",
    href: "/post-job",
  },
  {
    title: "Profile",
    label: "",
    href: "/profiles",
  },
];
