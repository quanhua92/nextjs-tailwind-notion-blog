import React, { createContext, useContext } from "react";
import { getSiteConfig } from "../../../lib/get-site-config";
import { SiteContextProps } from "./type";

export const SiteContext = createContext<SiteContextProps>(
  {} as SiteContextProps
);

export const useSite = () => {
  return useContext(SiteContext);
};

type Props = {
  children: any;
};

export const SiteContextProvider: React.FC<Props> = ({ children }) => {
  return (
    <SiteContext.Provider
      value={{
        siteConfig: getSiteConfig(),
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};
