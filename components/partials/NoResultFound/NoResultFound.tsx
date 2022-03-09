import React from "react";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  noResultHeading: {
    width: "max-content",
    position: "absolute",
    top: 280,
    left: "50%",
    transform: "translate(-50%, -0%)",
  },
});

export default function NoResultFound() {
  const classes = useStyles();

  return (
    <Typography
      variant="h4"
      className={classes.noResultHeading}
      color="primary"
    >
      No Result Found!
    </Typography>
  );
}
