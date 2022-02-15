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
  activeNavLinkCtx: "genres",
  setActiveNavLinkCtx: null,
  searchValue: null,
  setSearchValue: null,
  searchType: null,
  setSearchType: null,
});

export const AppWrapper = ({ children }) => {
  const router = useRouter();
  const [code, setCode] = useState(null);

  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);
  const [spotifyApiCtx, setSpotifyApiCtx] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [activeNavLinkCtx, setActiveNavLinkCtx] = useState("genres");
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("songs");

  /**
   * setting code
   */
  useEffect(() => {
    const fetchedCode = new URLSearchParams(window.location.search).get("code");
    setCode(fetchedCode);
  }, []);

  /**
   * managing login
   */
  useEffect(() => {
    if (router.pathname !== "/") {
      if (!code) {
        router.push(
          "https://accounts.spotify.com/authorize?client_id=e6719168da3047aaa2b0b9be996612f2&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
        );
      }
    }
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
        console.log("log in successfully");

        // window.history.pushState({}, null, "/spiderman");
      })
      .catch((err) => {
        console.log(err);
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
        })
        .catch((err) => {
          console.log(err);
          window.location.pathname = "/";
        });
    }, (expiresIn - 60) * 1000);

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
    if (!code || !accessToken) return;

    spotifyApi
      .getMe()
      .then((res) => {
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
  }, [code, accessToken]);

  return (
    <AppContext.Provider
      value={{
        code,
        accessToken,
        spotifyApiCtx,
        userInfo,
        activeNavLinkCtx,
        setActiveNavLinkCtx,
        searchValue,
        setSearchValue,
        searchType,
        setSearchType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
