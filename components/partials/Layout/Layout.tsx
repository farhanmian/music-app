import React from "react";
import Divider from "../Divider/Divider";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Nav />
      <main className={styles.mainContainer}>{children}</main>
      <Divider />
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
