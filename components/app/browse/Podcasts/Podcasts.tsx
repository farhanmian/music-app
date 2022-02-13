import React, { useEffect, useState } from "react";
import styles from "./Podcasts.module.css";
import { useAppContext } from "../../../../store/context/appContext";
import { Typography, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import {
  Categories,
  FeaturedEpisode,
  PodCastItemType,
} from "../../../../store/types/types";
import Image from "next/image";
import Divider from "../../../partials/Divider/Divider";
import CategoryItem from "../../../partials/CategoryItem/CategoryItem";
import NextLink from "next/link";
import PodcastItem from "../../../partials/PodcastItem/PodcastItem";

const useStyles = makeStyles({
  heading: {
    marginBottom: 30,
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

    // shows (podcast)
    const podcastsIds = [
      "3MBmSp76yRsFJSFIAVh41S",
      "1GXX3JryxVciJghofKXIQ6",
      "58g95EqsrSk5ViIl3wGDzo",
      "4BuXlpcana6xU2ctfZ3qgZ",
      "5EqqB52m2bsr4k1Ii7sStc",
      "4wgaUiSz7Gh2FJrBYfn0GM",
      "4NHIIVB3DkjH70yhE3pbcd",
      "0rIiowNNhk4SGLqsbhBVWn",
      "12jUp5Aa63c5BYx3wVZeMA",
      "1uYUZxdR4sSTXJ6SmSRook",
      "6ll0MwobDt1JW9gYaOONEo",
      "1tCEkweikOQj2NDGDRDkpc",
    ];

    spotifyApiCtx
      .getShows(podcastsIds, { limit: 12 })
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
            podcasts.map((podcast: PodCastItemType) => {
              return (
                <Grid key={podcast.id} item>
                  <PodcastItem podcast={podcast} />
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
                <NextLink
                  key={episode.id}
                  href={`/browse/featuredepisode-${episode.id}`}
                >
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
                </NextLink>
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
            genres.map((genre: Categories) => {
              return (
                <Grid key={genre.id} item>
                  <CategoryItem item={genre} />
                </Grid>
              );
            })}
        </Grid>
      </div>
    </React.Fragment>
  );
}
