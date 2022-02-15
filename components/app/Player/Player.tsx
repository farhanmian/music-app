import React, { useEffect } from "react";
import styles from "./Player.module.css";
import SpotifyWebPlayer from "react-spotify-web-playback";
import { useAppContext } from "../../../store/context/appContext";

const Player = () => {
  const {
    accessToken,
    trackUri,
    isSongPlaying,
    setIsSongPlaying,
    setCurrentSongName,
  } = useAppContext();

  useEffect(() => {
    setIsSongPlaying(true);
    console.log(trackUri);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <div
      style={{ visibility: trackUri ? "visible" : "hidden" }}
      className={styles.player}
    >
      <SpotifyWebPlayer
        styles={{
          bgColor: "rgb(58 58 61 / 65%)",
          color: "#fff",
          sliderHandleColor: "#1ED760",
          // sliderTrackColor: "#1ED760",
          sliderColor: "#1ED760",
          trackNameColor: "#fff",
          trackArtistColor: "#99999F",
          height: 70,
        }}
        token={accessToken}
        showSaveIcon
        callback={(state) => {
          setCurrentSongName(state.track.name);
          if (!state.isPlaying) setIsSongPlaying(false);
        }}
        uris={trackUri ? [trackUri] : []}
        play={isSongPlaying}
      />
    </div>
  );
};

export default Player;
