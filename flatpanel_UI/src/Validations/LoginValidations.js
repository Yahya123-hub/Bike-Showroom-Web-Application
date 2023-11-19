import * as yup from "yup";

export const userLoginSchema = yup.object().shape({

  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9]).{6,}$/,
      "Password must include at least one letter, one special character, and one number"
    ),
});
