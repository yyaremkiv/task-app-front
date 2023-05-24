import React, { useState } from "react";
import { LabelItem } from "../../interfaces/DataTypes";
import { Chip, IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";

import { Close as Close } from "@mui/icons-material";

interface ChipProps {
  el: LabelItem;
  removeLabel?: (label: LabelItem) => void;
}

export const Chipp = (props: ChipProps) => {
  const { el, removeLabel } = props;

  return (
    <Chip
      label={el.text}
      size="medium"
      onClick={() => removeLabel && removeLabel(el)}
      sx={{ backgroundColor: el.color, color: "#fff" }}
    />

    // <label
    //   style={{
    //     backgroundColor: el.color,
    //     color: "#fff",
    //     width: "fit-content",
    //     padding: "3px 6px",
    //     borderRadius: "7px",
    //     display: "flex",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //     gap: "7px",
    //   }}
    // >
    //   {el.text}
    //   {removeLabel && (
    //     <Close
    //       fontSize="small"
    //       sx={{ width: "18px", color: "#fff", cursor: "pointer" }}
    //       onClick={() => removeLabel(el)}
    //     />
    //   )}
    // </label>
  );
};
