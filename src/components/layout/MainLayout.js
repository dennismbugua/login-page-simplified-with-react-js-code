import React, { useState } from "react";

import {
  Content,
  // Footer,
  Header,
  SideBar,
} from "./index";

const MainLayout = (props) => {
  const [sideBar, setsideBar] = useState(false);
  const { children } = props;

  return (
    <main className="wrapper bg-light">
      <SideBar sideBar={sideBar} />
      <Content fluid>
        <Header handleToggle={() => setsideBar(!sideBar)} {...props} />
        <div className="scroll-section">{children}</div>
        {/* <Footer /> */}
      </Content>
    </main>
  );
};

export default MainLayout;
