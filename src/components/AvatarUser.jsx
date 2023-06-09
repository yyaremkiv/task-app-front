import { Box, Typography } from "@mui/material";
import { UserImage } from "./UserImage";

export const AvatarUser = ({ username }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <UserImage size="3rem" />
      <Typography>{`Hello, ${username}`}</Typography>
    </Box>
  );
};
