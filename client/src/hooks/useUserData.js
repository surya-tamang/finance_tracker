import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      const userId = decoded.id;
      const url = `http://localhost:8520/api/user/${userId}`;

      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setUserData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }

    return () => {
      setUserData(null);
    };
  }, []);

  const clearUserData = () => {
    setUserData(null);
    localStorage.removeItem("accessToken");
  };

  return { userData, loading, error, clearUserData };
};

export default useUserData;
