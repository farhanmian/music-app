import { createTheme } from "@material-ui/core";

const theme = createTheme({
  typography: {
    fontFamily: "lato",

    h1: {
      fontSize: 64,
      lineHeight: "52px",
      fontWeight: "bold",
    },

    h2: {
      fontSize: 50,
      lineHeight: "61px",
      fontWeight: "bold",
    },

    h3: {
      fontSize: 48,
      lineHeight: "64px",
      fontWeight: "bold",
    },
    h4: {
      fontSize: 36,
      lineHeight: "34px",
      fontWeight: "bold",
    },
    // heading 5 - used in nav for website name
    h5: {
      fontSize: 28,
      lineHeight: "34px",
      fontWeight: "bold",
    },
    h6: {
      fontSize: 24,
      // lineHeight: "52px",
      lineHeight: "30px",
      fontWeight: "bold",
    },
    body1: {
      fontSize: 20,
      lineHeight: "15px",
      fontWeight: 400,
    },
    // used in many places for eg: product short descriptiondescription
    body2: {
      fontSize: 16,
      lineHeight: "25px",
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: 18,
      lineHeight: "32px",
      fontWeight: "bold",
    },
    subtitle2: {
      fontSize: 16,
      lineHeight: "15px",
      fontWeight: 400,
    },
    caption: {
      fontSize: 14,
      lineHeight: "15px",
      fontWeight: 400,
    },
    overline: {
      fontSize: 12,
      lineHeight: "15px",
    },
  },
  palette: {
    primary: {
      main: "#fff",
      dark: "#efefef",
    },
    secondary: {
      main: "#848484",
    },
    text: {
      primary: "#afafaf",
      secondary: "#99999F",
    },
  },
});

export default theme;

//origial dark: "#EC2F80" ;
