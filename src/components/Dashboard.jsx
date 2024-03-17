import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ActivityList from "./ActivityList";
import Banner from "./Banner";

const Dashboard = () => {
  const { token } = useAuth();

  const navigate = useNavigate();

  if (!token) {
    navigate("/Login");
  }

  return (
    <div>
      <Banner />
      <div className="flex justify-center ">
        <ActivityList />
      </div>
    </div>
  );
};

export default Dashboard;
