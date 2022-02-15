import React from "react";
import styles from "../../styles/Browse.module.css";
import Genres from "../../components/app/browse/Genres/Genres";
import NewReleases from "../../components/app/browse/NewReleases/NewReleases";
import FeaturedEpisodes from "../../components/app/browse/FeaturedEpisodes/FeaturedEpisodes";
import { useAppContext } from "../../store/context/appContext";

export default function browse() {
  const { activeNavLinkCtx } = useAppContext();

  return (
    <section className={styles.browse}>
      {activeNavLinkCtx === "genres" && <Genres />}
      {activeNavLinkCtx === "feature episodes" && <FeaturedEpisodes />}
      {activeNavLinkCtx === "new releases" && <NewReleases />}
    </section>
  );
}
