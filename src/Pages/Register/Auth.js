import React from "react";
import { Outlet } from "react-router-dom";
import { Progress } from "../../components/Progress/Progress";

export const AuthPage = () => {
  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
      <Outlet />
    </div>
  );
};
