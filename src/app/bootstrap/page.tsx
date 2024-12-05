"use client";

import { useRouter } from "next/navigation";
import { DemoHeader, useHeaderView } from "./DemoBSHeader";
import DemoMain from "./DemoBSMain";
import { BsFillHouseDoorFill } from "react-icons/bs";

const DemoPage = () => {
  const router = useRouter();
  const headerView = useHeaderView();
  return (
    <>
      <div style={{ position: "relative" }}>
        <div
          onClick={() => router.push("/")}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "40px",
          }}
        >
          <BsFillHouseDoorFill />
        </div>
      </div>
      <DemoHeader view={headerView} />
      <hr />
      <DemoMain headerView={headerView} />
    </>
  );
};

export default DemoPage;
