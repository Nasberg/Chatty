import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";

// Import Styles
import theme from "./styles/theme";

// Import Mui Components
import { ThemeProvider } from "@material-ui/core";

// Import App Components
import HomeContainer from "./components/HomeContainer";
import ChatContainer from "./components/ChatContainer";
import ErrorDialog from "./components/ErrorDialog";

export default () => {
  const [error, setError] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" exact component={HomeContainer} />
        <Route
          path="/chat"
          render={({ location }) => (
            <ChatContainer location={location} setError={setError} />
          )}
        />
        <ErrorDialog error={error} setError={setError} />
      </BrowserRouter>
    </ThemeProvider>
  );
};
