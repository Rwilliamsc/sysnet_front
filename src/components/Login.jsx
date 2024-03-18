import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Banner from "./Banner";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useAuth();

  const navigate = useNavigate();

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", { email, password });
      localStorage.setItem("token", response.data.access_token);

      const decoded = jwtDecode(response.data.access_token);

      const user = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
      };

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  // Redireciona se já estiver autenticado
  if (token) {
    navigate("/dashboard");
  }

  return (
    <div>
      <Banner />
      <div className="flex justify-center items-center flex-col ">
        <Card className="flex justify-center items-center mt-4" color="transparent" shadow={true}>
          <Typography variant="h4" color="blue-gray">
            SystNet
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Legal encontarar você! Entre com seu email e senha.
          </Typography>

          <form className="mt-8 mb-2 ml-3 mr-3 w-80 max-w-screen-lg sm:w-96" onSubmit={handlerLogin}>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input
                size="lg"
                type="email"
                placeholder="name@mail.com"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="mt-6" fullWidth>
              Logar
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Não tenho uma conta{" "}
              <a href="#" className="font-medium text-gray-900">
                Cadastrar
              </a>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
