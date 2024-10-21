import { useEffect, useState } from "react";
import Heading from "../components/Heading";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
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
  useEffect(() => {
    fetchUser(url);
  }, []);
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <Heading text="Admin dashboard" />
      <main className="w-11/12">
        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <td>First name</td>
              <td>Last name</td>
              <td>Email</td>
              <td>Password</td>
              <td>Budget</td>
              <td>ExpensesId</td>
              <td>RevenuesId</td>
              <td>Update</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const {
                firstName,
                lastName,
                currentBudget,
                expenses,
                revenues,
                password,
                email,
              } = user;
              return (
                <tr key={index}>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{email}</td>
                  <td>{password}</td>
                  <td>{currentBudget}</td>
                  <td>{expenses}</td>
                  <td>{revenues}</td>
                  <td className="flex gap-4">
                    <button className="hover:bg-transparent hover:text-yellow">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button className="hover:bg-transparent hover:text-yellow">
                      <i class="fa-solid fa-pen-to-square"></i>
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
