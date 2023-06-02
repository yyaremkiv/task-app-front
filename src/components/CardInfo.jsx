import { Modal } from "./Modal";
import { Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material/";

import { ModalCardInfo } from "./ModalCardInfo";

export const CardInfo = ({ card, boardId, onCLose, updateCard }) => {
  const handleUpdateCard = (dataCard) => {
    const updatedCard = { id: card.id, ...dataCard };
    updateCard({ boardId, cardId: card.id, updatedCard });
  };

  return (
    <Modal onClose={onCLose}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="16px"
      >
        <Typography variant="h5" gutterBottom color="inherit" marginBottom={0}>
          Card Information
        </Typography>

        <IconButton
          aria-label="close"
          color="inherit"
          sx={{ backgroundColor: "inherit", borderRadius: "50%" }}
          onClick={() => {
            onCLose();
          }}
        >
          <Close fontSize="medium" />
        </IconButton>
      </Box>

      <ModalCardInfo card={card} updateCard={handleUpdateCard} />
    </Modal>
  );
};
