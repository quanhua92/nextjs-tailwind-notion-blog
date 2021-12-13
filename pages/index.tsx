import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import NotionPage from "../components/NotionPage";

const notion = new NotionAPI();

export const getStaticProps: GetStaticProps = async () => {
  const recordMap = await notion.getPage("067dd719a912471ea9a3ac10710e7fdf");

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
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto max-w-5xl">
          <NotionPage recordMap={recordMap} />
        </div>
      </div>
    </>
  );
};

export default Home;
