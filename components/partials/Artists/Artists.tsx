import React from "react";
import styles from "./Artists.module.css";
import { makeStyles, Typography } from "@material-ui/core";
import Skeletons from "../Skeletons/Skeletons";
import Artist from "./Artist/Artist";
import Slider from "react-slick";
import { ArtistType } from "../../../store/types/types";

const useStyles = makeStyles({
  heading: {
    marginBottom: 32,
  },
});

const Artists: React.FC<{ artists: ArtistType[]; heading: string }> = ({
  artists,
  heading,
}) => {
  const classes = useStyles();

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <section className={styles.artists}>
      <div className={styles.artistsInnerContainer}>
        <Typography variant="h6" className={classes.heading} color="primary">
          {heading}
        </Typography>
        <div className={styles.artistsContainer}>
          {artists.length > 0 ? (
            <Slider {...settings}>
              {artists.map((artist: ArtistType) => {
                return <Artist key={artist.id} artist={artist} />;
              })}
            </Slider>
          ) : (
            <Skeletons
              numberOfSkeleton={6}
              width1={225}
              height1={235}
              width2={225}
              height2={25}
              borderRadius1={500}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Artists;
