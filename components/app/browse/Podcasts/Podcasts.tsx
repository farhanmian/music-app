import React, { useEffect, useState } from "react";
import styles from "./Podcasts.module.css";
import { useAppContext } from "../../../../store/context/appContext";
import { Typography, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import {
  Categories,
  FeaturedEpisode,
  PodCastItem,
} from "../../../../store/types/types";
import Image from "next/image";
import Divider from "../../../partials/Divider/Divider";
import CategoryItem from "../../../partials/CategoryItem/CategoryItem";

const useStyles = makeStyles({
  heading: {
    marginBottom: 30,
  },
  podcastItemName: {
    marginBottom: 5,
    textTransform: "capitalize",
  },
  featuredEpisodesHeading: {
    textTransform: "none",
    marginBottom: 40,
  },
});

export default function Podcasts() {
  const classes = useStyles();
  const { spotifyApiCtx, accessToken } = useAppContext();
  const [podcasts, setPodcasts] = useState([]);
  const [featuredEpisodes, setFeaturedEpisodes] = useState([]);
  const [genres, setGenres] = useState([]);

  /**
   * fetching data
   */
  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;

    const podcastsIds = [
      "5CfCWKI5pZ28U0uOzXkDHe",
      "5as3aKmN2k11yfDDDSrvaZ",
      "4BuXlpcana6xU2ctfZ3qgZ",
      "6IVKMJnrVorjdJr8TdEfl4",
      "6DeldIJ7dRVPq5RhZuonNv",
      "4tp1Wo0moxOoOhRUsfUVBE",
      "27DJ5PiShDzUpyWQ8e8FuD",
      "3qfl7KnzjYTbDKlMDp42aV",
      "2Dh3d3yHLIq74QGWLE9HeV",
      "5KuVFavG72i7fNOZ9tEX3a",
      "5s7mCxhzSUbG09pV1RxnUL",
      "7uddSH8MhaK3Q6YFlllbVZ",
    ];

    // shows (podcast)
    spotifyApiCtx
      .getShows(podcastsIds, { limit: 12 })
      .then((res: { body: { shows: [] } }) => {
        const transformedData: PodCastItem[] = [];

        res.body.shows.map((podcast: PodCastItem) => {
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
      .getFeaturedPlaylists()
      .then((res: { body: { playlists: { items: [] } } }) => {
        const transformedData: FeaturedEpisode[] = [];
        res.body.playlists.items.map((playlist: FeaturedEpisode) => {
          transformedData.push({
            id: playlist.id,
            images: { url: playlist.images[0].url },
            name: playlist.name,
            description: playlist.description,
            uri: playlist.uri,
          });
        });
        // console.log(transformedData);
        setFeaturedEpisodes(transformedData);
      });

    // get categories
    spotifyApiCtx
      .getCategories({ limit: 12 })
      .then((res: { body: { categories: { items: Categories[] } } }) => {
        const data = res.body.categories;
        setGenres(data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken, spotifyApiCtx]);

  return (
    <React.Fragment>
      <div className={styles.podcastsContainer}>
        <Typography variant="h6" color="primary" className={classes.heading}>
          Popular
        </Typography>

        <Grid
          container
          columnGap="26px"
          rowGap="48px"
          className={styles.podcastsItemContainer}
        >
          {podcasts.length > 0 &&
            podcasts.map((podcast: PodCastItem) => {
              return (
                <Grid key={podcast.id} item className={styles.podcastItem}>
                  <div className={styles.podcastItemImage}>
                    <Image
                      loader={() => podcast.images.url}
                      unoptimized
                      width={225}
                      height={225}
                      src={podcast.images.url}
                      alt="podcast-img"
                    />
                  </div>

                  <Typography
                    variant="body2"
                    className={classes.podcastItemName}
                    color="primary"
                  >
                    {podcast.name.trim().length > 24
                      ? `${podcast.name.slice(0, 24)}...`
                      : podcast.name}
                  </Typography>

                  <Typography variant="caption" color="textSecondary">
                    {podcast.publisher.trim().length > 30
                      ? `${podcast.publisher.slice(0, 30)}...`
                      : podcast.publisher}
                  </Typography>
                </Grid>
              );
            })}
        </Grid>
      </div>
      <Divider />

      <div className={styles.featuredEpisodesContainer}>
        <Typography
          variant="h6"
          color="primary"
          className={classes.featuredEpisodesHeading}
        >
          Featured episodes
        </Typography>

        <Grid
          container
          columnGap="78px"
          rowGap="30px"
          className={styles.featuredEpisodesItemContainer}
        >
          {featuredEpisodes.length > 0 &&
            featuredEpisodes.map((episode: FeaturedEpisode) => {
              return (
                <Grid
                  key={episode.id}
                  item
                  className={styles.featuredEpisodesItem}
                >
                  <div className={styles.featuredEpisodesImage}>
                    <Image
                      loader={() => episode.images.url}
                      unoptimized
                      width={100}
                      height={100}
                      src={episode.images.url}
                      alt="featured-episode-img"
                    />
                  </div>

                  <div className={styles.featuredEpisodesText}>
                    <Typography variant="body2" color="primary">
                      {episode.name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {episode.description.trim().length > 85
                        ? `${episode.description.slice(0, 85)}...`
                        : episode.description}
                    </Typography>
                  </div>
                </Grid>
              );
            })}
        </Grid>
      </div>
      <Divider />

      <div className={styles.categoriesContainer}>
        <Typography variant="h6" className={classes.heading} color="primary">
          Categories
        </Typography>

        <Grid
          container
          columnGap="26px"
          rowGap="48px"
          className={styles.categoriesItemContainer}
        >
          {genres.length > 0 &&
            genres.map((genre) => {
              return (
                <Grid item>
                  <CategoryItem item={genre} />
                </Grid>
              );
            })}
        </Grid>
      </div>
    </React.Fragment>
  );
}
