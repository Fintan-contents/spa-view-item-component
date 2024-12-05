"use client";
import { DemoHeader, useHeaderView } from "./DemoMuiHeader";
import DemoMain from "./DemoMuiMain";
import Divider from "@mui/material/Divider";

const DemoPage = () => {
  const headerView = useHeaderView();
  return (
    <>
      <DemoHeader view={headerView} />
      <Divider />
      <DemoMain headerView={headerView} />
    </>
  );
};

export default DemoPage;
