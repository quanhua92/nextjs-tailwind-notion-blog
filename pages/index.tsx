import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import NotionPage from "../components/NotionPage";
import { getSiteConfig } from "../lib/get-site-config";

const notion = new NotionAPI();

export const getStaticProps: GetStaticProps = async () => {
  const siteConfig = getSiteConfig();

  const recordMap = await notion.getPage(siteConfig.rootPageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 60,
  };
};

type Props = {
  recordMap: ExtendedRecordMap;
};

const Home: NextPage<Props> = ({ recordMap }) => {
  return (
    <>
      <Head>
        <title>Next.js + Tailwind CSS + Notion Blog</title>
      </Head>
      <NotionPage recordMap={recordMap} />
    </>
  );
};

export default Home;
