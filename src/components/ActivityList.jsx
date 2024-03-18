import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowPathIcon, DocumentTextIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, CardHeader, Chip, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import DialogCreateActivity from "./DialogCreateActivity";

const TABLE_HEAD = ["Descrição", "Data", "Horas/Req", "Status", " "];

const ActivityList = ({ user, token }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isDialogFree, setIsDialogFree] = useState(false);

  const handleOpenDialog = () => setOpen(!open);

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

    const opt = {
      headers: {
        accept: "application / json",
        authorization: `Bearer ${token}`,
      },
    };

    const fetchConfigs = async () => {
      const reqActivityType = axios.get(`http://localhost:3000/activity-type`, opt);
      const reqEvidenceType = axios.get(`http://localhost:3000/evidence-type`, opt);
      const reqQuarter = axios.get(`http://localhost:3000/quarter`, opt);
      const reqGraduation = axios.get(`http://localhost:3000/graduation`, opt);

      try {
        const [reponseActivityType, responseEvidenceType, responseQuarter, responseGraduation] = await Promise.all([
          reqActivityType,
          reqEvidenceType,
          reqQuarter,
          reqGraduation,
        ]);

        const configurations = {
          activityTypes: reponseActivityType.data,
          evidenceTypes: responseEvidenceType.data,
          quarters: responseQuarter.data,
          graduations: responseGraduation.data,
        };
        localStorage.setItem("configs", JSON.stringify(configurations));
      } catch (error) {
        console.error("Erro ao buscar configurações:", error);
      } finally {
        setIsDialogFree(true);
      }
    };
    fetchConfigs();

    fetchActivities();
  }, [token, user.id]);

  const handlerDate = (date) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    return `${dateObj.toLocaleDateString()} ${hours}:${minutes}`;
  };

  return (
    <div>
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
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Typography variant="h6" color="blue-gray">
                Total de Horas: 40
              </Typography>
              <Typography variant="h6" color="blue-gray">
                Horas Aprovadas: 40
              </Typography>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3" size="sm" color="blue" onClick={handleOpenDialog}>
              Adicionar
            </Button>
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
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activities.map(({ description, activityDate, activityHours, status }, index) => (
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
                          value={status}
                          color={status === "approved" ? "green" : status === "pending" ? "amber" : "red"}
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <Tooltip content="Contestar">
                        <IconButton variant="text" hidden={status !== "reject"}>
                          <DocumentTextIcon className="h-4 w-4" color="red" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Editar">
                        <IconButton variant="text" hidden={status !== "pending"}>
                          <PencilIcon className="h-4 w-4" color="green" />
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
      {isDialogFree ? <DialogCreateActivity isOpen={open} handlerOpen={handleOpenDialog} user={user} token={token} /> : null}
    </div>
  );
};

export default ActivityList;
