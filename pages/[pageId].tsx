import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { getPageTitle, getAllPagesInSpace } from "notion-utils";
import NotionPage from "../components/NotionPage";
import { getSiteConfig } from "../lib/get-site-config";

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

const notion = new NotionAPI();

export const getStaticPaths: GetStaticPaths = async () => {
  if (isDev) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const siteConfig = getSiteConfig();

  const pages = await getAllPagesInSpace(
    siteConfig.rootPageId,
    siteConfig.rootSpaceId,
    notion.getPage.bind(notion),
    {
      traverseCollections: false,
    }
  );

  const paths = Object.keys(pages).map((pageId) => `/${pageId}`);

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageId = params!.pageId as string;

  const recordMap = await notion.getPage(pageId);

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

const BlogPage: NextPage<Props> = ({ recordMap }) => {
  const title = getPageTitle(recordMap);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto max-w-5xl">
          <NotionPage recordMap={recordMap} />
        </div>
      </div>
    </>
  );
};

export default BlogPage;
