import React from "react";
import ListRocketLaunch from "../RocketLaunchDashboard/RocketLaunchDashboard";
import "./Dashboard.css";

const Dashboard: React.FC = (): JSX.Element => {
  return (
    <div className="container">
      <h1 data-testid="heading">Welcome to Moonshot Calendar Inc.</h1>
      <ListRocketLaunch></ListRocketLaunch>
    </div>
  );
};

export default Dashboard;
