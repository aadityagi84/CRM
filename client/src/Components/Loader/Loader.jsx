import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const Loader = () => {
  return (
    <div>
      <div className="relative h-screen flex items-center justify-center animate-gradient">
        <div className="absolute w-[350px] h-[350px] rounded-full bg-blue-100/10 opacity-30 motion-safe:animate-spin"></div>
        <div className="">
          <img src={logo} alt="Loading..." className="w-32 h-32 mx-auto " />
          <div className="mt-6">
            <NavLink to="/login">
              <button className=" bg-white rounded-full transition-all duration-700 hover:bg-yellow-400   px-10 py-2  text-[20px] font-semibold animate-bounce">
                Get Start
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
