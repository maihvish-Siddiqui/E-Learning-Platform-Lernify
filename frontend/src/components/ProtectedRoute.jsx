import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({
  children,
  allowedRole,
}) {

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (
    allowedRole &&
    user?.role !== allowedRole
  ) {
    return <Navigate to="/login" />;
  }

  return children;
}