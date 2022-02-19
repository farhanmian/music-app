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

const useStyles = makeStyles({
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
    "&:hover": {
      transform: "scale(.97)",
    },
  },
});

const CategoryItem: React.FC<{ item: Categories }> = ({ item }) => {
  const classes = useStyles();

  return (
    <NextLink href={`/browse/genre-category-${item.id}`}>
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
