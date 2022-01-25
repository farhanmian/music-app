import { createTheme } from "@material-ui/core";

const theme = createTheme({
  typography: {
    fontFamily: "lato",

    h1: {
      fontSize: 64,
      letterSpacing: "-20",
      lineHeight: "52px",
      fontWeight: "bold",
    },

    h2: {
      fontSize: 50,
      letterSpacing: "6",
      lineHeight: "61px",
      fontWeight: "bold",
    },

    h3: {
      fontSize: 48,
      letterSpacing: "20",
      lineHeight: "64px",
      fontWeight: "bold",
    },
    h4: {
      fontSize: 36,
      letterSpacing: "10",
      lineHeight: "34px",
      fontWeight: "bold",
    },
    // heading 5 - used in nav for website name
    h5: {
      fontSize: 28,
      letterSpacing: "4",
      lineHeight: "34px",
      fontWeight: "bold",
    },
    h6: {
      fontSize: 24,
      letterSpacing: "10",
      lineHeight: "52px",
      fontWeight: "bold",
    },
    body1: {
      fontSize: 20,
      letterSpacing: "16",
      lineHeight: "35px",
      fontWeight: 400,
    },
    // used in many places for eg: product short descriptiondescription
    body2: {
      fontSize: 16,
      letterSpacing: "10",
      lineHeight: "19px",
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: 18,
      letterSpacing: "6",
      lineHeight: "32px",
      fontWeight: "bold",
    },
    subtitle2: {
      fontSize: 16,
      letterSpacing: "6",
      lineHeight: "32px",
      fontWeight: 400,
    },
    caption: {
      fontSize: 14,
      letterSpacing: "10",
      lineHeight: "17px",
      fontWeight: 400,
    },
    overline: {
      fontSize: 12,
      letterSpacing: "6",
      lineHeight: "32px",
    },
  },
  palette: {
    primary: {
      main: "#fff",
      dark: "#efefef",
    },
    secondary: {
      main: "#FB2E86", // pink
      dark: "#F21E79",
      // dark: "#FF1B7D",
    },
    text: {
      primary: "#afafaf",
      secondary: "#000",
    },
  },
});

export default theme;

//origial dark: "#EC2F80" ;
