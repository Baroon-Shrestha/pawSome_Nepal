import React from "react";
import DashboardNav from "../../dashboardComponents/dashboardNav/dashboardNav";
import useAuth from "../../../hooks/useAuth";
export default function ManageUsers() {
  useAuth();
  return (
    <>
      <DashboardNav />
    </>
  );
}
