import React, { Component, useEffect, useState } from "react";

// Import Mui Components
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@material-ui/core";

export default ({ error, setError }) => {
  const [open, setOpen] = useState(error !== "" ? true : false);

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  useEffect(() => {
    error !== "" ? setOpen(true) : setOpen(false);
  }, [error]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Box px={4} py={3} style={{ border: "6px solid #c62828" }}>
        <Typography variant="h4">
          <Box fontWeight="fontWeightBold">Error!</Box>
        </Typography>
        <Box my={1}>
          <Divider />
        </Box>
        <Typography variant="body1">{error}</Typography>
        <Box my={1}>
          <Divider />
        </Box>
        <Button fullWidth variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Dialog>
  );
};
