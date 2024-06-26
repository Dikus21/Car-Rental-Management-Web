import React from "react";
import UserLayouts from "../components/layouts/UserLayouts";
import HomeContent from "../components/fragments/userContent/HomeContent";

export default function Home() {
  return (
    <UserLayouts>
      <HomeContent />
    </UserLayouts>
  );
}
