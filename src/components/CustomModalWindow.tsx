import { ReactElement } from "react";
import { useTheme, Theme } from "@mui/material/styles";
import { Box, Modal, ModalProps } from "@mui/material";

interface CustomModalWindowProps extends Omit<ModalProps, "children"> {
  open: boolean;
  onCloseFunc: (value: boolean) => void;
  children: ReactElement<any, string | React.JSXElementConstructor<any>>;
}
export const CustomModalWindow: React.FC<CustomModalWindowProps> = ({
  open,
  onCloseFunc,
  children,
}) => {
  const theme: Theme = useTheme();

  const handleClose = () => onCloseFunc(false);

  return (
    <Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            maxWidth: "50vw",
            maxHeight: "85vh",
            overflowY: "auto",
            padding: "1rem",
            backgroundColor: theme.palette.background.light,
            borderRadius: "0.5rem",
            transform: "translate(-50%, -50%)",
          }}
        >
          {children}
        </Box>
      </Modal>
    </Box>
  );
};
