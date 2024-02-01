import * as Yup from "yup";

export const userValidationSchema = Yup.object({
    name: Yup.string().trim().min(1, "Name cannot be empty.").required("Name is a required field."),
    email: Yup.string().email("Invalid email.").required("Email is a required field."),
    password: Yup.string().trim().min(4, "Password must be atleast 4 characters long.").required("Password is a required field."),
    confirmPassword: Yup.string().equals([Yup.ref("password"), null], "Password and confirm password does not match.")
})