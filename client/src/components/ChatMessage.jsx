import React, { Component, useState, useEffect } from "react";

// Import Mui Components
import { Grid, Box, Typography, Paper } from "@material-ui/core";

export default ({ user, text, time, color, userName }) => {
  const rightUser = user === userName.toLowerCase() ? true : false;
  const name = user[0].toUpperCase() + user.slice(1);

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={12}>
          <Box px={2}>
            <Typography
              variant="subtitle2"
              align={rightUser ? "right" : "left"}
            >
              {name}
            </Typography>
          </Box>
          <Grid item xs={12}>
            <Grid container justify={rightUser ? "flex-end" : "flex-start"}>
              <Paper
                variant="outlined"
                style={
                  color
                    ? {
                        justifySelf: "end",
                        border: `2px solid #${color}`,
                        borderRadius: "2rem",
                      }
                    : { border: "2px solid black", borderRadius: "2rem" }
                }
              >
                <Box py={1} px={2}>
                  <Typography
                    variant="body1"
                    align={rightUser ? "right" : "left"}
                  >
                    {text}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box px={2}>
              <Typography variant="body1" align={rightUser ? "right" : "left"}>
                {time}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
