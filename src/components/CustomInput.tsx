import React, { useState } from "react";
import { Paper, Box, Button, TextField, Stack } from "@mui/material";
import { Add as Add, Close, Done } from "@mui/icons-material/";
import IconButton from "@mui/material/IconButton";

interface CustomInputProps {
  text?: string;
  placeholder: string;
  defaultValue?: string;
  onClickAddBtn: (value: string) => void;
  directionBtn?: string;
  width?: string;
  padding?: string;
  bdRadius?: string;
}

export const CustomInput = (props: CustomInputProps) => {
  const {
    text,
    placeholder,
    defaultValue,
    onClickAddBtn,
    directionBtn,
    padding,
    bdRadius,
  } = props;

  const [isCustomInput, setIsCustomInput] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(defaultValue || "");

  const getTitleBoard = (e: any) => {
    e.preventDefault();

    if (inputText && onClickAddBtn) {
      onClickAddBtn(inputText);
      setInputText("");
    }
    setIsCustomInput(false);
  };

  return (
    <Box display="flex" justifyContent="center">
      {isCustomInput ? (
        <Paper
          elevation={1}
          sx={{
            width: "100%",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            placeholder={placeholder || text}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            autoFocus
            multiline
            maxRows={3}
          />

          <Box
            sx={{
              padding: "3px",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: `${directionBtn || "column"}`,
            }}
          >
            <IconButton
              aria-label="add title board"
              color="primary"
              onClick={getTitleBoard}
            >
              <Done fontSize="medium" />
            </IconButton>
            <IconButton
              aria-label="close"
              color="secondary"
              onClick={() => {
                setIsCustomInput(false);
              }}
            >
              <Close fontSize="medium" />
            </IconButton>
          </Box>
        </Paper>
      ) : (
        // <Box sx={{}}>
        <Button
          fullWidth
          onClick={() => setIsCustomInput(true)}
          // variant="contained"
          size="medium"
          color="inherit"
          sx={{
            borderRadius: { bdRadius },
            padding: { padding },
            "&:hover": { borderRadius: { bdRadius } },
          }}
        >
          {text ? text : <Add />}
        </Button>
        // </Box>
      )}
    </Box>
  );
};
