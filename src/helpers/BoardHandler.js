import { v4 as uuidv4 } from "uuid";

class BoardHandler {
  constructor(boards) {
    this.boards = boards;
  }

  updateTitleBoard({ boardId, titleBoard }) {
    const boardIndex = this.boards.findIndex((board) => board.id === boardId);
    if (boardIndex === -1) return;

    let board = JSON.parse(JSON.stringify(this.boards[boardIndex]));
    board.title = titleBoard;

    return board;
  }

  addCard({ boardId, titleCard }) {
    const boardIndex = this.boards.findIndex((board) => board.id === boardId);
    if (boardIndex === -1) return;

    const board = JSON.parse(JSON.stringify(this.boards[boardIndex]));
    board.cards.push(this.createNewCard(titleCard));

    return board;
  }

  removeCard({ boardId, cardId }) {
    const boardIndex = this.boards.findIndex((board) => board.id === boardId);
    if (boardIndex === -1) return;

    const board = JSON.parse(JSON.stringify(this.boards[boardIndex]));
    board.cards = board.cards.filter((card) => card.id !== cardId);

    return board;
  }

  updateCard({ boardId, cardId, updatedCard }) {
    const boardIndex = this.boards.findIndex((board) => board.id === boardId);
    if (boardIndex === -1) return;

    let board = JSON.parse(JSON.stringify(this.boards[boardIndex]));
    let cards = board.cards;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].id === cardId) {
        cards[i] = updatedCard;
        break;
      }
    }

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
