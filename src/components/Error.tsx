import * as React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";

export const Error = ({ error }: any) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        backgroundColor: "#92402c31",
        zIndex: 7,
      }}
    >
      <Alert
        severity="error"
        sx={{ minWidth: "200px", display: "flex", justifyContent: "center" }}
      >
        <AlertTitle>Error</AlertTitle>
        {error}
      </Alert>
    </Box>
  );
};
