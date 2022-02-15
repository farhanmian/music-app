import React from "react";
import styles from "../../../styles/ItemPlaylist.module.css";
import { useRouter } from "next/dist/client/router";
import GenresPlaylist from "../../../components/app/browse/Genres/GenresPlaylist/GenresPlaylist";

export default function index() {
  const router = useRouter();
  const itemQuery = `${router.query.itemPlaylist}`;
  const query = itemQuery.split("-").pop();
  console.log(itemQuery);
  console.log(query);

  return (
    <section className={styles.itemPlaylist}>
      {itemQuery.includes("category") && <GenresPlaylist query={query} />}
    </section>
  );
}
