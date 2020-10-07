import React, { Component } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import { Grid, Box, Typography, Avatar } from "@material-ui/core";

export default ({ user, text, color, userName }) => {
  const rightUser = user === userName.toLowerCase() ? true : false;
  const name = user[0].toUpperCase() + user.slice(1);

  return (
    <Grid item xs={12}>
      <Box px={2}>
        <Grid container alignItems="center">
          <Avatar
            style={{
              backgroundColor: `#${color}`,
              width: theme.spacing(1),
              height: theme.spacing(1),
            }}
          >
            {" "}
          </Avatar>
          <Box ml={1}>
            <Typography variant="body1">{text}</Typography>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};
