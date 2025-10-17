import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorageUser } from "./utils/storage";

const ProtectedRoutes = () => {
  const user = getLocalStorageUser();

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
