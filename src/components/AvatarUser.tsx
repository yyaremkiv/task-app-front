import { UserImage } from "./UserImage";
import { Box, Typography } from "@mui/material";
import { useTheme, Theme } from "@mui/material/styles";

export const AvatarUser = ({ username }) => {
  const theme: Theme = useTheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <UserImage size="3rem" />
      <Typography
        sx={{ color: theme.palette.text.primary }}
      >{`Hello, ${username}`}</Typography>
    </Box>
  );
};
