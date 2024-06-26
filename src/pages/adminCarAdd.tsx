import React from "react";
import AdminLayouts from "../components/layouts/AdminLayouts";
import CarAdd from "../components/fragments/adminContent/CarAdd";

export default function AdminCarAdd() {
  return (
    <AdminLayouts
      cars={"highlight"}
      section={"CARS"}
      subsection1={"List Car"}
    >
      <CarAdd />
    </AdminLayouts>
  );
}
