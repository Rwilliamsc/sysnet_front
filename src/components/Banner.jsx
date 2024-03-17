import minhaLogo from "../img/logo.jpg";

const Banner = () => {
  return (
    <div className=" py-8 px-4 mb-4 flex justify-center items-center" style={{ backgroundColor: "#e2f8ff", height: "500px" }}>
      <img src={minhaLogo} alt="Minha Logo" className="w-96 h-96" /> {/* Ajuste o tamanho conforme necessário */}
    </div>
  );
};

export default Banner;
