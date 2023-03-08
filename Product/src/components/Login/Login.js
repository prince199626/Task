// import { useEffect, useState } from 'react';
// import Button from "react-bootstrap/Button";
// import { useNavigate } from "react-router-dom";
// import { ErrorMessage, Field, Formik } from "formik";
// import HTTPService from '../../services/HTTPService';
// import { cypherService } from '../../services/cypherService';
// import { EndpointService } from '../../services/endpointService';
// import { Schema } from './schema';
// import { loginRequest } from '../../store/actions';
// import { connect } from 'react-redux';
// import { toast, ToastContainer } from 'react-toastify';

// function Login({ dispatch, error }) {
//     const navigate = useNavigate()
//     const [loader, setLoader] = useState(false);
//     const [loginFailMsg, setLoginFailMsg] = useState("");

//     useEffect(() => {
//        alert(token)
//       }, [token]);

//     const onSubmit = (values) => {

//         // setLoader(true);
//         // setLoginFailMsg("");
//         dispatch(loginRequest(values.username,values.password));
//         // let payLoad = values;
//         // const apiUrl = EndpointService.loginUrl;
//         // HTTPService.post(apiUrl, payLoad)
//         //     .then((response) => {
//         //         debugger;
//         //         if (response.token) {
//         //             cypherService.encryptSessionStorage.setItem("appToken", response.token);
//         //             navigate('/products');

//         //         } else {
//         //             setLoader(false);
//         //             setLoginFailMsg('invalid username password');
//         //         }
//         //     })
//         //     .catch((error) => {
//         //         debugger;
//         //         setLoader(false);
//         //         if (error.response.status == 400) {
//         //             setLoginFailMsg('invalid username password');

//         //         } else {
//         //             setLoginFailMsg('invalid username password');
//         //         }
//         //         setLoginFailMsg('server down');
//         //     });
//     };


//     return (
//         <div className="login-container">
//             <h1>Login</h1>
//             <ToastContainer />
//             <Formik initialValues={Schema.initialValues} validationSchema={Schema.validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
//                 {({ handleSubmit, getFieldProps, values }) => {
//                     console.log(values);
//                     return (
//                         <form className="login-form" onSubmit={handleSubmit}>
//                             {loginFailMsg ? <div className="error-msg text-center">{loginFailMsg}</div> : null}
//                             <label htmlFor="email">Username</label>
//                             <Field type="username" name="username" />
//                             <ErrorMessage name="username" className="error-msg" />
//                             <label htmlFor="password">Password</label>
//                             <Field type="password" name="password" />
//                             <ErrorMessage name="password" className="error-msg" />

//                             <Button type="submit" variant="primary" disabled={loader} className="login-btn">
//                                 {loader ? "Loading..." : "Log in"}
//                             </Button>
//                         </form>
//                     );
//                 }}
//             </Formik>
//         </div>
//     );
// }

// const mapStateToProps = (state) => ({
//     error: state.error,
//   });
//   const mapDispatchToProps = (dispatch) => ({
//     dispatch: dispatch,
//   });
// export default connect(mapStateToProps,mapDispatchToProps)(Login);


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
function Login() {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false);
    const [loginFailMsg, setLoginFailMsg] = useState("");
    const dispatch = useDispatch();
    const token = useSelector(getToken);
    useEffect(() => {
        if (token != null) {
            navigate('/products');
        }
    }, [token]);

    const onSubmit = async (values) => {
        
        await dispatch(loginRequest(values.username, values.password));
        if (token != null) {
            navigate('/products');
        }
        // setLoader(true);
        // setLoginFailMsg("");
        // let payLoad = values;
        // const apiUrl = EndpointService.loginUrl;
        // HTTPService.post(apiUrl, payLoad)
        //     .then((response) => {
        //         debugger;
        //         if (response.token) {
        //             cypherService.encryptSessionStorage.setItem("appToken", response.token);
        //             navigate('/products');

        //         } else {
        //             setLoader(false);
        //             setLoginFailMsg('invalid username password');
        //         }
        //     })
        //     .catch((error) => {
        //         debugger;
        //         setLoader(false);
        //         if (error.response.status == 400) {
        //             setLoginFailMsg('invalid username password');

        //         } else {
        //             setLoginFailMsg('invalid username password');
        //         }
        //         setLoginFailMsg('server down');
        //     });
    };


    return (
        <div className="login-container">
            <h1>Login</h1>
            <ToastContainer />
            <Formik initialValues={Schema.initialValues} validationSchema={Schema.validationSchema} onSubmit={onSubmit} enableReinitialize={true}>
                {({ handleSubmit, getFieldProps, values }) => {
                    console.log(values);
                    return (
                        <form className="login-form" onSubmit={handleSubmit}>
                            {loginFailMsg ? <div className="error-msg text-center">{loginFailMsg}</div> : null}
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


export default (Login);