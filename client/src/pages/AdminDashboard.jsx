import { useEffect, useState } from "react";
import Heading from "../components/Heading.jsx";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const url = "http://localhost:8520/users";
  const fetchUser = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    const token = localStorage.getItem("accessToken");
    const url = `http://localhost:8520/api/user/${id}`;
    if (window.confirm("Are you sure?")) {
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        });
        if (response.ok) {
          setDeleted(true);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchUser(url);
  }, []);
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <Heading text="Admin dashboard" />
      <div
        className={`${
          deleted ? "block" : "hidden"
        } absolute bg-white p-4 rounded-2xl top-6`}
      >
        <span className="text-green">Deleted successfully</span>
      </div>
      <main className="w-11/12 overflow-y-auto">
        <h1 className="font-semibold text-2xl">Users</h1>
        <table>
          <thead>
            <tr>
              <td>First name</td>
              <td>Last name</td>
              <td>Email</td>
              <td>Password</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const { _id, firstName, lastName, password, email } = user;
              return (
                <tr key={index}>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{email}</td>
                  <td>{password}</td>
                  <td className="flex gap-4 justify-center">
                    <button
                      onClick={() => handleDelete(_id)}
                      className="hover:bg-transparent hover:text-yellow"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminDashboard;
