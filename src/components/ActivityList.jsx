import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowPathIcon, PencilSquareIcon } from "@heroicons/react/24/solid"; // Ícone de carregamento
import { useAuth } from "../context/AuthContext";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, token } = useAuth();

  useEffect(() => {
    const fetchActivities = async () => {
      const options = {
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(`http://localhost:3000/activities/byuser/${user.id}`, options);
        setActivities(response.data);
      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handlerDate = (date) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    return `${dateObj.toLocaleDateString()} ${hours}:${minutes}`;
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Lista de Atividades</h2>

      {loading ? (
        <div className="flex items-center justify-center">
          <ArrowPathIcon className="animate-spin h-10 w-10 text-blue-500" />
        </div>
      ) : (
        <table className="border-collapse border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-600">ID</th>
              <th className="border border-slate-600">Descrição</th>
              <th className="border border-slate-600">Data</th>
              <th className="border border-slate-600">Horas/Req</th>
              <th className="border border-slate-600">Status</th>
              <th className="border border-slate-600">Aprovado</th>
              <th className="border border-slate-600">Ações</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td className="border border border-slate-700">{activity.id}</td>
                <td className="border border border-slate-700">{activity.description}</td>
                <td className="border border border-slate-700">{handlerDate(activity.activityDate)}</td>
                <td className="border border border-slate-700">{activity.activityHours}</td>
                <td className="border border border-slate-700">{activity.status}</td>
                <td className="border border border-slate-700">{activity.approved ? "SIM" : "Não"}</td>
                <td className="border border border-slate-700">
                  <PencilSquareIcon className="h-1 w-1 text-blue-500 mr-2" />

                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">Editar</button>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Detalhes</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActivityList;
