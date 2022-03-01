import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import { useRouter } from "next/dist/client/router";

const spotifyApi = new SpotifyWebApi({
  clientId: "e6719168da3047aaa2b0b9be996612f2",
});

const AppContext = createContext({
  code: null,
  accessToken: null,
  spotifyApiCtx: null,
  userInfo: null,
  searchValue: null,
  setSearchValue: null,
  searchType: null,
  setSearchType: null,
  trackUri: null,
  setTrackUri: null,
  isSongPlaying: null,
  setIsSongPlaying: null,
  setCurrentSongName: null,
  currentSongName: null,
  userSavedTracks: null,
  setUserSavedTracks: null,
  userSavedAlbums: null,
  setUserSavedAlbums: null,
});

export const AppWrapper = ({ children }) => {
  const router = useRouter();
  const [code, setCode] = useState(null);

  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);
  const [spotifyApiCtx, setSpotifyApiCtx] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("songs");
  const [trackUri, setTrackUri] = useState(null);
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [currentSongName, setCurrentSongName] = useState("");
  const [passedTime, setPassedTime] = useState(0);
  const [userSavedTracks, setUserSavedTracks] = useState([]);
  const [userSavedAlbums, setUserSavedAlbums] = useState([]);

  /**
   * setting code
   */
  useEffect(() => {
    const fetchedCode = new URLSearchParams(window.location.search).get("code");
    setCode(fetchedCode);
  }, []);

  /**
   * getting access-token and other info from localstorage
   */
  useEffect(() => {
    const token = localStorage.getItem("access");
    const expires = localStorage.getItem("expiresIn");
    const refresh = localStorage.getItem("refreshToken");

    if (!token || !expires || !refresh) {
      localStorage.clear();
      router.push("/");
      return;
    }

    const accessTimeHour = +localStorage.getItem("accessTimeHour");
    const accessTimeMinute = +localStorage.getItem("accessTimeMinute");
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    const timePassed = Math.abs(
      (currentHour - accessTimeHour) * 60 + (currentMinute - accessTimeMinute)
    );

    setRefreshToken(refresh);
    setExpiresIn(expires);
    //in sec
    if (timePassed > 60) {
      setPassedTime(59.99 * 60);
      return;
    }

    setAccessToken(token);

    setPassedTime(timePassed * 60 + 60);
  }, []);

  // console.log("passedTime", passedTime / 60, "min");
  // console.log("timeLeft", expiresIn - passedTime, "sec");

  /**
   * managing login
   */
  useEffect(() => {
    if (!code) return;

    axios
      .post("https://nextjs-music-app-server.herokuapp.com/login", {
        code,
      })
      .then((res) => {
        console.log(res);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        console.log(res.data.expiresIn);
        console.log("log in successfully");

        const hours = `${new Date().getHours()}`;
        const minutes = `${new Date().getMinutes()}`;

        localStorage.setItem("access", res.data.accessToken);
        localStorage.setItem("expiresIn", res.data.expiresIn);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        localStorage.setItem("accessTimeHour", hours);
        localStorage.setItem("accessTimeMinute", minutes);
        // window.history.pushState({}, null, "/spiderman");
      })
      .catch((err) => {
        console.log(err);
        // router.reload();
        // window.location.pathname = "/";
      });
  }, [code]);

  /**
   * refresh token function
   */
  const refreshTokenHandler = () => {
    if (passedTime < 3500) return;
    axios
      .post("https://nextjs-music-app-server.herokuapp.com/refresh", {
        refreshToken,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setExpiresIn(res.data.expiresIn);

        console.log("refreshed");
        setPassedTime(60);

        const hours = `${new Date().getHours()}`;
        const minutes = `${new Date().getMinutes()}`;

        localStorage.setItem("access", res.data.accessToken);
        localStorage.setItem("expiresIn", res.data.expiresIn);
        localStorage.setItem("accessTimeHour", hours);
        localStorage.setItem("accessTimeMinute", minutes);
      })
      .catch((err) => {
        console.log(err);
        window.location.pathname = "/";
      });
  };

  /**
   * refreshing token whenever it expires
   */
  useEffect(() => {
    if (!refreshToken || !expiresIn || passedTime < 3500) return;

    const interval = setInterval(() => {
      refreshTokenHandler();
      console.log("refreshed now");
    }, (expiresIn - passedTime) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn, passedTime]);

  /**
   * setting spotify accessToken
   */
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    setSpotifyApiCtx(spotifyApi);
  }, [accessToken]);

  /**
   * getting user info
   */
  useEffect(() => {
    if (!accessToken) return;

    spotifyApi
      .getMe()
      .then((res) => {
        console.log(res);
        const userData = {
          name: res.body.display_name,
          email: res.body.email,
          followers: res.body.followers,
          id: res.body.id,
          image: res.body.images.pop(),
          product: res.body.product,
        };
        setUserInfo(userData);
      })
      .catch((err) => {
        console.log(err);
        refreshTokenHandler();
      });
  }, [accessToken]);

  /**
   * getting user save albums and tracks
   */
  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getMySavedTracks().then((res) => {
      const transformedData: string[] = [];
      res.body.items.map((item) => {
        transformedData.push(item.track.id);
      });
      setUserSavedTracks(transformedData);
    });

    spotifyApi.getMySavedAlbums().then((res) => {
      const transformedData: string[] = [];
      res.body.items.map((item) => {
        transformedData.push(item.album.id);
      });
      setUserSavedAlbums(transformedData);
    });
  }, [accessToken]);

  return (
    <AppContext.Provider
      value={{
        code,
        accessToken,
        spotifyApiCtx,
        userInfo,
        searchValue,
        setSearchValue,
        searchType,
        setSearchType,
        trackUri,
        setTrackUri,
        isSongPlaying,
        setIsSongPlaying,
        setCurrentSongName,
        currentSongName,
        userSavedTracks,
        setUserSavedTracks,
        userSavedAlbums,
        setUserSavedAlbums,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
