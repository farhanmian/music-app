import React, { useEffect } from "react";
import styles from "../../styles/Browse.module.css";
import Genres from "../../components/app/browse/Genres/Genres";
import NewReleases from "../../components/app/browse/NewReleases/NewReleases";
import FeaturedEpisodes from "../../components/app/browse/FeaturedEpisodes/FeaturedEpisodes";
import { useRouter } from "next/dist/client/router";

export default function browse() {
  const router = useRouter();
  const activeTab = router.query.tab;
  useEffect(() => {
    if (router.asPath === "/browse") {
      router.replace("browse/?tab=genres");
    }
  }, [activeTab]);

  // console.log(router.asPath);

  return (
    <section className={styles.browse}>
      {activeTab === "genres" && <Genres />}
      {activeTab === "feature-episodes" && <FeaturedEpisodes />}
      {activeTab === "new-releases" && <NewReleases />}
    </section>
  );
}
