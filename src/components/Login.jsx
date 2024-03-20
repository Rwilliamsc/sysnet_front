import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Banner from "./Banner";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";

const Login = ({ addToken, addUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handlerLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", { email, password });
      localStorage.setItem("token", response.data.access_token);
      addToken(response.data.access_token);

      const decoded = jwtDecode(response.data.access_token);

      const user = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
      };
      addUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login efetuado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message?.toString() || "Erro ao tentar logar");
    }
  };

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

            <Button type="submit" color="blue" className="mt-6" fullWidth>
              Logar
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Não tenho uma conta{" "}
              <Link to="/signup" className="text-blue-500">
                Cadastrar
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
