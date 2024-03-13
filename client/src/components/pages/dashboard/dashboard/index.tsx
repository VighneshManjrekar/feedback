import { useSelector } from "react-redux";
import SeekerDashboard from "./seeker";
import EmpDashboard from "./emp";

export default function Dashboard() {
  const role = useSelector((state: any) => state.auth.role);

  if (role === "seeker") {
    return <SeekerDashboard />;
  } else {
    return <EmpDashboard />;
  }
}
