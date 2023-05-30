import React from "react";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Box } from "@mui/material";

interface ModeProps {
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  matches: boolean;
}

export const Mode = ({ mode, setMode, matches }: ModeProps) => {
  return (
    <Box onClick={() => setMode(mode === "light" ? "dark" : "light")}>
      <IconButton sx={{ color: "#fff" }}>
        {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}{" "}
      </IconButton>
      {matches ? "Change mood" : null}
    </Box>
  );
};
