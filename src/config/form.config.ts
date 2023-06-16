import * as Yup from "yup";

interface ILoginFormValues {
  email: string;
  password: string;
}

interface IRegisterFormValues {
  username: string;
  email: string;
  password: string;
}

interface IBoardFormValues {
  title: string;
}

export interface IInitialValuesAddBoard {
  title: string;
  labels: [];
  color: any;
}

interface IFormConfig {
  initialValuesLogin: ILoginFormValues;
  initialValuesRegister: IRegisterFormValues;
  initialValuesAddBoard: IInitialValuesAddBoard;
  loginSchema: Yup.Schema<ILoginFormValues>;
  registerSchema: Yup.Schema<IRegisterFormValues>;
  boardSchema: Yup.Schema<IBoardFormValues>;
  cardSchema: Yup.Schema<any>;
  taskSchema: Yup.Schema<any>;
}

export const FormConfig: IFormConfig = {
  initialValuesLogin: {
    email: "",
    password: "",
  },
  initialValuesRegister: {
    username: "",
    email: "",
    password: "",
  },
  initialValuesAddBoard: {
    title: "",
    labels: [],
    color: {},
  },
  loginSchema: Yup.object().shape({
    email: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .email("Please enter a valid email address.")
      .min(4, "Email must be at least 4 characters long.")
      .max(50, "Email cannot be longer than 50 characters.")
      .required("Email is required."),
    password: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be no more than 20 characters")
      .required("Password is required."),
  }),
  registerSchema: Yup.object().shape({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters long.")
      .max(50, "Username cannot be longer than 50 characters.")
      .required("Username is required."),
    email: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .email("Please enter a valid email address.")
      .min(4, "Email must be at least 4 characters long.")
      .max(50, "Email cannot be longer than 50 characters.")
      .required("Email is required."),
    password: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be no more than 20 characters")
      .required("Password is required."),
  }),
  boardSchema: Yup.object().shape({
    title: Yup.string()
      .min(6, "Title must be at least 6 characters long.")
      .max(40, "Title cannot be longer than 40 characters.")
      .required("Title is required."),
  }),
  cardSchema: Yup.object().shape({
    title: Yup.string()
      .min(6, "Title must be at least 6 characters long.")
      .max(40, "Title cannot be longer than 40 characters.")
      .required("Title is required."),
    desc: Yup.string()
      .min(6, "Description must be at least 6 characters long.")
      .max(200, "Description cannot be longer than 200 characters."),
  }),
  taskSchema: Yup.object().shape({
    text: Yup.string()
      .min(6, "Text must be at least 6 characters long.")
      .max(100, "Text cannot be longer than 100 characters.")
      .required("Text is required."),
    progress: Yup.number()
      .min(0, "Progress cannot be less than 0.")
      .max(100, "Progress cannot be greater than 100.")
      .required("Progress is required."),
  }),
};
