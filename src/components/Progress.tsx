import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Progress = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        backgroundColor: "#398d9032",
        zIndex: 25,
      }}
    >
      <CircularProgress />
    </Box>
  );
};
