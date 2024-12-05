"use client";

import { Divider } from "antd";
import { useEffect, useState } from "react";
import { DemoHeader, useHeaderView } from "./DemoAntdHeader";
import DemoMain from "./DemoAntdMain";

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
