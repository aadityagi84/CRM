import axios from "axios";
import { toast } from "react-hot-toast";
import { apiData } from "../utils/Api";

export const userLogin = async ({ formdata }) => {
  try {
    const rs = await axios.post(apiData.login, formdata);
    console.log(rs.data);
    if (rs.data?.success) {
      localStorage.setItem("user", JSON.stringify(rs.data.user));
      localStorage.setItem("token", rs.data.token);
      window.location.href = "/"; // Redirect to home page after successful login
      toast.success("Login successful!");
    }
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.data?.errors?.[0]?.msg ||
      error.response?.data?.message ||
      "An error occurred during login.";
    toast.error(errorMessage);
    // console.log(error.response.data.errors?.[0]?.msg);

    // toast.error(error);
  }
};

export const userRegister = async ({ formdata }) => {
  try {
    const rs = await axios.post(apiData.register, formdata);
    console.log(rs);
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.data?.errors?.[0]?.msg ||
      error.response?.data?.message ||
      "An error occurred during registration.";
    toast.error(errorMessage);
  }
};
