import React, { useState } from "react";
import { useSelector } from "react-redux";

const ManagePwd = ({ visibleBox, handleClick }) => {
  const userData = useSelector((state) => state.user.userInfo);
  const url = `http://localhost:8520/api/user/${userData._id}`;
  const [currentPwd, setCurrentPwd] = useState("");
  const [updatedPwd, setUpdatedPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [updated, setUpdated] = useState("");
  const handleSubmit = async (e) => {
    setErrorMsg("");
    e.preventDefault();
    if (!currentPwd || !updatedPwd || !confirmPwd) {
      setErrorMsg("All fields required");
    } else {
      if (currentPwd !== userData.password) {
        setErrorMsg("Your current password is wrong");
      } else if (updatedPwd !== confirmPwd) {
        setErrorMsg("password doesn't match");
      } else {
        try {
          const response = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ password: updatedPwd }),
          });
          const data = await response.json();
          setUpdated(data.msg);
          setTimeout(() => {
            handleClick();
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  return (
    <div
      className={`${
        visibleBox ? "flex" : "hidden"
      } flex-col gap-6 w-96 h-screen absolute top-0 right-0 bg-white`}
    >
      <div className="w-full h-10 p-2">
        <button className="hover:bg-transparent" onClick={handleClick}>
          <i className="fa-solid fa-x text-2xl text-black cursor-pointer"></i>
        </button>
      </div>
      <h1 className="text-2xl font-semibold ml-4 text-black">
        Change password
      </h1>

      <form
        action="PUT"
        onSubmit={handleSubmit}
        className="w-full justify-end rounded-none bg-white text-black"
      >
        <span className="text-red pb-5">{errorMsg}</span>
        <span className="text-green pb-5">{updated}</span>
        <input
          type="password"
          value={currentPwd}
          onChange={(e) => setCurrentPwd(e.target.value)}
          placeholder="current password"
        />
        <input
          type="password"
          value={updatedPwd}
          onChange={(e) => setUpdatedPwd(e.target.value)}
          placeholder="new password"
        />
        <input
          type="password"
          value={confirmPwd}
          onChange={(e) => setConfirmPwd(e.target.value)}
          placeholder="confirm password"
        />
        <button>Change password</button>
      </form>
    </div>
  );
};

export default ManagePwd;
