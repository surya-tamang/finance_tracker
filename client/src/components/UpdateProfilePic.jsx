import React, { useState } from "react";
import avatar from "../assets/user.png";
import { useSelector } from "react-redux";

const UpdateProfilePic = ({ handleClick }) => {
  const userData = useSelector((state) => state.user.userInfo);
  const [successMsg, setSuccessMsg] = useState("");
  const url = `http://localhost:8520/api/user/${userData._id}`;
  const [image, setImage] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertIntoBase64(file);
      setImage(base64);
      handleImageSubmit(base64);
    }
  };
  const handleImageSubmit = async (image) => {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ profile: image }),
      });

      const data = await response.json();
      setSuccessMsg(data.msg);
    } catch (err) {
      console.log("Error occurred: ", err);
    }
  };
  return (
    <form
      action="PUT"
      className="flex w-full justify-center items-end bg-white relative"
    >
      <div className="w-32 h-32 relative rounded-full overflow-hidden ">
        <img
          src={image || userData.profile || avatar}
          alt="profile"
          className="absolute w-full h-full object-cover rounded-full border-2 border-light_blue"
        />
        <input
          type="file"
          accept=".jpeg, .jpg, .png"
          className="border-2 w-full h-full absolute opacity-0 cursor-pointer"
          onChange={handleImageChange}
        />
      </div>
      <span className="underline text-black pb-4 text-xs cursor-pointer">
        edit
      </span>
      <span className="absolute -top-2 text-green">{successMsg}</span>
    </form>
  );
};

export default UpdateProfilePic;

const convertIntoBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
