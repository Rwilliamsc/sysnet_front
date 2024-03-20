import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowPathIcon, CheckIcon, NoSymbolIcon } from "@heroicons/react/24/solid";
import { Card, CardBody, CardHeader, Chip, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";

const TABLE_HEAD = ["Descrição", "Data", "Horas/Req", "Status", "Evidência", " "];

const ActivityListAdmin = ({ user, token }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const fetchActivities = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/activities/${user.role === "admin" ? "pending" : "contested"}`, options);
        setActivities(response.data);
      } catch (error) {
        console.error("Error ao fetch activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [token, user.role]);

  const handlerDate = (date) => {
    return date.split("T")[0].split("-").reverse().join("/");
  };
  const handleReject = async (id) => {
    const data = {
      status: "rejected",
    };
    const options = {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.patch(`http://localhost:3000/activities/${id}`, data, options);
      const newActivity = {
        ...activities.find((activity) => activity.id === id),
        ...data,
      };
      setActivities(activities.map((activity) => (activity.id === id ? newActivity : activity)));
      toast.warn("Atividade rejeitada com sucesso!");
    } catch (error) {
      toast.error("Erro ao rejeitar atividade");
      console.error("Error ao rejeitar atividade:", error);
    }
  };

  const handleApprove = async (id) => {
    const data = {
      status: "approved",
      approved: true,
    };
    const options = {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.patch(`http://localhost:3000/activities/${id}`, data, options);
      const newActivity = {
        ...activities.find((activity) => activity.id === id),
        ...data,
      };
      setActivities(activities.map((activity) => (activity.id === id ? newActivity : activity)));
      toast.success("Atividade aprovada com sucesso!");
    } catch (error) {
      toast.error("Erro ao aprovar atividade");
      console.error("Error ao approve activity:", error);
    }
  };

  return (
    <div className="w-1/2">
      <Card className="h-full w-full overflow-scroll">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                {user.name}
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                {user.email}
              </Typography>
            </div>
            <div className="text-right">
              <Typography variant="h6" color="blue-gray">
                Atividades Pendentes: {activities.length}
              </Typography>
            </div>
          </div>
        </CardHeader>
        {loading ? (
          <div className="flex items-center justify-center">
            <ArrowPathIcon className="animate-spin h-10 w-10 text-blue-500" />
          </div>
        ) : (
          <CardBody className="overflow-scroll mt-2 ">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70 text-center">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activities.map(({ description, activityDate, activityHours, urlEvidence, status, id }, index) => (
                  <tr key={`activities-${index}`} className="even:bg-blue-gray-50/50">
                    <td className="p-4 text-center">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {description}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {handlerDate(activityDate)}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {activityHours}
                      </Typography>
                    </td>
                    <td className="p-4 text-center">
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={
                            status === "approved"
                              ? "Aprovado"
                              : status === "pending"
                              ? "Pendente"
                              : status === "rejected"
                              ? "Rejeitado"
                              : "Contestado"
                          }
                          color={status === "approved" ? "green" : status === "pending" || status === "contested" ? "amber" : "red"}
                        />
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {urlEvidence}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Tooltip content="Rejeitar">
                        <IconButton variant="text" onClick={() => handleReject(id)} hidden={status === "rejected" || status === "approved"}>
                          <NoSymbolIcon className="h-4 w-4" color="red" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Aprovar">
                        <IconButton variant="text" onClick={() => handleApprove(id)} hidden={status === "rejected" || status === "approved"}>
                          <CheckIcon className="h-4 w-4" color="green" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        )}
      </Card>
    </div>
  );
};

export default ActivityListAdmin;
