import React from "react";

const ProfileBox = () => {
  return (
    <div className="flex w-96 h-screen absolute top-0 right-0">
      <form action="post">
        <input type="file" />
        <button>Upload</button>
      </form>
    </div>
  );
};

export default ProfileBox;
