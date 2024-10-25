import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Adminlogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const url = "http://localhost:8520/api/admin/login";
  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    if (!email || !password) {
      setError("all fields required");
    } else {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        });
        const data = await response.json();
        if (!response.ok) {
          setError(data.msg);
        } else {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          navigate("/admin/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen flex-col">
      <form action="POST" className="justify-start" onSubmit={handleSubmit}>
        <h1 className="mb-16 text-2xl font-semibold">Welcome admin</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <span className="text-red ml-3"> {error}</span>
        <button className="w-full">Log in</button>
      </form>
    </div>
  );
};

export default Adminlogin;
