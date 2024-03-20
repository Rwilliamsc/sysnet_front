import { useState } from "react";
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Textarea } from "@material-tailwind/react";
import axios from "axios";

function DialogContestActivity({ isOpen, handlerOpen, token, setActivities, activities, activityId }) {
  const [description, setDescription] = useState("");

  const handleContestActivity = async () => {
    const data = {
      ...activities.find((it) => it.id === activityId),
      status: "contested",
      contestation: description,
    };
    const options = {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.patch(`https://api.escolalms.com/api/v1/activities/${activityId}`, data, options);
    setActivities(activities.map((activity) => (activity.id === activityId ? response.data.data : activity)));
    handlerOpen();
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
