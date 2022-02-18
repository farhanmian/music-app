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
    setAccessToken(token);
    setExpiresIn(expires);
    setRefreshToken(refresh);

    const accessTimeHour = +localStorage.getItem("accessTimeHour");
    const accessTimeMinute = +localStorage.getItem("accessTimeMinute");
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();

    const timePassed =
      (currentHour - accessTimeHour) * 60 + (currentMinute - accessTimeMinute);

    //in sec
    setPassedTime(timePassed * 60 + 60);
  }, []);

  // passedTime - 60;
  const timeLeft = expiresIn - passedTime;
  console.log("passedTime", `${passedTime / 60}min`);
  console.log("time-left", `${timeLeft / 60}min`);

  /**
   * managing login
   */
  useEffect(() => {
    if (!code) return;

    axios
      .post("http://localhost:3001/login", {
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
        router.reload();
        // window.location.pathname = "/";
      });
  }, [code]);

  /**
   * refreshing token whenever it expires
   */
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          setPassedTime(0);

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
    }, (expiresIn - (passedTime - 60)) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
