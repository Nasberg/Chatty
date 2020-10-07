import React from "react";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[500],
      light: "#ff6090",
      dark: "#b0003a",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
