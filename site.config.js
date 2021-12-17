module.exports = {
  // the site's root Notion page. Use for home page
  rootNotionPageId: "7a0db84316664ad5814f03cf7f461000",

  // page Id of the collection page which contains the blog posts
  // this will be rendered under the home page and /blog url
  blogCollectionPageId: "e25d4ce4207b4885b50b5c93127b8db2",

  // use to restrict to a single notion workspace
  rootNotionSpaceId: null,

  // array of menu items for the main nav bar
  mainMenu: [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Blog",
      url: "/blog",
    },
  ],
};
