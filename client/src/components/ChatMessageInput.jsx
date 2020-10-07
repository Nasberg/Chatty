import React, { Component } from "react";

// Import Mui Components
import {
  Grid,
  Paper,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";

// Import Mui Icons
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import theme from "../styles/theme";

export default ({ userMessage, handleUserMessage, sendMessage, loading }) => (
  <Grid container style={{ position: "fixed", bottom: 0 }}>
    <Grid item xs={12}>
      <Paper elevation={18} square style={{ backgroundColor: "#ffc1e3" }}>
        <Box p={2}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                placeholder="Type a message..."
                value={userMessage}
                onChange={handleUserMessage}
                onKeyPress={(event) =>
                  event.key === "Enter" ? sendMessage() : null
                }
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                endIcon={
                  loading ? (
                    <CircularProgress
                      size={theme.spacing(2)}
                      style={{ color: "white" }}
                    />
                  ) : (
                    <SendOutlinedIcon />
                  )
                }
                onClick={sendMessage}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  </Grid>
);
