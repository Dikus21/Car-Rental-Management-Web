import React, { useState } from "react";
import AdminLayouts from "../components/layouts/AdminLayouts";
import CarLists from '../components/fragments/adminContent/carListCard/CarLists';


const AdminCar = () => {
  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status: boolean) => {
    setIsRefresh(status);
  };

  return (
    <AdminLayouts
      cars={"highlight"}
      section={"CARS"}
      subsection1={"List Car"}
    >
      <CarLists setRefresh={setRefresh} isRefresh={isRefresh} />
    </AdminLayouts>
  );
};

export default AdminCar;
