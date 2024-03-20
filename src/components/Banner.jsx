import minhaLogo from "../img/logo.jpg";
import { useLocation } from "react-router-dom";

const Banner = () => {
  const locationRouter = useLocation();

  const handlerLogout = () => {
    localStorage.clear();
    location.reload();
  };
  return (
    <div className=" py-8 px-4 mb-4 flex justify-center items-center" style={{ backgroundColor: "#e2f8ff", height: "400px" }}>
      <img src={minhaLogo} alt="Minha Logo" className="w-72 h-72" />
      {locationRouter.pathname !== "/login" && locationRouter.pathname !== "/Login" && locationRouter.pathname !== "/signup" ? (
        <button className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg items-center flex gap-3" onClick={handlerLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"></path>
          </svg>
          Sair
        </button>
      ) : null}
    </div>
  );
};

export default Banner;
