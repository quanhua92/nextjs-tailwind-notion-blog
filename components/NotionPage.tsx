import React from "react";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";

type Props = {
  recordMap: ExtendedRecordMap;
};

const NotionPage: React.FC<Props> = ({ recordMap }) => {
  return (
    <div className="overflow-hidden">
      <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
    </div>
  );
};

export default NotionPage;
