import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Overview from "./pages/Overview.jsx";
import Revenue from "./pages/Revenue.jsx";
import Expense from "./pages/Expense.jsx";
import SetBudget from "./pages/SetBudget.jsx";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/slices/userSlice";
import { fetchUserExpense } from "./redux/slices/userExpenses";
import { fetchUserRevenue } from "./redux/slices/userRevenues";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Adminlogin from "./pages/Adminlogin.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      const userid = decoded.id;
      const url = `http://localhost:8520/api/user/${userid}`;
      const url1 = `http://localhost:8520/api/user/expenses/${userid}`;
      const url2 = `http://localhost:8520/api/user/revenues/${userid}`;
      dispatch(fetchUser(url));
      dispatch(fetchUserExpense(url1));
      dispatch(fetchUserRevenue(url2));
    }
  }, [dispatch]);

  return (
    <>
      <div className="w-full min-h-screen bg-deep_blue text-white font-roboto">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<Adminlogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/setBudget" element={<SetBudget />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
