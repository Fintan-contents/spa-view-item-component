"use client";
import { useEffect, useState } from "react";
import { DemoHeader, useHeaderView } from "./DemoMuiHeader";
import DemoMain from "./DemoMuiMain";
import Divider from "@mui/material/Divider";

const DemoPage = () => {
  const headerView = useHeaderView();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <DemoHeader view={headerView} />
      <Divider />
      <DemoMain headerView={headerView} />
    </>
  );
};

export default DemoPage;
