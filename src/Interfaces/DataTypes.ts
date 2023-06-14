export interface ISigninArg {
  email: string;
  password: string;
}

export interface ISignupArg {
  username: string;
  email: string;
  password: string;
}

export interface IUpdateBoard {
  boardId: string;
  board: any;
}

export interface IColorSingle {
  label: string;
  color: string;
}

export interface IAddBoard {
  title: string;
  cards: any[];
  labels: [] | ILabelsArray;
  color: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
}

export interface ITask {
  id: string;
  text: string;
  completed: boolean;
  progress: number;
}

export interface ILabel {
  label: string;
  color: string;
}

export interface ILabelsArray {
  items: ILabel[];
}

export interface ICard {
  id: string;
  title: string;
  desc: string;
  dateStart: string;
  dateEnd: string;
  labels: ILabelsArray | [];
  tasks: ITask[];
}

export interface IBoard {
  id: string;
  title: string;
  labels: ILabelsArray;
  color: string;
  cards: ICard[];
}
