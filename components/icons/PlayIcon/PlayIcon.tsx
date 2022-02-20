import React from "react";
import styles from "./PlayIcon.module.css";
import { PlayCircle } from "@mui/icons-material";

const PlayIcon = (onClick) => {
  return (
    <span className={styles.icon} onClick={onClick}>
      <PlayCircle />
    </span>
  );
};

export default PlayIcon;
