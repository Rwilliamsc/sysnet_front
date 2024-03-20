import { useEffect, useState } from "react";
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Select, Option, Textarea } from "@material-tailwind/react";
import axios from "axios";

function DialogContestActivity({ isOpen, handlerOpen, user, token, setActivities, activities, activityId }) {
const [description, setDescription] =useState("")

 const handleContestActivity=()=>{

 }

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
            <div className=" flex items-center justify-between gap-3">
              <div className="w-96">
                <Typography className="" variant="h6">
                  Sua graduação
                </Typography>
                </div>
                </div>
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
              <Button variant="outlined" onClick={handlerOpen} fullWidth>
                Cancelar
              </Button>
              <Button variant="gradient" onClick={handlerCreateActivity} fullWidth>
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
