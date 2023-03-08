import * as Yup from "yup";

// Login
const validationSchema = Yup.object({
    username: Yup.string()
        .required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const initialValues = {
    username: "",
    password: "",
};


export const Schema = {
    validationSchema,
    initialValues,
};
