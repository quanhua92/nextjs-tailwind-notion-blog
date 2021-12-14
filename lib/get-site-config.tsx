import rawSiteConfig from "../site.config";
import { SiteConfig } from "../components/contexts/site/type";

export const getSiteConfig = () => {
  let config: SiteConfig = {
    rootPageId: rawSiteConfig.rootNotionPageId,
    rootSpaceId: rawSiteConfig.rootNotionSpaceId
      ? rawSiteConfig.rootNotionSpaceId
      : undefined,
    mainMenu: rawSiteConfig.mainMenu,
  };
  return config;
};
