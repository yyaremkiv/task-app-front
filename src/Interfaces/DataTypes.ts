export interface ISigninArg {
  email: string;
  password: string;
}

export interface ISignupArg {
  username: string;
  email: string;
  password: string;
}

export interface IAddBoard {
  title: string;
  cards: [];
  labels: [];
  color: string;
}

export interface IUpdateBoard {
  boardId: string;
  board: any;
}
