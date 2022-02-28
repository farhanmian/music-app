import { Button, Typography, makeStyles, Link } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../store/context/appContext";
import styles from "./RightClickOptions.module.css";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";

const useStyles = makeStyles({
  btn: {
    textTransform: "capitalize",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 5,
  },
  link: {
    cursor: "pointer",
  },
});

const RightClickOptions: React.FC<{
  options: string[];
  id: string;
  uri: string;
  type: string;
  artists: { id: string; name: string }[];
}> = ({ options, id, uri, type, artists }) => {
  const classes = useStyles();
  const {
    setTrackUri,
    setIsSongPlaying,
    trackUri,
    spotifyApiCtx,
    accessToken,
    setUserSavedTracks,
    userSavedTracks,
    userSavedAlbums,
    setUserSavedAlbums,
  } = useAppContext();
  const [selectedOption, setSelectedOption] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!accessToken || !spotifyApiCtx) return;
    if (selectedOption === "play") {
      trackUri === uri && setIsSongPlaying(true);
      trackUri !== uri && setTrackUri(uri);
    }
    if (selectedOption === "pause") {
      setIsSongPlaying(false);
    }
    if (selectedOption === "remove from favorite" && type === "track") {
      if (userSavedTracks.length === 0) return;
      spotifyApiCtx.removeFromMySavedTracks([id]);
      const updatedSavedTracks = userSavedTracks.filter((item) => item !== id);
      setUserSavedTracks(updatedSavedTracks);
    }
    if (selectedOption === "open" && type === "album") {
      router.push(`/album/${id}`);
    }
    if (selectedOption === "remove from favorite" && type === "album") {
      if (userSavedTracks.length === 0) return;
      spotifyApiCtx.removeFromMySavedAlbums([id]);
      const updatedSavedAlbums = userSavedAlbums.filter((item) => item !== id);
      setUserSavedAlbums(updatedSavedAlbums);
    }
  }, [selectedOption, accessToken, spotifyApiCtx]);

  return (
    <div className={styles.rightClickOptionContainer}>
      <div className={styles.innerContainer}>
        {options.map((btn) => {
          return (
            <Button
              key={btn}
              className={classes.btn}
              onClick={() => setSelectedOption(btn)}
            >
              <Typography color="primary" variant="subtitle2">
                {btn}
              </Typography>
            </Button>
          );
        })}

        {artists && (
          <div className={styles.artistContainer}>
            <Typography color="primary" variant="body2">
              Go To Artists:
            </Typography>
            {artists &&
              artists.map((item) => {
                return (
                  <NextLink key={item.id} href={`/artist/${item.id}`}>
                    <Link className={classes.link}>{item.name}</Link>
                  </NextLink>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RightClickOptions;
