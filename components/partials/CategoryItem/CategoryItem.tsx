import React from "react";
import Image from "next/image";
import { makeStyles, Typography } from "@material-ui/core";
import { Categories } from "../../../store/types/types";
import styles from "./CategoryItem.module.css";

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
});

const CategoryItem: React.FC<{ item: Categories }> = ({ item }) => {
  const classes = useStyles();

  return (
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
  );
};

export default CategoryItem;
