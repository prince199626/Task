
import { useEffect, useState } from 'react';
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Formik } from "formik";
import HTTPService from '../../services/HTTPService';
import { cypherService } from '../../services/cypherService';
import { EndpointService } from '../../services/endpointService';
import { Schema } from './schema';
import { loginRequest } from '../../store/actions';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../store/selectors';
import { Toast } from 'react-bootstrap';
function Register() {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false);
  

    const onSubmit = async (values) => {
        let payLoad = {
            "name": values.username,
            "password": values.password
        };
        const apiUrl = EndpointService.createUser;
        HTTPService.post(apiUrl, payLoad)
            .then((response) => {
                toast.success(response.message)
            })
            .catch((error) => {
                console.log(error)
            });

    };


    return (
        <div className="login-container">
            <h1>Register</h1>
            <ToastContainer />
            <Formik initialValues={Schema.initialValues} validationSchema={Schema.validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
                {({ handleSubmit, getFieldProps, values }) => {
                    console.log(values);
                    return (
                        <form className="login-form" onSubmit={handleSubmit}>
                            <label htmlFor="email">Username</label>
                            <Field type="username" name="username" />
                            <ErrorMessage name="username" className="error-msg" />
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" />
                            <ErrorMessage name="password" className="error-msg" />

                            <Button type="submit" variant="primary" disabled={loader} className="login-btn">
                                {loader ? "Loading..." : "Log in"}
                            </Button>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
}


export default (Register);