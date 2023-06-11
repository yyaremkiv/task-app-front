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
  cards: any[];
  labels: [] | ILabelsArray;
  color: string;
}

export interface IUpdateBoard {
  boardId: string;
  board: any;
}

export interface ILabelItemSingle {
  label: string;
  color: string;
}

export interface ILabelsArray {
  items: ILabelItemSingle[];
}

export interface IColorSingle {
  label: string;
  color: string;
}
