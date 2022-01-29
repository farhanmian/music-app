import { Typography, makeStyles, Link } from "@material-ui/core";
import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Heart from "../components/icons/Heart";
import music1 from "../assets/img/music1.png";
import music2 from "../assets/img/music2.png";
import music3 from "../assets/img/music3.png";
import browseImg1 from "../assets/img/browse1.png";
import browseImg2 from "../assets/img/browse2.png";
import browseImg3 from "../assets/img/browse3.png";
import browseImg4 from "../assets/img/browse4.png";
import browseImg5 from "../assets/img/browse5.png";
import browseImg6 from "../assets/img/browse6.png";

import podcastImg1 from "../assets/img/podcast1.png";
import podcastImg2 from "../assets/img/podcast2.png";
import podcastImg3 from "../assets/img/podcast3.png";
import podcastImg4 from "../assets/img/podcast4.png";
import podcastImg5 from "../assets/img/podcast5.png";
import podcastImg6 from "../assets/img/podcast6.png";

import playlistImg1 from "../assets/img/playlist1.png";
import playlistImg2 from "../assets/img/playlist2.png";
import playlistImg3 from "../assets/img/playlist3.png";

import Divider from "../components/partials/Divider/Divider";

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

  const dummyRecentPlayed = [
    {
      img: music1,
      name: "The Next Day",
      likes: 5456,
    },
    {
      img: music2,
      name: "Rock",
      likes: 2255,
    },
    {
      img: music3,
      name: "Rebel",
      likes: 2140,
    },
    {
      img: music1,
      name: "The Next Day",
      likes: 5456,
    },
    {
      img: music2,
      name: "Rock",
      likes: 2255,
    },
    {
      img: music3,
      name: "Rebel",
      likes: 2140,
    },
    {
      img: music1,
      name: "The Next Day",
      likes: 5456,
    },
    {
      img: music2,
      name: "Rock",
      likes: 2255,
    },
    {
      img: music3,
      name: "Rebel",
      likes: 2140,
    },
  ];

  const dummyBrowseData = [
    browseImg1,
    browseImg2,
    browseImg3,
    browseImg4,
    browseImg5,
    browseImg6,
  ];

  const dummyPodcastData = [
    podcastImg1,
    podcastImg2,
    podcastImg3,
    podcastImg4,
    podcastImg5,
    podcastImg6,
  ];

  const dummyPlaylisttData = [
    playlistImg1,
    playlistImg2,
    playlistImg3,
    playlistImg2,
    playlistImg3,
    playlistImg1,
  ];

  return (
    <React.Fragment>
      <section className={styles.recentPlayed}>
        <div className={styles.recentPlayedInnerContainer}>
          <Typography variant="h6" className={classes.heading} color="primary">
            Recently Played
          </Typography>
          <div className={styles.recentPlayedContainer}>
            {dummyRecentPlayed.map((recentPlayed, i) => {
              return (
                <div key={i} className={styles.recentPlayedItem}>
                  <div className={styles.recentPlayedImage}>
                    <Image src={recentPlayed.img} alt="img" />
                  </div>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    className={classes.margin5}
                  >
                    {recentPlayed.name}
                  </Typography>

                  <span className={styles.itemLikesContainer}>
                    <Heart />
                    <Typography variant="caption" color="textSecondary">
                      {recentPlayed.likes}
                    </Typography>
                  </span>
                </div>
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
                Explore by genre and mood
              </Typography>
            </span>
            <span>
              <Link className={classes.link}>
                <Typography variant="subtitle2" className={classes.uppercase}>
                  View all
                </Typography>
              </Link>
            </span>
          </div>
          <div className={styles.browseItemContainer}>
            {dummyBrowseData.map((item) => {
              return (
                <div className={styles.browseItem}>
                  <Image src={item} alt="image" />
                </div>
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
              <Link className={classes.link}>
                <Typography variant="subtitle2" className={classes.uppercase}>
                  View all
                </Typography>
              </Link>
            </span>
          </div>

          <div className={styles.podcastsItemContainer}>
            {dummyPodcastData.map((podcast) => {
              return (
                <div className={styles.podcastItem}>
                  <Image src={podcast} alt="podcast" />
                </div>
              );
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
            {dummyPlaylisttData.map((playlist) => {
              return (
                <div className={styles.playlistItem}>
                  <div className={styles.playlistItemImage}>
                    <Image src={playlist} alt="playlist" />
                  </div>

                  <Typography
                    variant="subtitle2"
                    color="primary"
                    className={classes.capitalize}
                  >
                    name
                  </Typography>
                  <span className={styles.itemLikesContainer}>
                    <Heart />
                    <Typography variant="caption" color="textSecondary">
                      6546,456
                    </Typography>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Divider />

      {/* new releases */}
      <section className={styles.newReleases}>
        <div className={styles.newReleasesInnerContainer}>
          <Typography variant="h6" color="primary" className={classes.heading}>
            New releases for you
          </Typography>

          <div className={styles.newReleasesItemContainer}>
            {dummyPlaylisttData.map((newRelease) => {
              return (
                <div className={styles.newReleaseItem}>
                  <div className={styles.newReleaseImage}>
                    <Image src={newRelease} alt="new-release-img" />
                  </div>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    className={classes.margin5}
                  >
                    Song/playlist Name
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    className={classes.capitalize}
                  >
                    artist
                  </Typography>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* artists */}
      <section className={styles.artists}>
        <div className={styles.artistsInnerContainer}>
          <Typography variant="h6" className={classes.heading} color="primary">
            You might like these artists
          </Typography>
          <div className={styles.artistsContainer}>
            {dummyRecentPlayed.map((recentPlayed, i) => {
              return (
                <div key={i} className={styles.artistItem}>
                  <div className={styles.artistImage}>
                    <Image src={recentPlayed.img} alt="img" />
                  </div>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    className={classes.margin5}
                  >
                    {recentPlayed.name}
                  </Typography>

                  <span className={styles.itemLikesContainer}>
                    <Heart />
                    <Typography variant="caption" color="textSecondary">
                      {recentPlayed.likes}
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
