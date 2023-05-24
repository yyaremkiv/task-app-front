import React from "react";
import { BoardItem } from "../interfaces/DataTypes";

export const ApiTask: BoardItem[] = [
  {
    id: 1,
    title: "Doing",
    cards: [
      {
        id: 11,
        title: "Task1",
        labels: [{ color: "#cf61a1", text: "Urgent" }],
        date: "28-04-2023",
        tasks: [
          { id: 121, completed: true, text: "Task1_butask11" },
          { id: 122, completed: true, text: "Task1_butask12" },
          { id: 123, completed: true, text: "Task1_butask13" },
        ],
        desc: "First Task1 Description",
      },
      {
        id: 12,
        title: "Task12",
        labels: [{ color: "#1ebffa", text: "Frontend" }],
        date: "28-04-2023",
        tasks: [
          { id: 121, completed: true, text: "Task1_butask121" },
          { id: 122, completed: true, text: "Task1_butask122" },
          { id: 123, completed: true, text: "Task1_butask123" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Done",
    cards: [
      {
        id: 21,
        title: "Task21",
        labels: [{ color: "#9975bd", text: "Database" }],
        date: "28-03-2023",
        tasks: [
          { id: 131, completed: false, text: "Task2_butask11" },
          { id: 133, completed: false, text: "Task2_butask12" },
        ],
      },
      {
        id: 22,
        title: "Task22",
        labels: [{ color: "#9975bd", text: "Database" }],
        date: "28-03-2023",
        tasks: [
          { id: 131, completed: false, text: "Task2_butask21" },
          { id: 133, completed: true, text: "Task2_butask22" },
        ],
      },
    ],
  },
];
