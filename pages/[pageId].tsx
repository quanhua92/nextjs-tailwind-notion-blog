import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import { getPageTitle, getAllPagesInSpace } from "notion-utils";

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

const notion = new NotionAPI();

export const getStaticPaths: GetStaticPaths = async () => {
  if (isDev) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  const rootPageId = "067dd719a912471ea9a3ac10710e7fdf";
  const rootSpaceId = undefined;

  const pages = await getAllPagesInSpace(
    rootPageId,
    rootSpaceId,
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
  return (
    <>
      <Head>
        <title>Next.js + Tailwind CSS + Notion Blog</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto max-w-5xl">
          <div className="overflow-hidden">
            <NotionRenderer
              recordMap={recordMap}
              fullPage={true}
              darkMode={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
