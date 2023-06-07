import { styled } from "@mui/material/styles";
import { Paper, Box } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { shadow } from "./GridItem";
import { blueGrey } from "@mui/material/colors";

export const ItemAddBoardBtn = styled(Paper)(({ theme }: { theme: Theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.secondary.main,
  ...theme.typography.button,
  textAlign: "center",
  color: theme.palette.primary.contrastText,
  position: "fixed",
  bottom: "30px",
  right: "30px",
  borderRadius: "50%",
  zIndex: 10,
}));

export const ItemAddCardBtn = styled(Paper)(({ theme }: { theme: Theme }) => ({
  border:
    theme.palette.mode === "dark"
      ? `1px solid ${theme.palette.primary.dark}`
      : `1px solid ${theme.palette.secondary.light}`,
  ...theme.typography.button,
  textAlign: "center",
  color:
    theme.palette.mode === "dark"
      ? theme.palette.primary.main
      : theme.palette.secondary.main,
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#26a69a" : "#ff7043",
    color: theme.palette.primary.contrastText,
  },
  transition: "all 100ms linear",
}));

export const ItemCardInfoBG = styled(Box)(({ theme }: { theme: Theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? blueGrey[900] : blueGrey[100],
  boxShadow: theme.palette.mode === "dark" ? shadow[1] : shadow[2],
  borderRadius: "30px",
  color:
    theme.palette.mode === "dark"
      ? theme.palette.primary.contrastText
      : theme.palette.secondary.contrastText,
}));

export const ItemCardInfo = styled(Paper)(() => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
}));

export const WrapperBurgerMenu = styled(Box)(({ theme }: { theme: Theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));
