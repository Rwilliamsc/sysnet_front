import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Banner from "./Banner";
import { Card, Input, Button, Typography, Select, Option } from "@material-tailwind/react";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const { token } = useAuth();

  const roles = ["Estudante", "Administrativo", "Coordenador"];

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handlerSignUp = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email,
        password,
        documentNumber,
        name,
        role: role === "Estudante" ? "student" : role === "Administrativo" ? "admin" : "coordinator",
      };
      await axios.post("http://localhost:3000/signup", data);

      toast.success("Cadastro efetuado com sucesso!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message?.toString() || "Erro ao fazer cadastro:");
      console.error("Erro ao fazer cadastro:", error);
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
            Legal encontarar você! Realize o seu cadastro.
          </Typography>

          <form className="mt-8 mb-2 ml-3 mr-3 w-80 max-w-screen-lg sm:w-96" onSubmit={handlerSignUp}>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Nome
              </Typography>
              <Input
                size="lg"
                type="text"
                placeholder="Seu nome"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                CPF
              </Typography>
              <Input
                size="lg"
                type="text"
                placeholder="___.___.___-__"
                maxLength={14}
                required
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setDocumentNumber(e.target.value)}
                value={documentNumber}
              />
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
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Role
              </Typography>
              <Select
                placeholder="Função"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={role}
                menuProps={{ className: "h-48" }}
                onChange={(e) => setRole(e)}
              >
                {roles.map((name, index) => (
                  <Option key={`graduations-${index}`} value={name}>
                    <div className="flex items-center gap-x-2">{name}</div>
                  </Option>
                ))}
              </Select>
            </div>

            <Button type="submit" color="blue" className="mt-6" fullWidth>
              Cadastrar
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
