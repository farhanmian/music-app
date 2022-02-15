import React, { useEffect, useState } from "react";
import styles from "./FeaturedEpisodes.module.css";
import { useAppContext } from "../../../../store/context/appContext";
import { Typography, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import { Categories, FeaturedEpisode } from "../../../../store/types/types";
import Image from "next/image";
import Divider from "../../../partials/Divider/Divider";
import CategoryItem from "../../../partials/CategoryItem/CategoryItem";
import NextLink from "next/link";

const useStyles = makeStyles({
  heading: {
    marginBottom: 30,
  },

  featuredEpisodesHeading: {
    textTransform: "none",
    marginBottom: 40,
  },
});

export default function FeaturedEpisodes() {
  const classes = useStyles();
  const { spotifyApiCtx, accessToken } = useAppContext();
  const [featuredEpisodes, setFeaturedEpisodes] = useState([]);
  const [genres, setGenres] = useState([]);

  /**
   * fetching data
   */
  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;

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
                <NextLink key={episode.id} href={`playlist/${episode.id}`}>
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
                        {episode.description.trim().length > 60
                          ? `${episode.description.slice(0, 60)}...`
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
