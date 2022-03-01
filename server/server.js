/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

/**
 * getting authorization
 */
app.post("/login", (req, res) => {
  // we are gonna put this into .env file

  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "https://music-app-sable-chi.vercel.app/",
    clientId: "e6719168da3047aaa2b0b9be996612f2",
    clientSecret: "043093ab17244248a0a8a5b41b7ab523",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log("error");
      console.log(err);
    });
});

app.post("/refresh", (req, res) => {
  console.log("refreshed");
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "https://music-app-sable-chi.vercel.app/",
    clientId: "e6719168da3047aaa2b0b9be996612f2",
    clientSecret: "043093ab17244248a0a8a5b41b7ab523",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log("error from refreshToken (server.js)");
      console.log(err);
    });
});

app.listen("https://music-app-sable-chi.vercel.app/");
