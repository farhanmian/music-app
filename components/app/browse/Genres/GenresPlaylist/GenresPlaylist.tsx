import React, { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { Grid } from "@mui/material";
import styles from "./GenresPlaylist.module.css";
import { useAppContext } from "../../../../../store/context/appContext";
import { CategoryPlaylist } from "../../../../../store/types/types";
import PlaylistItem from "../../../../partials/PlaylistItem/PlaylistItem";
import NextLink from "next/link";

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

const GenresPlaylist: React.FC<{ query: string }> = ({ query }) => {
  const classes = useStyles();
  const { accessToken, spotifyApiCtx } = useAppContext();
  const [fetchedData, setFetchedData] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;

    spotifyApiCtx
      .getPlaylistsForCategory(query, { limit: 30 })
      .then((res) => {
        console.log(res);
        const transformedData: CategoryPlaylist[] = [];
        res.body.playlists.items.map((playlist: CategoryPlaylist) => {
          transformedData.push({
            name: playlist.name,
            id: playlist.id,
            images: { url: playlist.images[0].url },
            type: playlist.type,
          });
        });

        setFetchedData(transformedData);
      })
      .catch((err) => {
        console.log(err.message);
        setError(true);
      });
  }, [accessToken, spotifyApiCtx]);

  return (
    <div className={styles.genrePlaylistInnerContainer}>
      <Typography variant="h1" color="primary" className={classes.heading}>
        {query}
      </Typography>

      <Typography
        variant="h6"
        color="primary"
        className={classes.popularPlaylistHeading}
      >
        Popular playlist
      </Typography>

      {!error ? (
        <Grid
          container
          columnGap="26px"
          rowGap="48px"
          className={styles.genrePlaylistItemContainer}
        >
          {fetchedData.length > 0 &&
            fetchedData.map((item: CategoryPlaylist) => {
              return (
                <NextLink key={item.id} href={`genre/${item.id}`}>
                  <Grid item>
                    <PlaylistItem playlist={item} />
                  </Grid>
                </NextLink>
              );
            })}
        </Grid>
      ) : (
        <Typography variant="h3" className={classes.errorMsge}>
          Playlist Not Found!
        </Typography>
      )}
    </div>
  );
};

export default GenresPlaylist;
