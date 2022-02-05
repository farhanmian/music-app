import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core";
import theme from "../theme";
import Layout from "../components/partials/Layout/Layout";
import { AppWrapper } from "../store/context/appContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default MyApp;
