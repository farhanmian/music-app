import React from "react";
import Image from "next/image";
import {
  makeStyles,
  Typography,
  Card,
  CardActionArea,
} from "@material-ui/core";
import { Categories } from "../../../store/types/types";
import styles from "./CategoryItem.module.css";
import NextLink from "next/link";

const useStyles = makeStyles((theme) => {
  return {
    genresName: {
      fontWeight: "bold",
      fontSize: 15,
      position: "absolute",
      bottom: "3%",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 3,
      textTransform: "capitalize",
    },
    genreItemCard: {
      background: "transparent",
      color: "#fff",
      transition: "all .3s",
      boxShadow: "none",
      minWidth: 225,
      [theme.breakpoints.down(1000.2)]: {
        minWidth: 210,
      },
      [theme.breakpoints.down(800.2)]: {
        minWidth: 175,
      },
      [theme.breakpoints.down(600.2)]: {
        minWidth: 160,
      },
      [theme.breakpoints.down(500.2)]: {
        minWidth: 151,
      },
      "&:hover": {
        transform: "scale(.97)",
      },
    },
  };
});

const CategoryItem: React.FC<{ item: Categories }> = ({ item }) => {
  const classes = useStyles();

  return (
    <NextLink
      href={`/browse/genre-category-${item.id}?type=${item.name
        .toLowerCase()
        .replaceAll(" ", "-")}`}
    >
      <Card className={classes.genreItemCard}>
        <CardActionArea>
          <div className={styles.genresItem}>
            <div className={styles.genresItemBackdrop} />
            <div className={styles.genresItemImage}>
              <Image
                loader={() => item.icons[0].url}
                unoptimized
                width={225}
                height={128}
                src={item.icons[0].url}
                alt=""
              />
            </div>
            <Typography
              variant="subtitle2"
              className={classes.genresName}
              color="primary"
            >
              {item.name}
            </Typography>
          </div>
        </CardActionArea>
      </Card>
    </NextLink>
  );
};

export default CategoryItem;
