import React, { useEffect, useState } from "react";
import styles from "../../../styles/ItemPlaylist.module.css";
import { useRouter } from "next/dist/client/router";
import { useAppContext } from "../../../store/context/appContext";
import { CategoryPlaylist } from "../../../store/types/types";
import { makeStyles, Typography } from "@material-ui/core";
import { Grid } from "@mui/material";
import PlaylistItem from "../../../components/partials/PlaylistItem/PlaylistItem";
import GenresPlaylist from "../../../components/app/browse/Genres/GenresPlaylist/GenresPlaylist";
import Playlist from "../../../components/partials/Playlist/Playlist";

const useStyles = makeStyles({
  heading: {
    marginBottom: 55,
    textTransform: "capitalize",
  },
  popularPlaylistHeading: {
    textTransform: "none",
    marginBottom: 30,
  },
  errorMsge: {
    marginTop: 50,
    textAlign: "center",
    color: "transparent",
    backgroundImage:
      "linear-gradient( to right, #9b2def, #2d9bef 32%, #35edfb 112%)",
    filter: "drop-shadow(0px 4px 6px #0072ff85)",
    WebkitBackgroundClip: "text",
  },
});

export default function index() {
  const classes = useStyles();
  const router = useRouter();
  const { accessToken, spotifyApiCtx } = useAppContext();
  const itemQuery = `${router.query.itemPlaylist}`;
  const query = itemQuery.split("-").pop();
  console.log(itemQuery);
  console.log(query);

  // useEffect(() => {
  //   if (!accessToken || !spotifyApiCtx || !query) return;

  //   if (itemQuery.includes("album")) {
  //     spotifyApiCtx.getAlbum("2ptlvk4iUKk88X0DfEzBm7").then((res) => {
  //       console.log(res);
  //       setItemDetails({
  //         name: res.body.name,
  //         label: res.body.label,
  //         type: res.body.type,
  //         artist: {
  //           name: res.body.artists[0].name,
  //           id: res.body.artists[0].id,
  //         },
  //       });
  //     });
  //   }

  //   /// to fetch playlist tracks = https://developer.spotify.com/console/get-playlist-tracks/
  // }, [accessToken, spotifyApiCtx, query]);

  return (
    <section className={styles.itemPlaylist}>
      {itemQuery.includes("category") && <GenresPlaylist query={query} />}
      {itemQuery.includes("album") && <Playlist id={query} />}
    </section>
  );
}
