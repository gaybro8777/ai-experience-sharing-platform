import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import Header from "./Header";
import Logo from "components/Logo";
import Footer from "./Footer";
import { getMenus, siteData } from "app/SiteModule";
import { Helmet } from "react-helmet";

const Primary = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMenus({}));
    dispatch(siteData());
  }, [dispatch]);

  const page = useSelector((state) => state.content.page);
  /* istanbul ignore next */
  const { meta = {}, type } = page.data;
  const theme = type === "projects" ? "5" : !meta.theme ? "6" : meta.theme;
  return (
    <>
      <Helmet></Helmet>
      <div
        className={classnames({
          "usa-app": true,
          [`usa-app__theme-${theme}`]: Boolean(theme),
        })}
      >
        <div className="usa-app__bg">
          <Header logo={<Logo />} />
          <main role="main" id="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Primary;
