"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { DemoHeader, useHeaderView } from "./DemoBSHeader";
import DemoMain from "./DemoBSMain";

const DemoPage = () => {
  const headerView = useHeaderView();
  return (
    <>
      <DemoHeader view={headerView} />
      <hr />
      <DemoMain headerView={headerView} />
    </>
  );
};

export default DemoPage;
