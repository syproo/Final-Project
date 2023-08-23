import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";

const AdminProtectedRoute = () => {
  const [ok, setOk] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        "http://localhost:8080/api/v1/auth/admin-auth"
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return <div>{!ok ? <Spinner path="" /> : <Outlet />}</div>;
};

export default AdminProtectedRoute;
