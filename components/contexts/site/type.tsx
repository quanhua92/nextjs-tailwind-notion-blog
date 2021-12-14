export type MenuItem = {
  name: string;
  url: string;
};

export type SiteConfig = {
  rootPageId: string;
  rootSpaceId?: string;
  mainMenu: Array<MenuItem>;
};

export type SiteContextProps = {
  siteConfig: SiteConfig;
};
