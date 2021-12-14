module.exports = {
  // the site's root Notion page. Use for home page
  rootNotionPageId: "067dd719a912471ea9a3ac10710e7fdf",

  // use to restrict to a single notion workspace
  rootNotionSpaceId: null,

  // page Id of the collection page which contains the blog posts
  // this will be rendered under the home page and /blog url
  blogCollectionPageId: null,

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
