import React from "react";
import NavbarAdmin from "../components/Navbar";
import CarAdd from "../components/CarAdd";

export default function AdminCarAdd () {
  return (
    <NavbarAdmin>
      <NavbarAdmin.SideNavbar cars={"highlight"} />
      <NavbarAdmin.MainContentContainer>
        <NavbarAdmin.MainContentHeaderNavbar
          userName={"Unis Badri"}
          initialUserName={"U"}
        />
        <NavbarAdmin.MainContent section={"CARS"} subsection1={"List Car"}>
          <CarAdd />
        </NavbarAdmin.MainContent>
      </NavbarAdmin.MainContentContainer>
    </NavbarAdmin>
  );
}
