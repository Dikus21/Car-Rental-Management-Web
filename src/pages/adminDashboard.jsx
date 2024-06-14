import React, {useState} from "react";
import NavbarAdmin from "../components/Navbar";
import Dashboard from "../components/Dashboard";

export default function AdminDashboard() {
  const [isRefresh, setIsRefresh] = useState(true);

  const setRefresh = (status) => {
    setIsRefresh(status);
  };
  return (
    <NavbarAdmin>
      <NavbarAdmin.SideNavbar dashboard={"highlight"} />
      <NavbarAdmin.MainContentContainer>
        <NavbarAdmin.MainContentHeaderNavbar
          userName={"Unis Badri"}
          initialUserName={"U"}
        />
        <NavbarAdmin.MainContent
          section={"DASHBOARD"}
          subsection1={"Dashboard"}
        >
          <Dashboard setRefresh={setRefresh} isRefresh={isRefresh} />
        </NavbarAdmin.MainContent>
      </NavbarAdmin.MainContentContainer>
    </NavbarAdmin>
  );
}
