import Router from "@/app/router";
import { ThemeProvider } from "@mui/material/styles";
import { HelmetProvider } from "react-helmet-async";
import useInitialApp from "@/hooks/use-initial-app";
import CssBaseline from "@mui/material/CssBaseline";
import ReactHotToaster from "@/components/ui/react-hot-toaster";
import GoogleOneTapInit from "@/components/auth/google-one-tap-init";
import theme from "./theme";

import "./global.css";

function App() {
  useInitialApp();

  return (
    <ThemeProvider theme={theme}>
      <GoogleOneTapInit />
      <CssBaseline />
      <HelmetProvider>
        <Router />
        <ReactHotToaster />
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;