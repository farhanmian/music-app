import React from "react";
import { useAppContext } from "../../../store/context/appContext";
import Player from "../../app/Player/Player";
import SearchResult from "../../app/SearchResult/SearchResult";
import Divider from "../Divider/Divider";
import Footer from "./Footer";
import styles from "./Layout.module.css";
import Nav from "./Nav";

const Layout = ({ children }) => {
  const { searchValue } = useAppContext();
  return (
    <React.Fragment>
      <Nav />
      <main className={styles.mainContainer}>
        {searchValue.trim().length === 0 ? children : <SearchResult />}
        <Player />
      </main>
      <Divider />
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
