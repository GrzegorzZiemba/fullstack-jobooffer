import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"; // Make sure to import from 'react-router-dom' not 'react-router'
import styles from "../components/Form.module.css";
import { useSelector } from "react-redux";
import { useGetUserQuery, useUpdateUserMutation } from "../slices/userApiSlice";
import { LinkContainer } from "react-router-bootstrap";

const ManageUserPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [applied, setApplied] = useState([]);
  const { data, isLoading, error } = useGetUserQuery();
  const [editUser] = useUpdateUserMutation();

  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const payload = {
      userInfo,
      ...values,
    };
    try {
      const response = await editUser(payload).unwrap();
      if (response.data) {
        navigate("/");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log("You already get that");
    }
  };
  useEffect(() => {
    setApplied(data?.applied);
    console.log(applied);
  }, []);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs!</p>;

  return (
    <div className={styles.formContainer}>
      You applied to the:
      {applied ? (
        applied.map((apply) => (
          <LinkContainer to={`/offer/${apply}`} key={apply}>
            <Button>View Application</Button>
          </LinkContainer>
        ))
      ) : (
        <p>Nowhere</p>
      )}
      <Formik
        initialValues={{
          username: data.username,
          isRecruiter: data.isRecruiter,
        }}
        validationSchema={Yup.object({
          username: Yup.string().required("Comapany is required"),
          isRecruiter: Yup.string().required("Selection is required"),
        })}
        onSubmit={handleSubmit}
      >
        <div className={styles.formContainer}>
          <h1>Add Job</h1>
          <Form>
            <label htmlFor="username">username</label>
            <Field className={styles.formField} name="username" type="text" />
            <ErrorMessage name="username" component="div" className="error" />

            <Field as="select" name="isRecruiter" className={styles.formField}>
              <option value="" label="Select an option" />
              <option value="true" label="True" />
              <option value="false" label="False" />
            </Field>
            <ErrorMessage
              name="isRecruiter"
              component="div"
              style={{ color: "red" }}
            />

            <Button className="button-main" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Formik>
    </div>
  );
};

export default ManageUserPage;
