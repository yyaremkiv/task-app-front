import { styled } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
import { Paper } from "@mui/material";

export const shadow = {
  1: "-1px 2px 3px 2px #00bcd450, 2px 1px 5px 1px #00bcd450, 2px 1px 1px 0px #00bcd450",
  2: "-1px 2px 3px 2px #bf360c50, 2px 1px 5px 1px #bf360c50, 2px 1px 1px 0px #bf360c50",
};

export const GridItem = styled(Paper)(({ theme }: { theme: Theme }) => ({
  boxShadow: theme.palette.mode === "dark" ? shadow[1] : shadow[2],
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
