import React, { Component } from "react";
import ScrollToBottom, { useScrollToBottom } from "react-scroll-to-bottom";

// Import Mui Components
import { Grid, Box, Paper, Typography } from "@material-ui/core";

// Import App Components
import ChatMessage from "./ChatMessage";
import ChatNotification from "./ChatNotification";

export default ({ error, messages, userName, userTyping }) => {
  const scrollToBottom = useScrollToBottom();

  return (
    <Grid
      container
      style={{ position: "absolute", top: "5rem", paddingBottom: "5rem" }}
    >
      <Grid item xs={12}>
        <Box p={2}>
          <Grid container spacing={1}>
            {error ? (
              <Grid item xs={12}>
                <Paper
                  variant="outlined"
                  style={{ border: "2px solid #ff1744", borderRadius: "2rem" }}
                >
                  <Box p={2}>
                    <Typography variant="body1">Error: {error}</Typography>
                  </Box>
                </Paper>
              </Grid>
            ) : (
              <>
                {messages.map((item, i) =>
                  item.type === "message" ? (
                    <ChatMessage
                      key={`message-${i}`}
                      user={item.user}
                      text={item.text}
                      time={item.time}
                      color={item.color}
                      userName={userName}
                    />
                  ) : item.type === "notification" ? (
                    <ChatNotification
                      key={`notification-${i}`}
                      user={item.user}
                      text={item.text}
                      color={item.color}
                      userName={userName}
                    />
                  ) : null
                )}
                {userTyping.map((item, i) => (
                  <ChatNotification
                    key={`user-typing-${i}`}
                    user={item.user}
                    text={`${
                      item.user[0].toUpperCase() + item.user.slice(1)
                    } is typing...`}
                    color={item.color}
                    userName={userName}
                  />
                ))}
              </>
            )}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};
