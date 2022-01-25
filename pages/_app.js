import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core";
import theme from "../theme";
import Layout from "../components/partials/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
