import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { getPageTitle, parsePageId } from "notion-utils";
import NotionPage from "../../components/NotionPage";

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

const notion = new NotionAPI();

const isPageFullWidth = (block: any) => {
  let page_full_width = false;
  try {
    page_full_width = block["value"]["format"]["page_full_width"];
  } catch (err) {
    page_full_width = false;
  } finally {
    return page_full_width ? page_full_width : false;
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageId = params!.pageId as string;

  const recordMap = await notion.getPage(pageId);
  const notionPageId = parsePageId(pageId);
  const page_full_width = isPageFullWidth(recordMap.block[notionPageId]);
  return {
    props: {
      recordMap,
      page_full_width,
    },
    revalidate: 60,
  };
};

type Props = {
  recordMap: ExtendedRecordMap;
  page_full_width: boolean;
};

const BlogPage: NextPage<Props> = ({ recordMap, page_full_width }) => {
  const title = getPageTitle(recordMap);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <div
          className={`${
            page_full_width ? "min-w-full" : "container mx-auto max-w-5xl"
          } `}
        >
          <NotionPage recordMap={recordMap} fullPage={false} />
        </div>
      </div>
    </>
  );
};

export default BlogPage;
