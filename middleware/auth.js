export default function auth(){
  
}

// import Cookies from "js-cookie";
// import axios from "axios";

// const BACKGROUND_VALIDATION_INTERVAL = 1000; // 5 minutes in milliseconds

// export default function auth(router) {
//   // Function to validate token and set up background validation
//   const validateTokenAndSetup = async () => {
//     const token = Cookies.get("auth_token");
//     console.log("TOKEN FIRST CHECK", token)

//     if (!token) {
//       Cookies.remove("auth_token");
//       console.log("FIRST REDIRECT")
//       router.push("/prijava"); // Redirect to login page if no token
//       return;
//     }

//     try {
//       // Make the initial validation request with credentials
//       const response = await axios.post("http://localhost:8080/validate-token", null, {
//         withCredentials: true, // Ensure cookies are sent
//       });

//       if (!response.data.valid) {
//         throw new Error("Token is invalid");
//       }

//       // Token is valid, set up background validation
//       setInterval(async () => {
//         const intervalToken = Cookies.get("auth_token");
//         if (!intervalToken) {
//           Cookies.remove("auth_token");
//           router.push("/prijava"); // Redirect to login if no token
//           return;
//         }

//         try {
//           // Validate token again without sending it in the body
//           const intervalResponse = await axios.post("http://localhost:8080/validate-token", null, {
//             withCredentials: true, // Ensure cookies are sent
//           });

//           if (!intervalResponse.data.valid) {
//             throw new Error("Token is invalid");
//           }
//         } catch (error) {
//           console.error("Background validation error:", error);
//           Cookies.remove("auth_token");
//           router.push("/prijava"); // Redirect to login page
//         }
//       }, BACKGROUND_VALIDATION_INTERVAL);

//     } catch (error) {
//       console.error("Token validation error:", error);
//       Cookies.remove("auth_token");
//       router.push("/prijava"); // Redirect to login page
//     }
//   };

//   validateTokenAndSetup(); // Call the function to validate token and set up interval
// }