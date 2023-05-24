import React from "react";
import { Box, Paper } from "@mui/material";
import { ItemCardInfoBG } from "../style/styles/styles";

export const Modal = (props: any) => {
  return (
    <Paper
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 15,
      }}
      onClick={() => (props.onClose ? props.onClose() : "")}
    >
      <Box
        sx={{
          maxWidth: "600px",
          padding: "30px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <ItemCardInfoBG
          sx={{
            padding: "36px 26px",
          }}
          onClick={(event: any) => event.stopPropagation()}
        >
          {props.children}
        </ItemCardInfoBG>
      </Box>
    </Paper>
  );
};
