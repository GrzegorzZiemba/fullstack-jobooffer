import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "../Form.module.css";
// Import the hook from your API slice
import { useCreateUserMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authApiSlice";
import { useDispatch } from "react-redux";

const CreateAccountForm = () => {
  const [createUser, { isLoading, isSuccess, isError, error }] =
    useCreateUserMutation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      const user = await createUser(values).unwrap();
      dispatch(setCredentials({ ...user }));

      // Navigate to some page after successful creation, e.g., login page
      navigate("/");
    } catch (err) {
      console.error("Failed to create the account: ", err);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string().required("Username is required"),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      })}
      onSubmit={handleSubmit}
    >
      <div className={styles.formContainer}>
        <h1>SINGIN</h1>

        <Form as="form">
          <label htmlFor="username">Username</label>
          <Field className={styles.formField} name="username" type="text" />
          <ErrorMessage name="email" component="div" style={{ color: "red" }} />

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
                "Creating account failed. Maybe email is in use ? "}
            </div>
          )}
        </Form>
      </div>
    </Formik>
  );
};

export default CreateAccountForm;
