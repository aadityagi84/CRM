import axios from "axios";
import { toast } from "react-hot-toast";
import { apiData } from "../utils/Api";

export const userLogin = async ({ formdata }) => {
  try {
    const rs = await axios.post(apiData.login, formdata);
    if (rs.data.success === true) {
      toast.success("Login successful!");
    }
    return rs.data;
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.data?.errors?.[0]?.msg ||
      error.response?.data?.message ||
      "An error occurred during login.";
    toast.error(errorMessage);
    return {
      success: false,
      error: errorMessage,
      status: error.response?.status || 500,
    };
  }
};

export const userRegister = async ({ formdata }) => {
  try {
    const rs = await axios.post(apiData.register, formdata);
    console.log(rs);
    return rs.data;
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.data?.errors?.[0]?.msg ||
      error.response?.data?.message ||
      "An error occurred during registration.";
    toast.error(errorMessage);
  }
};
