import { useState } from "react";
import NavbarAdmin from "../components/Navbar";
import CarLists from "../components/CarLists";

export default function AdminCar () {
  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status) => {
    setIsRefresh(status);
  };

  return (
    <NavbarAdmin>
      <NavbarAdmin.SideNavbar cars={"highlight"} />
      <NavbarAdmin.MainContentContainer>
        <NavbarAdmin.MainContentHeaderNavbar
          userName={"Unis Badri"}
          initialUserName={"U"}
        />
        <NavbarAdmin.MainContent section={"CARS"} subsection1={"List Car"}>
          <CarLists setRefresh={setRefresh} isRefresh={isRefresh} />
        </NavbarAdmin.MainContent>
      </NavbarAdmin.MainContentContainer>
    </NavbarAdmin>
  );
}
