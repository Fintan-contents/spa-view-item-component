"use client";

import { DemoHeader, useHeaderView } from "./DemoBSHeader";
import DemoMain from "./DemoBSMain";
import "bootstrap/dist/css/bootstrap.min.css";

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
