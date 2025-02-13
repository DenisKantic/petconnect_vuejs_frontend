import Cookies from "js-cookie";
import axios from "axios";

export default async function auth() {
  const token = Cookies.get("auth_token");
  console.log("TOKEN FIRST CHECK", token);

  if (!token) {
    Cookies.remove("auth_token");
    return false; // Return false instead of redirecting
  }

  try {
    const token = Cookies.get("auth_token");
    console.log("Token from cookies:", token); // Check if the token exists
    const response = await axios.post(
      "http://localhost:8080/validate-token",
      null,
      {
        withCredentials: true, // Ensure cookies are sent
      },
    );

    if (response.status == 200) {
      console.log("DATA", response.data);
      return true; // Token is valid
    } else {
      Cookies.remove("auth_token");
      throw new Error("Token is invalid");
    }
  } catch (error) {
    console.error("Token validation error:", error);
    Cookies.remove("auth_token");
    return false;
  }
}
