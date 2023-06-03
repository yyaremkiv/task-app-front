import { v4 as uuidv4 } from "uuid";

class BoardHandler {
  constructor(boards) {
    this.boards = boards;
  }

  static updateBoard({ boards, boardId, payload }) {
    let copyOfBoards = this.makeCopyObject({ boards, boardId });
    if (!copyOfBoards) return;

    const updatedBoard = { ...copyOfBoards, ...payload };
    return updatedBoard;
  }

  static addCard({ boards, boardId, titleCard }) {
    let copyOfBoards = this.makeCopyObject({ boards, boardId });
    if (!copyOfBoards) return;

    copyOfBoards.cards.push(this.createNewCard({ title: titleCard }));
    return copyOfBoards;
  }

  static removeCard({ boards, boardId, cardId }) {
    let copyOfBoards = this.makeCopyObject({ boards, boardId });
    if (!copyOfBoards) return;

    copyOfBoards.cards = copyOfBoards.cards.filter(
      (card) => card.id !== cardId
    );
    return copyOfBoards;
  }

  static updateCard({ boards, boardId, cardId, updatedCard }) {
    let copyOfBoards = this.makeCopyObject({ boards, boardId });
    if (!copyOfBoards) return;

    let cards = copyOfBoards.cards;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].id === cardId) {
        cards[i] = updatedCard;
        break;
      }
    }
    return copyOfBoards;
  }

  static makeCopyObject = ({ boards, boardId }) => {
    const boardIndex = boards.findIndex((board) => board.id === boardId);
    if (boardIndex === -1) return;

    return JSON.parse(JSON.stringify(boards[boardIndex]));
  };

  static createNewCard({ title }) {
    return { id: uuidv4(), title, labels: [], date: "", tasks: [] };
  }
}

export default BoardHandler;
