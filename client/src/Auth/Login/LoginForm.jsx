import { useState } from "react";
import { userLogin } from "../../api/user.login.api";
import { Link } from "react-router-dom";

// LoginForm.jsx
const LoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userLogin({ formdata: form });
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center items-center  flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 ">
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <h1 className="text-2xl font-semibold text-center  pb-4 italic">
                  Welcome back <span className="text-green-500"> Admin!</span>
                </h1>
                <form onSubmit={handleSubmit} className="mx-auto max-w-xs">
                  <div className="">
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      value={form?.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                      placeholder="Email"
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      value={form?.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      required
                      placeholder="Password"
                    />
                    <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-">Sign In</span>
                    </button>
                    <p className="mt-5 text-center">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-green-500">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex-1 text-center h-full hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://img.freepik.com/free-vector/data-analysis-concept-illustration_114360-8023.jpg')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
