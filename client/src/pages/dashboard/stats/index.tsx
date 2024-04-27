import { useSelector } from "react-redux";
import EmpDashboard from "./emp";
import SeekerDashboard from "./seeker";

export default function Dashboard() {
  const role = useSelector((state: any) => state.auth.role);

  if (role === "seeker") {
    return <SeekerDashboard />;
  } else {
    return <EmpDashboard />;
  }
}
