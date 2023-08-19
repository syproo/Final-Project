import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";

const ProtectedRoute = () => {
    const [ok, setOk] = useState(false);

    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(
                "http://localhost:8080/api/v1/auth/user-auth"
            );
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        };
        if (auth?.token) authCheck();
    }, [auth?.token]);


    return (
        <div>
            {!ok ?  <Spinner /> : <Outlet />}
        </div>
    )
};

export default ProtectedRoute;
