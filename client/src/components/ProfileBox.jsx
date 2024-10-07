import React, { useEffect, useState } from "react";
import avatar from "../assets/user.png";
import { jwtDecode } from "jwt-decode";

const ProfileBox = ({ visibleBox }) => {
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
    try {
      const response = fetch(url, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ img: image }),
      });
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={`${
        visibleBox ? "flex" : "hidden"
      } flex-col items-center w-96 h-screen absolute top-0 right-0 bg-white py-20`}
    >
      <div className="border-4 border-light_blue bg-red w-60 h-60 rounded-full overflow-hidden">
        <img
          src={user.profile || avatar}
          alt="profile"
          className="w-full h-full object-cover"
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
