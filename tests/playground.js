const notion_utils = require("notion-utils");
const notion_client = require("notion-client");
const axios = require("axios");

const rootPageId = "7a0db84316664ad5814f03cf7f461000";
const rootSpaceId = undefined;

const getPageData = async (pageId) => {
  return await axios
    .get(`https://notion-api.splitbee.io/v1/page/${pageId}`)
    .then((res) => res.data);
};

const t = async () => {
  const notion = new notion_client.NotionAPI();
  console.log("Hi");
  if (true) {
    const pageData = await getPageData(rootPageId);
    const realPageId = notion_utils.parsePageId(rootPageId);
    console.log("Hi", pageData);
    console.log("instance of Promise", pageData instanceof Promise);
    console.log("keys", Object.keys(pageData));
    const info = pageData[realPageId];
    console.log("pageData", info["value"]["format"]["page_full_width"]);
  }

  if (false) {
    const recordMap = await notion.getPage(rootPageId);
    console.log("recordMap", recordMap);
  }

  if (false) {
    const pages = await notion_utils.getAllPagesInSpace(
      rootPageId,
      rootSpaceId,
      notion.getPage.bind(notion),
      {
        traverseCollections: false,
      }
    );

    const paths = Object.keys(pages).map((pageId) => `/${pageId}`);

    console.log("pages", Object.keys(pages));
    console.log("paths", paths);
  }
};
t();
