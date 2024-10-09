import React, { useEffect, useState } from "react";
import avatar from "../assets/user.png";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const ProfileBox = ({ visibleBox, handleClick }) => {
  const userData = useSelector((state) => state.user.userInfo);
  const [image, setImage] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      setUser(decoded);
    }
  }, []);

  const url = `http://localhost:8520/api/user/${user.id}`;

  const handleChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertIntoBase64(file);
    setImage(base64);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      console.log("Please upload an image");
    } else {
      try {
        await fetch(url, {
          method: `${user.profile ? "PATCH" : "POST"}`,
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ img: image }),
        });
        handleClick();
      } catch (err) {
        console.log(err);
      }
    }
  };
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
      <div className="w-full h-60 flex justify-center">
        <img
          src={image || userData.profile || avatar}
          alt="profile"
          className="w-60 h-full object-cover rounded-full border-2 border-light_blue"
        />
      </div>
      <form
        action="PATCH"
        onSubmit={handleSubmit}
        className="bg-white flex w-full"
      >
        <input
          type="file"
          accept=".jpeg, .jpg, .png"
          className="border-2 w-full text-black"
          onChange={handleChange}
        />
        <button className="w-full text-black">Upload</button>
      </form>
    </div>
  );
};

export default ProfileBox;

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
