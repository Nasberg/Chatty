import React, { Component, useState } from "react";
import { Link, NavLink } from "react-router-dom";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  Grid,
  Box,
  TextField,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  FormControl,
  Paper,
} from "@material-ui/core";

// Color Data
const colData = [
  ["Blue", "304ffe"],
  ["Red", "ff1744"],
  ["Green", "00b248"],
  ["Purple", "6200ea"],
  ["Yellow", "ffff00"],
  ["Pink", "ffc1e3"],
  ["Cyan", "18ffff"],
  ["Orange", "ff6e40"],
];

export default (props) => {
  document
    .querySelector("body")
    .setAttribute("style", "margin: 0; padding: 0; background-color: #ffc1e3");

  const [userName, setUserName] = useState("");
  const [userRoom, setUserRoom] = useState("");
  const [userColor, setUserColor] = useState(colData[0][1]);

  const handleUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleUserRoom = (event) => {
    setUserRoom(event.target.value);
  };

  const handleUserColor = (event) => {
    setUserColor(event.target.value);
  };

  const handleEnterChatRoom = (event) => {
    return !userName || !userRoom ? event.preventDefault() : null;
  };

  const [menuTabs, setMenuTabs] = useState(0);

  const handleMenuTabs = (event, newValue) => {
    setMenuTabs(newValue);
  };

  return (
    <Box mt="20%" px={4}>
      <Grid container alignItems="center" justify="center" spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            <Box fontWeight="fontWeightBold">Welcome to Chatty</Box>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Name"
              value={userName}
              onChange={handleUserName}
              onKeyPress={(event) =>
                event.key === "Enter" ? handleEnterChatRoom(event) : null
              }
              style={{ backgroundColor: "white", borderRadius: ".3rem" }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <TextField
              fullWidth
              variant="outlined"
              label="Room"
              onChange={handleUserRoom}
              onKeyPress={(event) =>
                event.key === "Enter" ? handleEnterChatRoom(event) : null
              }
              style={{ backgroundColor: "white", borderRadius: ".3rem" }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            style={{ backgroundColor: "white", borderRadius: ".3rem" }}
          >
            <Select
              variant="outlined"
              fullWidth
              value={userColor}
              onChange={handleUserColor}
            >
              {colData.map((item, i) => (
                <MenuItem key={`color-select-${i}`} value={item[1]}>
                  <Grid container alignItems="center">
                    <Avatar
                      style={{
                        backgroundColor: `#${item[1]}`,
                        width: theme.spacing(3),
                        height: theme.spacing(3),
                      }}
                    >
                      {" "}
                    </Avatar>
                    <Box ml={1}>{item[0]}</Box>
                  </Grid>
                </MenuItem>
              ))}
            </Select>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <NavLink
            onClick={handleEnterChatRoom}
            to={`/chat?name=${userName}&room=${userRoom}&color=${userColor}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained" fullWidth color="primary" size="large">
              Enter chat room
            </Button>
          </NavLink>
        </Grid>
      </Grid>
    </Box>
  );
};
