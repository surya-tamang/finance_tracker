import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <div className="w-full min-h-screen bg-deep_blue text-white font-roboto">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
      </div>
      {/* <LineChart />
      <BarChart />
      <PieChart /> */}
    </>
  );
}

export default App;
