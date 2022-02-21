import { PauseCircleFilled, PlayCircle } from "@mui/icons-material";
import React from "react";
import { useAppContext } from "../../../store/context/appContext";

const PlayPauseBtn: React.FC<{ itemUri: string }> = ({ itemUri }) => {
  const { trackUri, isSongPlaying, setIsSongPlaying, setTrackUri } =
    useAppContext();
  return (
    <React.Fragment>
      {trackUri === itemUri && isSongPlaying === true ? (
        <span onClick={() => setIsSongPlaying(false)}>
          <PauseCircleFilled />
        </span>
      ) : (
        <span
          onClick={() => {
            trackUri === itemUri
              ? setIsSongPlaying(true)
              : setTrackUri(itemUri && itemUri);
          }}
        >
          <PlayCircle />
        </span>
      )}
    </React.Fragment>
  );
};

export default PlayPauseBtn;
