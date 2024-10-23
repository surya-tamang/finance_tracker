import React, { useState } from "react";
import { useSelector } from "react-redux";

const UpdateDetail = () => {
  const userData = useSelector((state) => state.user.userInfo);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const url = `http://localhost:8520/api/user/${userData._id}`;
  const [updatedInfo, setUpdatedInfo] = useState({
    firstName: "",
    lastName: "",
    currentBudget: "",
  });

  const handleFormChange = (e) => {
    setErrorMsg("");
    setSuccessMsg("");
    const { name, value } = e.target;
    setUpdatedInfo({ ...updatedInfo, [name]: value });
  };

  const handleDetailSubmit = async (e) => {
    e.preventDefault();
    if (!updatedInfo.firstName || !updatedInfo.lastName) {
      console.log("No changed");
    } else {
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedInfo),
        });
        const data = await response.json();
        setSuccessMsg(data.msg);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        console.log(err);
        setErrorMsg(err);
      }
    }
  };
  return (
    <form
      action="PUT"
      onSubmit={handleDetailSubmit}
      className="bg-white w-full"
    >
      <input
        type="text"
        name="firstName"
        onChange={handleFormChange}
        value={updatedInfo.firstName}
        placeholder="first name"
        className="text-black"
      />
      <input
        type="text"
        name="lastName"
        onChange={handleFormChange}
        value={updatedInfo.lastName}
        placeholder="last name"
        className="text-black"
      />
      <input
        type="text"
        name="currentBudget"
        onChange={handleFormChange}
        value={updatedInfo.currentBudget}
        placeholder="current budget"
        className="text-black"
      />
      <span className="text-red">{errorMsg}</span>
      <span className="text-green">{successMsg}</span>
      <button className="text-black">Update</button>
    </form>
  );
};

export default UpdateDetail;
