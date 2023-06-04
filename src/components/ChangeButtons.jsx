import { Box, CircularProgress, IconButton } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

export const ChangeButtons = ({
  valueForSubmit,
  changeFunc,
  closeFunc,
  isLoading = false,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        padding: "0.25rem",
      }}
    >
      <IconButton
        onClick={() => {
          changeFunc(valueForSubmit);
          closeFunc(false);
        }}
      >
        {isLoading ? (
          <CircularProgress size={25} />
        ) : (
          <DoneIcon sx={{ color: "green" }} />
        )}
      </IconButton>
      <IconButton onClick={() => closeFunc(false)}>
        <CloseIcon sx={{ color: isLoading ? null : "red" }} />
      </IconButton>
    </Box>
  );
};
