"use client";
import { useRouter } from "next/navigation";
import { DemoHeader, useHeaderView } from "./DemoMuiHeader";
import Home from "@mui/icons-material/Home";
import DemoMain from "./DemoMuiMain";
import Divider from "@mui/material/Divider";

const DemoPage = () => {
  const router = useRouter();
  const headerView = useHeaderView();
  return (
    <>
      <div style={{ position: "relative" }}>
        <Home
          onClick={() => router.push("/")}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "40px",
          }}
        />
      </div>
      <DemoHeader view={headerView} />
      <Divider />
      <DemoMain headerView={headerView} />
    </>
  );
};

export default DemoPage;
