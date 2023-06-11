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

interface IFormConfig {
  initialValuesLogin: ILoginFormValues;
  initialValuesRegister: IRegisterFormValues;
  loginSchema: Yup.Schema<ILoginFormValues>;
  registerSchema: Yup.Schema<IRegisterFormValues>;
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
  loginSchema: Yup.object().shape({
    email: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .email("Please enter a valid email address.")
      .min(4, "Email must be at least 3 characters long.")
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
      .min(4, "Email must be at least 3 characters long.")
      .max(50, "Email cannot be longer than 50 characters.")
      .required("Email is required."),
    password: Yup.string()
      .matches(/^[^\s]+$/, "Enter a value without spaces")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be no more than 20 characters")
      .required("Password is required."),
  }),
};
