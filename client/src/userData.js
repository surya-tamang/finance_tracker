import { jwtDecode } from "jwt-decode";
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

let userData = {};
if (accessToken || refreshToken) {
  userData = jwtDecode(accessToken);
}

export default userData;
