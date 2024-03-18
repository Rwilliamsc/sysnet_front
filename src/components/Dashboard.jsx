import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ActivityList from "./ActivityList";
import Banner from "./Banner";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [activityTypes, setActivityTypes] = useState([]);
  const [evidenceTypes, setEvidenceTypes] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [graduations, setGraduations] = useState([]);

  useEffect(() => {
    const opt = {
      headers: {
        accept: "application / json",
        authorization: `Bearer $ {token}`,
      },
    };

    const fetchConfigs = async () => {
      const reqActivityType = axios.get(`http://localhost:3000/activity-type`, opt);
      const reqEvidenceType = axios.get(`http://localhost:3000/evidence-type`, opt);
      const reqQuarter = axios.get(`http://localhost:3000/quarter`, opt);
      const reqGraduation = axios.get(`http://localhost:3000/graduation`, opt);

      try {
        const [reponseActivityType, responseEvidenceType, responseQuarter, responseGraduation] = await axios.all([
          reqActivityType,
          reqEvidenceType,
          reqQuarter,
          reqGraduation,
        ]);

        setActivityTypes(reponseActivityType.data);
        setEvidenceTypes(responseEvidenceType.data);
        setQuarters(responseQuarter.data);
        setGraduations(responseGraduation.data);
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      }
    };

    if (!token) {
      console.log("Não autenticado, redirecionando para /Login");

      navigate("/Login");
    }

    fetchConfigs();
  }, [token, navigate]);

  return (
    <div>
      {token ? (
        <div>
          <Banner />
          <div className="flex justify-center ">
            <ActivityList user={user} token={token} configs={{ activityTypes, evidenceTypes, quarters, graduations }} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
