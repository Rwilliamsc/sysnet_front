import { useEffect, useState } from "react";
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Textarea } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";

function DialogContestActivity({ isOpen, handlerOpen, token, setActivities, activities, activityId }) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(activities.find((activity) => activity.id === activityId)?.contestation || "");
  }, [activityId, activities]);

  const handleContestActivity = async () => {
    const data = {
      status: "contested",
      contestation: description,
      contested: true,
    };
    const options = {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.patch(`http://localhost:3000/activities/${activityId}`, data, options);
      const newActivity = {
        ...activities.find((activity) => activity.id === activityId),
        status: "contested",
        contestation: description,
      };
      setActivities(activities.map((activity) => (activity.id === activityId ? newActivity : activity)));
      toast.success("Atividade contestada com sucesso!");
      handlerOpen();
    } catch (error) {
      toast.error(error.response?.data?.message?.toString() || "Erro ao contestar atividade");
      console.error("Error ao contestar atividade:", error);
    }
  };

  return (
    <>
      <Dialog size="xl" open={isOpen} handler={handlerOpen} className="bg-transparent shadow-none">
        <Card className="mx-auto max-w-[50rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Revisão de atividade
            </Typography>
            <Typography className="mb-3 font-normal" variant="paragraph" color="gray">
              Descreva o assunto da contestação.
            </Typography>
            <div className=" flex items-center justify-between gap-3"></div>
            <Textarea
              placeholder="Descrição da revisão"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <div className=" flex items-center justify-between gap-3">
              <Button variant="outlined" color="blue" onClick={handlerOpen} fullWidth>
                Cancelar
              </Button>
              <Button variant="gradient" onClick={handleContestActivity} fullWidth>
                Enviar
              </Button>
            </div>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}

export default DialogContestActivity;
