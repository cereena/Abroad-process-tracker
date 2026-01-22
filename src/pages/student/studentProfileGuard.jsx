import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function StudentProfileGuard() {
  const [loading, setLoading] = useState(true);
  const [profileCompleted, setProfileCompleted] = useState(false);

  const token = localStorage.getItem("studentToken");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/student/profile-status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileCompleted(data.profileCompleted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  if (loading) return <p>Loading...</p>;

  if (!token) return <Navigate to="/login" />;

  if (!profileCompleted) return <Navigate to="/profile" />;

  return <Outlet />;
}
