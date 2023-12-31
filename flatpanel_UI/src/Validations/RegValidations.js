import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .max(50, "Name must be at most 50 characters")
    .matches(/^[a-zA-Z\s'-]+$/, "Invalid characters in the name")
    .matches(/\S/, "Name cannot consist of only spaces"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9]).{6,}$/,
      "Password must include at least one letter, one special character, and one number"
    ),
});
