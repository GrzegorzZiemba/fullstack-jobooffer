import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import styles from "../Form.module.css";
import { useLoginUserMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authApiSlice";
import { useDispatch } from "react-redux";

const LoginAccountForm = () => {
  const [loginUser, { isLoading, isSuccess, isError, error }] =
    useLoginUserMutation();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      const user = await loginUser(values).unwrap();
      dispatch(setCredentials({ ...user }));

      // Navigate to some page after successful creation, e.g., login page
      navigate("/");
    } catch (err) {
      console.error("Failed to login the account: ", err);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string(),
        password: Yup.string(),
      })}
      onSubmit={handleSubmit}
    >
      <div className={styles.formContainer}>
        <h1>LOGIN</h1>

        <Form>
          <label htmlFor="email">E-mail</label>
          <Field className={styles.formField} name="email" type="text" />
          <ErrorMessage name="email" component="div" style={{ color: "red" }} />

          <label htmlFor="password">Password</label>
          <Field className={styles.formField} name="password" type="password" />
          <ErrorMessage
            name="password"
            component="div"
            style={{ color: "red" }}
          />

          <Button className="button-main" type="submit">
            Submit
          </Button>
          {isError && (
            <div style={{ color: "red" }}>
              {/* Customize this message based on the error object */}
              {error?.data?.message ||
                "Login failed. Please check your credentials."}
            </div>
          )}
        </Form>
      </div>
    </Formik>
  );
};

export default LoginAccountForm;
