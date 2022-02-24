import { Link, Typography } from "@material-ui/core";
import React from "react";
import styles from "./RightClickOptions.module.css";

const RightClickOptions = () => {
  return (
    <div className={styles.rightClickOptionContainer}>
      <Link>
        <Typography color="primary" variant="subtitle2">
          Play
        </Typography>
      </Link>
      <Link>
        <Typography color="primary" variant="subtitle2">
          Pause
        </Typography>
      </Link>
      <Link>
        <Typography color="primary" variant="subtitle2">
          Add To Favorite
        </Typography>
      </Link>
      <Link>
        <Typography color="primary" variant="subtitle2">
          Remove From Favorite
        </Typography>
      </Link>
      <Link>
        <Typography color="primary" variant="subtitle2">
          Delete
        </Typography>
      </Link>
    </div>
  );
};

export default RightClickOptions;
