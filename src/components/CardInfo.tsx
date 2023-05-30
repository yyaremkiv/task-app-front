import React, { useEffect, useState } from "react";
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

interface CardInfoProps {
  card: CardItem;
  boardId: number;
  onCLose: () => void;
  updateCard: (boardId: number, cardId: number, card: CardItem) => void;
}

export const CardInfo: React.FC<CardInfoProps> = (props: CardInfoProps) => {
  const { card, boardId, onCLose, updateCard } = props;
  const [selectedColor, setSelectedColor] = useState("#00796b");
  const [cardValues, setCardValues] = useState<CardItem>({
    ...card,
  });

  const updateTitle = (value: string) => {
    setCardValues({ ...cardValues, title: value });
  };

  const updateDescript = (value: string) => {
    setCardValues({ ...cardValues, desc: value });
  };

  //--------------- add and remove label
  const addLabel = (label: LabelItem) => {
    const { labels } = cardValues;

    const index = labels.findIndex((el) => el.text === label.text);

    if (index > -1) return;

    setSelectedColor("#00796b");

    setCardValues((prevCardValues) => ({
      ...prevCardValues,
      labels: [...prevCardValues.labels, label],
    }));
  };

  const removeLabel = (label: LabelItem) => {
    const tempLabels = cardValues.labels.filter((el) => el.text !== label.text);
    setCardValues({ ...cardValues, labels: tempLabels });
  };

  //--------------------- add, remove & update new task
  const addTask = (value: string) => {
    const task: TaskItem = {
      id: Date.now() + Math.random() * 2,
      completed: false,
      text: value,
    };
    setCardValues({ ...cardValues, tasks: [...cardValues.tasks, task] });
  };

  const removeTask = (id: number) => {
    const tasks = [...cardValues.tasks];

    const tempTasks = tasks.filter((el) => {
      return el.id !== id;
    });
    setCardValues({ ...cardValues, tasks: tempTasks });
  };

  const checkDoneTask = (id: number, value: boolean) => {
    const tasks = [...cardValues.tasks];

    const index = tasks.findIndex((el) => {
      return el.id === id;
    });
    if (index < 0) return;

    tasks[index].completed = Boolean(value);

    setCardValues({ ...cardValues, tasks });
  };

  // ------------ update date
  const updateDate = (date: string) => {
    if (!date) {
      return;
    }
    setCardValues({ ...cardValues, date });
  };

  // for checkbox MUI
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    if (updateCard) {
      updateCard(boardId, cardValues.id, cardValues);
    }
  }, [cardValues]);

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

      <Grid container rowSpacing={1}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <ItemCardInfo elevation={3}>
            <Grid item xs={12} sm={7.5} md={7.5} lg={7.5} xl={7.5}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  flexWrap: "wrap",
                }}
              >
                <Title color="primary" fontSize="large" />
                <Typography
                  variant="h4"
                  fontSize="20px"
                  gutterBottom
                  marginBottom={0}
                  sx={{ padding: "5px" }}
                >
                  {cardValues.title}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} margin="0 auto">
              <ItemAddCardBtn>
                <CustomInput
                  directionBtn={"row"}
                  text={"Edit Title"}
                  placeholder="Enter Title"
                  onClickAddBtn={updateTitle}
                />
              </ItemAddCardBtn>
            </Grid>
          </ItemCardInfo>
        </Grid>

        <Grid item xs={12}>
          <ItemCardInfo elevation={3}>
            <Grid item xs={12} sm={7.5} md={7.5} lg={7.5} xl={7.5}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Description color="primary" fontSize="large" />
                <Typography
                  variant="h6"
                  fontSize="18px"
                  gutterBottom
                  marginBottom={0}
                  sx={{
                    padding: "5px",
                    textAlign: "justify",
                  }}
                >
                  {cardValues.desc || "Description"}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} margin="0 auto">
              <ItemAddCardBtn>
                <CustomInput
                  directionBtn={"row"}
                  defaultValue={cardValues.desc}
                  text={"Edit a Description"}
                  placeholder="Enter Description"
                  onClickAddBtn={updateDescript}
                />
              </ItemAddCardBtn>
            </Grid>
          </ItemCardInfo>
        </Grid>

        <Grid item xs={12}>
          <ItemCardInfo elevation={3}>
            <Grid item xs={12} sm={7.5} md={7.5} lg={7.5} xl={7.5}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <CalendarMonth color="primary" fontSize="large" />
                <Typography
                  variant="h5"
                  fontSize="20px"
                  gutterBottom
                  marginBottom={0}
                  sx={{ padding: "5px" }}
                >
                  Date
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} margin="0 auto">
              <DateCalendar updateDate={updateDate} />
            </Grid>
          </ItemCardInfo>
        </Grid>

        <Grid item xs={12}>
          <ItemCardInfo sx={{ alignItems: "start", gap: "5px" }} elevation={3}>
            <Grid item xs={12} sm={7.5} md={7.5} lg={7.5} xl={7.5}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <BookmarkBorder color="primary" fontSize="large" />
                <Typography
                  variant="h5"
                  fontSize="20px"
                  gutterBottom
                  marginBottom={0}
                >
                  Labels
                </Typography>
              </Box>

              <Box width="fit-content" display="flex" flexWrap="wrap" gap="7px">
                {cardValues.labels?.map((el, index) => (
                  <Chipp key={index} el={el} removeLabel={removeLabel} />
                ))}
              </Box>
            </Grid>

            <Grid
              item
              container
              rowGap={1}
              xs={12}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              margin="0 auto"
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                margin="0 auto"
              >
                {colorList.map((color, index) => (
                  <ListItemIcon
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    sx={{
                      minWidth: "15px",
                      border: "1px solid #bf360c50",
                      borderRadius: "15px",
                      padding: "2px",
                      cursor: "pointer",
                      "&:hover": {
                        boxShadow:
                          "0px 4px 6px #bf360c50, -2px -4px 6px #bf360c50",
                      },
                    }}
                  >
                    <Bookmark sx={{ backgroundColor: { color } }} />
                  </ListItemIcon>
                ))}
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                margin="0 auto"
              >
                <ItemAddCardBtn>
                  <CustomInput
                    directionBtn={"row"}
                    text="Add Label"
                    placeholder="Enter label text"
                    onClickAddBtn={(value: string) =>
                      addLabel({ color: selectedColor, text: value })
                    }
                  />
                </ItemAddCardBtn>
              </Grid>
            </Grid>
          </ItemCardInfo>
        </Grid>

        <Grid item xs={12}>
          <ItemCardInfo sx={{ marginBottom: "5px" }} elevation={3}>
            <Grid item xs={12} sm={7.5} md={7.5} lg={7.5} xl={7.5}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <AssignmentTurnedIn color="primary" fontSize="large" />
                <Typography
                  variant="h5"
                  fontSize="20px"
                  gutterBottom
                  marginBottom={0}
                  sx={{ padding: "5px" }}
                >
                  {`Tasks: ${cardValues.tasks.length}`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={4} lg={4} xl={4} margin="0 auto">
              <ItemAddCardBtn>
                <CustomInput
                  directionBtn={"row"}
                  text={"Add New Task"}
                  placeholder="Enter Task"
                  onClickAddBtn={addTask}
                />
              </ItemAddCardBtn>
            </Grid>
          </ItemCardInfo>

          <ItemCardInfo
            elevation={3}
            sx={{
              maxHeight: "200px",
              overflow: "hidden",
              "&:hover": { overflowY: "scroll" },
              "&::-webkit-scrollbar": {
                width: "7px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: deepOrange["A400"],
                borderRadius: "5px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: deepOrange["100"],
              },
            }}
          >
            {cardValues.tasks?.map((el) => (
              <Paper
                elevation={1}
                key={el.id}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "3px",
                  marginBottom: "5px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    {...label}
                    checked={el.completed}
                    onChange={(e) => checkDoneTask(el.id, e.target.checked)}
                  />
                  <Typography
                    variant="subtitle1"
                    align="left"
                    sx={{
                      textDecoration: el.completed ? "line-through" : "none",
                    }}
                  >
                    {el.text}
                  </Typography>
                </Box>

                <IconButton
                  aria-label="close"
                  color="secondary"
                  onClick={() => removeTask(el.id)}
                >
                  <Close fontSize="medium" />
                </IconButton>
              </Paper>
            ))}
          </ItemCardInfo>
        </Grid>
      </Grid>
    </Modal>
  );
};
