import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ActivityList from "./ActivityList";
import Banner from "./Banner";
import { useEffect } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  useEffect(() => {
    if (!token) {
      navigate("/Login");
    }
  }, [token, navigate]);

  return (
    <div>
      {token ? (
        <div>
          <Banner />
          <div className="flex justify-center ">
            <ActivityList user={user} token={token} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Dashboard;
