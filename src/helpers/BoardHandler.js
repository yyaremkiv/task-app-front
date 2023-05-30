import { v4 as uuidv4 } from "uuid";

class BoardHandler {
  constructor(boards) {
    this.boards = boards;
  }

  addCard({ boardId, titleCard }) {
    const boardIndex = this.boards.findIndex((board) => board.id === boardId);
    if (boardIndex === -1) return;

    const board = JSON.parse(JSON.stringify(this.boards[boardIndex]));
    board.cards.push(this.createNewCard(titleCard));

    return board;
  }

  createNewCard(title) {
    return {
      id: uuidv4(),
      title,
      labels: [],
      date: "",
      tasks: [],
    };
  }
}

export default BoardHandler;
