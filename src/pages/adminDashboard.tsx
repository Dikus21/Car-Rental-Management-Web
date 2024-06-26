import React, { useState } from "react";
import AdminLayouts from "../components/layouts/AdminLayouts";
import Dashboard from "../components/fragments/adminContent/Dashboard";

export default function AdminDashboard() {
  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status: boolean) => {
    setIsRefresh(status);
  };
  return (
    <AdminLayouts
      dashboard={"highlight"}
      section={"DASHBOARD"}
      subsection1={"Dashboard"}
    >
      <Dashboard setRefresh={setRefresh} isRefresh={isRefresh} />
    </AdminLayouts>
  );
}
