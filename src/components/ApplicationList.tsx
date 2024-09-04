import React from "react";
import { ApplicationListProps } from "../modals";

export const ApplicationList: React.FC<ApplicationListProps> = ({ data }) => {
  return (
    <div className="application-list">
      {data.map((app) => (
        <div key={app.name} className="application-item">
          <div className="mb-1">{app.name}</div>
          <div>Total Spend: ${app.spend}</div>
        </div>
      ))}
    </div>
  );
};
