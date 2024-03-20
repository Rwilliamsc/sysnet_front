import { useEffect, useState } from "react";
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Select, Option } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";

function DialogEditActivity({ isOpen, handlerOpen, user, token, setActivities, activities, activityId }) {
  const [graduation, setGraduation] = useState("");
  const [quarter, setQuarter] = useState("");
  const [activityType, setActivityType] = useState("");
  const [evidenceType, setEvidenceType] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [hours, setHours] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const [activityTypes, setActivityTypes] = useState([]);
  const [evidenceTypes, setEvidenceTypes] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [graduations, setGraduations] = useState([]);

  const [activity, setActivity] = useState({});

  useEffect(() => {
    let configs = JSON.parse(localStorage.getItem("configs"));
    if (configs) {
      setActivityTypes(configs.activityTypes);
      setEvidenceTypes(configs.evidenceTypes);
      setQuarters(configs.quarters);
      setGraduations(configs.graduations);
    }

    const act = activities.find((it) => it.id === activityId);

    if (act) {
      setGraduation(configs.graduations.find((it) => it.id === act.graduationId).name);
      setQuarter(configs.quarters.find((it) => it.id === act.quarterId).name);
      setActivityType(configs.activityTypes.find((it) => it.id === act.activityTypeId).name);
      setEvidenceType(configs.evidenceTypes.find((it) => it.id === act.evidenceTypeId).name);
      setActivityDate(act.activityDate.substring(0, 10));
      setHours(act.activityHours);
      setLink(act.urlEvidence);
      setDescription(act.description);
      setActivity(act);
    }
  }, [activities, activityId]);

  const handlerEditActivity = async () => {
    const data = {
      activityDate: new Date(activityDate),
      activityHours: parseInt(hours),
      description: description,
      urlEvidence: link,
      approved: false,
      status: "pending",
      graduationId: graduations.find((it) => it.name === graduation).id,
      quarterId: quarters.find((it) => it.name === quarter).id,
      activityTypeId: activityTypes.find((it) => it.name === activityType).id,
      evidenceTypeId: evidenceTypes.find((it) => it.name === evidenceType).id,
      userId: user.id,
    };
    const options = {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.patch(`http://localhost:3000/activities/${activityId}`, data, options);

      setGraduation("");
      setQuarter("");
      setActivityType("");
      setEvidenceType("");
      setActivityDate("");
      setHours("");
      setLink("");
      setDescription("");

      const list = [...activities];
      const index = list.findIndex((it) => it.id === activityId);
      list[index] = response.data;
      setActivities(list);

      handlerOpen();
    } catch (error) {
      toast.error(error.response?.data?.message?.toString() || "Erro ao editar atividade:");
    }
  };

  return (
    <>
      {activity ? (
        <Dialog size="xl" open={isOpen} handler={handlerOpen} className="bg-transparent shadow-none">
          <Card className="mx-auto max-w-[50rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Adicionar nova atividade
              </Typography>
              <Typography className="mb-3 font-normal" variant="paragraph" color="gray">
                Enter your email and password to Sign In.
              </Typography>
              <div className=" flex items-center justify-between gap-3">
                <div className="w-96">
                  <Typography className="" variant="h6">
                    Sua graduação
                  </Typography>
                  <Select
                    placeholder="Escolher Graduação"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    value={graduation}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    menuProps={{ className: "h-48" }}
                    onChange={(e) => setGraduation(e)}
                  >
                    {graduations.map(({ name }, index) => (
                      <Option key={`graduations-${index}`} value={name}>
                        <div className="flex items-center gap-x-2">{name}</div>
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="w-96">
                  <Typography variant="h6">
                    Em qual trimestre você iniciou sua graduação? <span color="red">*</span>
                  </Typography>
                  <Select
                    placeholder="Escolher Trimestre"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                    value={quarter}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    menuProps={{ className: "h-48" }}
                    onChange={(e) => setQuarter(e)}
                  >
                    {quarters.map(({ name }, index) => (
                      <Option key={`quarters-${index}`} value={name}>
                        <div className="flex items-center gap-x-2">{name}</div>
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className=" flex items-center justify-between gap-3">
                <div className="w-96">
                  <Typography variant="h6">
                    Tipo de Atividade <span color="red">*</span>
                  </Typography>
                  <Select
                    placeholder="Escolher Tipo de Atividade"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    value={activityType}
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    menuProps={{ className: "h-48" }}
                    onChange={(e) => setActivityType(e)}
                  >
                    {activityTypes.map(({ name }, index) => (
                      <Option key={`activityTypes-${index}`} value={name}>
                        <div className="flex items-center gap-x-2">{name}</div>
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="w-96">
                  <Typography variant="h6">
                    Qual foi o dia da atividade? <span color="red">*</span>
                  </Typography>
                  <Input
                    maxLength={10}
                    type="date"
                    value={activityDate}
                    onChange={(e) => setActivityDate(e.target.value)}
                    containerProps={{ className: "min-w-[72px]" }}
                    placeholder="00/00/0000"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                      value: activityDate,
                    }}
                  />
                </div>
              </div>

              <Typography className="-mb-2" variant="h6">
                Qual o tipo de comprovação utilizado? <span color="red">*</span>
              </Typography>

              <Select
                placeholder="Escolher Tipo de Comprovação"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                value={evidenceType}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                menuProps={{ className: "h-48" }}
                onChange={(e) => setEvidenceType(e)}
              >
                {evidenceTypes.map(({ name }, index) => (
                  <Option key={`evidenceTypes-${index}`} value={name}>
                    <div className="flex items-center gap-x-2">{name}</div>
                  </Option>
                ))}
              </Select>

              <Typography className="-mb-2" variant="h6">
                Quantas horas você está solicitando para esta atividade?<span color="red">*</span>
              </Typography>
              <Input
                type="text"
                placeholder="Descrição da atividade"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setHours(e.target.value)}
                value={hours}
              />

              <Typography className="-mb-2" variant="h6">
                Como essa atividade se relaciona com a sua graduação?
              </Typography>
              <Input
                type="text"
                placeholder="Descrição da atividade"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />

              <Typography className="-mb-2" variant="h6">
                Adicione o link do seu comprovante
              </Typography>
              <Input
                type="text"
                placeholder="Descrição da atividade"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setLink(e.target.value)}
                value={link}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <div className=" flex items-center justify-between gap-3">
                <Button variant="outlined" color="blue" onClick={handlerOpen} fullWidth>
                  Cancelar
                </Button>
                <Button variant="gradient" color="blue" onClick={handlerEditActivity} fullWidth>
                  Enviar
                </Button>
              </div>
            </CardFooter>
          </Card>
        </Dialog>
      ) : null}
    </>
  );
}

export default DialogEditActivity;
