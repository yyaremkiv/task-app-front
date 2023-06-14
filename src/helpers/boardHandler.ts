import { v4 as uuidv4 } from "uuid";
import { ICard, IBoard } from "src/Interfaces/DataTypes";

class BoardHandler {
  boards: IBoard[];

  constructor(boards: IBoard[]) {
    this.boards = boards;
  }

  static updateBoard({
    boards,
    boardId,
    payload,
  }: {
    boards: IBoard[];
    boardId: string;
    payload: any;
  }): IBoard | void {
    let copyOfBoards = this.makeCopyObject({ boards, boardId });
    if (!copyOfBoards) return;

    const updatedBoard = { ...copyOfBoards, ...payload };
    return updatedBoard;
  }

  static addCard({
    boards,
    boardId,
    titleCard,
  }: {
    boards: IBoard[];
    boardId: string;
    titleCard: string;
  }): IBoard | void {
    let copyOfBoards = this.makeCopyObject({ boards, boardId });
    if (!copyOfBoards) return;

    copyOfBoards.cards.push(this.createNewCard({ title: titleCard }));
    return copyOfBoards;
  }

  static removeCard({
    boards,
    boardId,
    cardId,
  }: {
    boards: IBoard[];
    boardId: string;
    cardId: string;
  }): IBoard | void {
    let copyOfBoards = this.makeCopyObject({ boards, boardId });
    if (!copyOfBoards) return;

    copyOfBoards.cards = copyOfBoards.cards.filter(
      (card: ICard) => card.id !== cardId
    );
    return copyOfBoards;
  }

  static updateCard({
    boards,
    boardId,
    cardId,
    updatedCard,
  }: {
    boards: IBoard[];
    boardId: string;
    cardId: string;
    updatedCard: ICard;
  }): IBoard | void {
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

  static makeCopyObject = ({
    boards,
    boardId,
  }: {
    boards: IBoard[];
    boardId: string;
  }): IBoard | void => {
    const boardIndex = boards.findIndex(
      (board: IBoard) => board.id === boardId
    );
    if (boardIndex === -1) return;
    return JSON.parse(JSON.stringify(boards[boardIndex]));
  };

  static createNewCard({ title }: { title: string }): ICard {
    return {
      id: uuidv4(),
      title,
      desc: "",
      dateStart: "",
      dateEnd: "",
      labels: [],
      tasks: [],
    };
  }
}

export default BoardHandler;
