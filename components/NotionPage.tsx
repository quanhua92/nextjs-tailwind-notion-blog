import React from "react";
import dynamic from "next/dynamic";
import { ExtendedRecordMap } from "notion-types";
import {
  NotionRenderer,
  Code,
  Equation,
  Collection,
  CollectionRow,
} from "react-notion-x";

const Modal = dynamic(
  () => import("react-notion-x").then((notion) => notion.Modal),
  { ssr: false }
);

type Props = {
  recordMap: ExtendedRecordMap;
  fullPage?: boolean;
};

const NotionPage: React.FC<Props> = ({ recordMap, fullPage = true }) => {
  return (
    <div className="overflow-hidden">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={fullPage}
        darkMode={false}
        components={{
          code: Code,
          collection: Collection,
          collectionRow: CollectionRow,
          modal: Modal,
          equation: Equation,
        }}
      />
    </div>
  );
};

export default NotionPage;
