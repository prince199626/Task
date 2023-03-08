import * as Yup from "yup";

// Login
const validationSchema = Yup.object({
    username: Yup.string()
        .required("Username is required"),
    password: Yup.string().required('Password is required')
        .nullable()
        .strict()
        .trim('Space not allowed')
        .min(8, 'Password should be min 8')
        .max(40, "Password should be max 40")
        .matches(/[a-z]+/, "One lowercase,uppercase,number,special character")
        .matches(/[A-Z]+/, "One lowercase,uppercase,number,special character")
        .matches(/[@$!%*#?&]+/, "One lowercase,uppercase,number,special character")
        .matches(/\d+/, "One lowercase,uppercase,number,special character")
});

const initialValues = {
    username: "",
    password: "",
};


export const Schema = {
    validationSchema,
    initialValues,
};
