import * as yup from "yup";

export const userLoginSchema = yup.object().shape({
  semail: yup.string().email("Invalid email").required("Email is required"),
  spassword: yup
    .string()
    .required("Password is required")
    .matches(/\S/, "Password cannot consist of only spaces"),
});
