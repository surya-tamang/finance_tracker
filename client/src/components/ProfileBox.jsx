import React from "react";
import UpdateProfilePic from "./UpdateProfilePic";
import UpdateDetail from "./UpdateDetail";

const ProfileBox = ({ visibleBox, handleClick }) => {
  return (
    <div
      className={`${
        visibleBox ? "flex" : "hidden"
      } flex-col items-center gap-6 w-96 h-screen absolute top-0 right-0 bg-white`}
    >
      <div className="w-full h-10 p-2">
        <button className="hover:bg-transparent" onClick={handleClick}>
          <i className="fa-solid fa-x text-2xl text-black cursor-pointer"></i>
        </button>
      </div>
      <UpdateProfilePic handleClick={handleClick} />
      <UpdateDetail />
    </div>
  );
};

export default ProfileBox;
