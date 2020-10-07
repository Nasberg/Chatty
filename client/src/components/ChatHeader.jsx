import React, { Component, useState } from "react";

// Import Mui Components
import {
  Grid,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Paper,
  Button,
  Divider,
} from "@material-ui/core";

// Import Mui Icons
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

export default ({ userRoom, participants }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container style={{ position: "fixed", top: 0, zIndex: 1000 }}>
      <Grid item xs={12}>
        <Paper elevation={5} square style={{ backgroundColor: "#ffc1e3" }}>
          <Box p={2}>
            <Grid container alignItems="center">
              <Typography variant="h6">
                <Box fontWeight="fontWeightBold">{userRoom}</Box>
              </Typography>
              <Box ml="auto">
                <IconButton color="primary" onClick={handleClick}>
                  <MoreHorizOutlinedIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Box px={2}>
                    <Typography variant="body2" align="right">
                      <Box fontWeight="fontWeightBold">Participants:</Box>
                    </Typography>
                  </Box>
                  {participants.map((item, i) => (
                    <MenuItem key={i} onClick={handleClose}>
                      <Box ml="auto">
                        <Avatar
                          style={{
                            backgroundColor: `#${item.color}`,
                            color: "black",
                          }}
                        >
                          {item.name[0].toUpperCase()}
                        </Avatar>
                      </Box>
                    </MenuItem>
                  ))}
                  <Divider />
                  <Box px={2} py={1}>
                    <Button
                      href="/"
                      variant="outlined"
                      color="primary"
                      endIcon={<ExitToAppOutlinedIcon />}
                    >
                      Leave room
                    </Button>
                  </Box>
                </Menu>
              </Box>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
