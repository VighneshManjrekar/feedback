import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = useSelector((state: any) => state.auth.token);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
