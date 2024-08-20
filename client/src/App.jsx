import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Overview from "./pages/Overview";
import Revenue from "./pages/Revenue";
import Expense from "./pages/Expense";

function App() {
  return (
    <>
      <div className="w-full min-h-screen bg-deep_blue text-white font-roboto">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
