import Router from "@/app/router";
import { ThemeProvider } from "@mui/material/styles";
import { HelmetProvider } from "react-helmet-async";
import useInitialApp from "@/hooks/use-initial-app";
import CssBaseline from "@mui/material/CssBaseline";
import ReactHotToaster from "@/components/ui/react-hot-toaster";
import theme from "./theme";

import "./global.css";

function App() {
  useInitialApp();

  return (
    <ThemeProvider theme={theme} defaultMode="dark">
      <CssBaseline />
      <HelmetProvider>
        <Router />
        <ReactHotToaster />
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;