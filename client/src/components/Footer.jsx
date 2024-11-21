import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="w-full h-20 bg-light_blue flex justify-center items-center">
      <p>&#169;{year} Finance tracker , All rights reserved</p>
    </div>
  );
};

export default Footer;
