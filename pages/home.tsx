import { Typography, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Heart from "../components/icons/Heart";

import Divider from "../components/partials/Divider/Divider";
import { useAppContext } from "../store/context/appContext";
import {
  ArtistType,
  Categories,
  CategoryPlaylist,
  NewReleaseItemType,
  PodCastItemType,
} from "../store/types/types";
import CategoryItem from "../components/partials/CategoryItem/CategoryItem";
import NextLink from "next/link";
import PodcastItem from "../components/partials/PodcastItem/PodcastItem";
import PlaylistItem from "../components/partials/PlaylistItem/PlaylistItem";
import NewReleaseItem from "../components/partials/NewReleaseItem/NewReleaseItem";

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
  const { spotifyApiCtx, accessToken, setActiveNavLinkCtx } = useAppContext();
  const [newReleases, setNewReleases] = useState([]);
  const [genres, setGenres] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
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
          artists: {
            name: releases.artists[0].name,
            id: releases.artists[0].id,
          },

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
        console.log(res);
        setGenres(data.items);
      })
      .catch((err) => {
        console.log(err);
      });

    /**podcast (show) */
    const podcastsIds = [
      "27DJ5PiShDzUpyWQ8e8FuD",
      "3qfl7KnzjYTbDKlMDp42aV",
      "2Dh3d3yHLIq74QGWLE9HeV",
      "5KuVFavG72i7fNOZ9tEX3a",
      "5s7mCxhzSUbG09pV1RxnUL",
      "7uddSH8MhaK3Q6YFlllbVZ",
    ];
    spotifyApiCtx
      .getShows(podcastsIds, { limit: 6 })
      .then((res: { body: { shows: [] } }) => {
        const transformedData: PodCastItemType[] = [];

        res.body.shows.map((podcast: PodCastItemType) => {
          transformedData.push({
            id: podcast.id,
            images: { url: podcast.images[1].url },
            name: podcast.name,
            publisher: podcast.publisher,
            uri: podcast.uri,
          });
        });

        setPodcasts(transformedData);
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
      console.log(res);
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

      {/* podcasts section */}
      <section className={styles.podcasts}>
        <div className={styles.podcastsInnerContainer}>
          <div className={styles.displayFlex}>
            <span>
              <Typography
                variant="h6"
                color="primary"
                className={classes.margin3}
              >
                PodCasts
              </Typography>

              <Typography variant="caption" color="textSecondary">
                Explore by categories and popularity
              </Typography>
            </span>
            <span>
              <NextLink href="/browse">
                <Typography
                  onClick={() => {
                    setActiveNavLinkCtx("podcasts");
                  }}
                  variant="subtitle2"
                  className={`${classes.link} ${classes.uppercase}`}
                  color="primary"
                >
                  View all
                </Typography>
              </NextLink>
            </span>
          </div>

          <div className={styles.podcastsItemContainer}>
            {podcasts.length > 0 &&
              podcasts.map((podcast) => {
                return <PodcastItem key={podcast.id} podcast={podcast} />;
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
                    link={`/browse/featuredepisode-${item.id}`}
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
                return (
                  <div key={artist.id} className={styles.artistItem}>
                    <div className={styles.artistImage}>
                      <Image
                        loader={() => artist.images.url}
                        unoptimized
                        width={225}
                        height={225}
                        src={artist.images.url}
                        alt="-img"
                      />
                    </div>
                    <Typography
                      variant="subtitle2"
                      color="primary"
                      className={`${classes.margin5} ${styles.artistName}`}
                    >
                      {artist.name}
                    </Typography>

                    <span className={styles.itemLikesContainer}>
                      <Heart />
                      <Typography variant="caption" color="textSecondary">
                        {artist.popularity}%
                      </Typography>
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
