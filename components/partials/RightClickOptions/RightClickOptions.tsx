import { Button, Typography, makeStyles } from "@material-ui/core";
import React from "react";
import styles from "./RightClickOptions.module.css";

const useStyles = makeStyles({
  btn: {
    textAlign: "start",
    maxWidth: "max-content",
    textTransform: "capitalize",
  },
});

const RightClickOptions = () => {
  const classes = useStyles();
  return (
    <div className={styles.rightClickOptionContainer}>
      <Button className={classes.btn}>
        <Typography color="primary" variant="subtitle2">
          Play
        </Typography>
      </Button>
      <Button className={classes.btn}>
        <Typography color="primary" variant="subtitle2">
          Pause
        </Typography>
      </Button>
      <Button className={classes.btn}>
        <Typography color="primary" variant="subtitle2">
          Add To Favorite
        </Typography>
      </Button>
      <Button className={classes.btn}>
        <Typography color="primary" variant="subtitle2">
          Remove From Favorite
        </Typography>
      </Button>
      <Button className={classes.btn}>
        <Typography color="primary" variant="subtitle2">
          Delete
        </Typography>
      </Button>
    </div>
  );
};

export default RightClickOptions;
