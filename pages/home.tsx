import { Typography, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import Divider from "../components/partials/Divider/Divider";
import { useAppContext } from "../store/context/appContext";
import {
  ArtistType,
  Categories,
  CategoryPlaylist,
  NewReleaseItemType,
} from "../store/types/types";
import CategoryItem from "../components/partials/CategoryItem/CategoryItem";
import NextLink from "next/link";
import PlaylistItem from "../components/partials/PlaylistItem/PlaylistItem";
import NewReleaseItem from "../components/partials/NewReleaseItem/NewReleaseItem";
import Artist from "../components/partials/Artist/Artist";

const useStyles = makeStyles({
  heading: {
    marginBottom: 32,
  },
  uppercase: {
    textTransform: "uppercase",
  },
  capitalize: {
    textTransform: "capitalize",
  },
  link: {
    cursor: "pointer",
  },
  margin3: {
    marginBottom: 3,
  },
  margin5: {
    marginBottom: 5,
  },
});

export default function home() {
  const classes = useStyles();
  const { spotifyApiCtx, accessToken } = useAppContext();
  const [newReleases, setNewReleases] = useState([]);
  const [genres, setGenres] = useState([]);
  const [featuredEpisodes, setFeaturedEpisodes] = useState([]);
  const [artists, setArtists] = useState([]);

  /**
   * getting data
   */
  useEffect(() => {
    if (!spotifyApiCtx || !accessToken) return;

    /**new release */
    spotifyApiCtx.getNewReleases().then((res) => {
      const data = res.body.albums.items;
      const transformData = data.map((releases) => {
        return {
          type: releases.type,
          artists: releases.artists,
          id: releases.id,
          image: releases.images[1],
          name: releases.name,
        };
      });
      setNewReleases(transformData);
    });

    /**genre */
    spotifyApiCtx
      .getCategories({ limit: 6 })
      .then((res: { body: { categories: { items: Categories[] } } }) => {
        const data = res.body.categories;
        setGenres(data.items);
      })
      .catch((err) => {
        console.log(err);
      });

    // featured playlist
    spotifyApiCtx
      .getFeaturedPlaylists({ limit: 6 })
      .then((res: { body: { playlists: { items: [] } } }) => {
        const transformedData = [];
        res.body.playlists.items.map((playlist: CategoryPlaylist) => {
          transformedData.push({
            id: playlist.id,
            images: { url: playlist.images[0].url },
            name: playlist.name,
            type: playlist.type,
          });
        });
        setFeaturedEpisodes(transformedData);
      });

    // artists
    const artistsId = [
      "2uYWxilOVlUdk4oV9DvwqK",
      "45dkTj5sMRSjrmBSBeiHym",
      "586uxXMyD5ObPuzjtrzO1Q",
      "0L8ExT028jH3ddEcZwqJJ5",
      "6nxWCVXbOlEVRexSbLsTer",
      "17lzZA2AlOHwCwFALHttmp",
      "6TIYQ3jFPwQSRmorSezPxX",
      "4MCBfE4596Uoi2O4DtmEMz",
      "2DlGxzQSjYe5N6G9nkYghR",
      "0hCNtLu0JehylgoiP8L4Gh",
      "1LCsAfmP4l13EYtzDaLMAg",
      "5IbEL2xjRtKsunfmsahLuO",
      "7EQ0qTo7fWT7DPxmxtSYEc",
      "2RY3ihP6cPwsuGv97SGWg2",
      "4kIwETcbpuFgRukE8o7Opx",
      "6QtgPSJPSzcnn7dPZ4VINp",
      "2IK173RXLiCSQ8fhDlAb3s",
      "7M7UXUwtz3Wb25PVS8dwHs",
      "1btWGBz4Uu1HozTwb2Lm8A",
    ];
    spotifyApiCtx.getArtists(artistsId).then((res) => {
      const transformData: ArtistType[] = [];
      res.body.artists.map((item: ArtistType) => {
        transformData.push({
          name: item.name,
          id: item.id,
          type: item.type,
          images: { url: item.images[1].url },
          popularity: item.popularity,
        });
      });
      setArtists(transformData);
    });
  }, [spotifyApiCtx, accessToken]);

  return (
    <React.Fragment>
      {/* new releases */}
      <section className={styles.newReleases}>
        <div className={styles.newReleasesInnerContainer}>
          <Typography variant="h6" color="primary" className={classes.heading}>
            New releases for you
          </Typography>

          <div className={styles.newReleasesItemContainer}>
            {newReleases.length > 0 &&
              newReleases.map((newRelease: NewReleaseItemType) => {
                return (
                  <NewReleaseItem key={newRelease.id} newRelease={newRelease} />
                );
              })}
          </div>
        </div>
      </section>
      <Divider />

      {/* browse section */}
      <section className={styles.browse}>
        <div className={styles.browseInnerContainer}>
          <div className={styles.displayFlex}>
            <span>
              <Typography
                variant="h6"
                color="primary"
                className={classes.margin3}
              >
                Browse
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Explore by genre
              </Typography>
            </span>
            <span>
              <NextLink href="/browse">
                <Typography
                  variant="subtitle2"
                  className={`${classes.link} ${classes.uppercase}`}
                  color="primary"
                >
                  View all
                </Typography>
              </NextLink>
            </span>
          </div>
          <div className={styles.browseItemContainer}>
            {genres.length > 0 &&
              genres.map((item: Categories) => {
                return <CategoryItem key={item.id} item={item} />;
              })}
          </div>
        </div>
      </section>
      <Divider />

      {/* playlist picks section */}
      <section className={styles.playlist}>
        <div className={styles.playlistInnerContainer}>
          <Typography variant="h6" color="primary" className={classes.margin3}>
            Playlist picks
          </Typography>

          <Typography variant="caption" color="textSecondary">
            Selected for you based on your recent activity
          </Typography>

          <div className={styles.playlistItemContainer}>
            {featuredEpisodes.length > 0 &&
              featuredEpisodes.map((item: CategoryPlaylist) => {
                return (
                  <PlaylistItem
                    key={item.id}
                    playlist={item}
                    link={`/playlist/${item.id}`}
                  />
                );
              })}
          </div>
        </div>
      </section>
      <Divider />

      {/* artists */}
      <section className={styles.artists}>
        <div className={styles.artistsInnerContainer}>
          <Typography variant="h6" className={classes.heading} color="primary">
            You might like these artists
          </Typography>
          <div className={styles.artistsContainer}>
            {artists.length > 0 &&
              artists.map((artist: ArtistType) => {
                return <Artist key={artist.id} artist={artist} />;
              })}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
