import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";

export const Dropdown = (props: any) => {
  const dropdownRef: any = useRef(null);

  console.log("props", props);
  const handleClick = (e: any) => {
    if (
      dropdownRef &&
      !dropdownRef.current?.contains(e.currentTarget) &&
      props.onClose
    ) {
      props.onClose();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 0);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <Box
      ref={dropdownRef}
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "5px",
        border: " 1px solid gray",
      }}
    >
      {props.children}
    </Box>
  );
};
