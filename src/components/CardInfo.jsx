import { useEffect, useState } from "react";
import { CardItem, LabelItem, TaskItem } from "../interfaces/DataTypes";
import { Modal } from "./Modal";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Checkbox,
  ListItemIcon,
  Grid,
} from "@mui/material";
import {
  Title,
  Description,
  CalendarMonth,
  AssignmentTurnedIn,
  Close,
  BookmarkBorder,
  Bookmark,
} from "@mui/icons-material/";
import { DateCalendar } from "./Calendar";
import { colorList } from "../data/dataUtility";
import { CustomInput } from "./CustomInput";
import { Chipp } from "./Chipp";
import { ItemAddCardBtn, ItemCardInfo } from "./styles";
import { deepOrange } from "@mui/material/colors";

import CardHandler from "../helpers/cardHandler";
import { ModalCardInfo } from "./ModalCardInfo";
import { useDispatch } from "react-redux";

// interface CardInfoProps {
//   card: CardItem;
//   boardId: number;
//   onCLose: () => void;
//   updateCard: (boardId: number, cardId: number, card: CardItem) => void;
// }

export const CardInfo = (props) => {
  const { card, boardId, onCLose, updateCard } = props;
  const [selectedColor, setSelectedColor] = useState("#00796b");
  const [cardValues, setCardValues] = useState({
    ...card,
  });

  const handleUpdateCard = (dataCard) => {
    const updatedCard = { id: card.id, ...dataCard };
    updateCard({ boardId, cardId: card.id, updatedCard });
  };

  const updateTitle = (value) => {
    setCardValues({ ...cardValues, title: value });
  };

  const updateDescript = (value) => {
    setCardValues({ ...cardValues, desc: value });
  };

  //--------------- add and remove label
  const addLabel = (label) => {
    const { labels } = cardValues;

    const index = labels.findIndex((el) => el.text === label.text);

    if (index > -1) return;

    setSelectedColor("#00796b");

    setCardValues((prevCardValues) => ({
      ...prevCardValues,
      labels: [...prevCardValues.labels, label],
    }));
  };

  const removeLabel = (label) => {
    const tempLabels = cardValues.labels.filter((el) => el.text !== label.text);
    setCardValues({ ...cardValues, labels: tempLabels });
  };

  //--------------------- add, remove & update new task
  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setCardValues({ ...cardValues, tasks: [...cardValues.tasks, task] });
  };

  const removeTask = (id) => {
    const tasks = [...cardValues.tasks];

    const tempTasks = tasks.filter((el) => {
      return el.id !== id;
    });
    setCardValues({ ...cardValues, tasks: tempTasks });
  };

  const checkDoneTask = (id, value) => {
    const tasks = [...cardValues.tasks];

    const index = tasks.findIndex((el) => {
      return el.id === id;
    });
    if (index < 0) return;

    tasks[index].completed = Boolean(value);

    setCardValues({ ...cardValues, tasks });
  };

  // ------------ update date
  const updateDate = (date) => {
    if (!date) {
      return;
    }
    setCardValues({ ...cardValues, date });
  };

  // for checkbox MUI
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // useEffect(() => {
  //   if (updateCard) {
  //     updateCard(boardId, cardValues.id, cardValues);
  //   }
  // }, [cardValues]);

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
