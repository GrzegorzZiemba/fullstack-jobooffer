import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Make sure to import from 'react-router-dom' not 'react-router'
import styles from "../components/Form.module.css";
import { useCreateJobMutation } from "../slices/jobApiSlice";

const AddJobPage = () => {
  const [createJobPost] = useCreateJobMutation();
  let navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await createJobPost(values);
      if (response.data) {
        navigate("/");
      } else {
        console.error("No data in response", response.error);
      }
    } catch (err) {
      console.error("Failed to create jobpost: ", err);
    }
  };

  return (
    <Formik
      initialValues={{
        position: "",
        salary: 0,
        city: "",
        description: "",
        company: "",
        image: "",
      }}
      validationSchema={Yup.object({
        company: Yup.string().required("Comapany is required"),
        position: Yup.string().required("Position is required"),
        salary: Yup.string().required("Salary is required"),
        city: Yup.string().required("City is required"),
        description: Yup.string().required("Description is required"),
        image: Yup.string(),
      })}
      onSubmit={handleSubmit}
    >
      <div className={styles.formContainer}>
        <h1>Add Job</h1>
        <Form>
          <label htmlFor="company">Company</label>
          <Field className={styles.formField} name="company" type="text" />
          <ErrorMessage name="company" component="div" className="error" />

          <label htmlFor="position">Position</label>
          <Field className={styles.formField} name="position" type="text" />
          <ErrorMessage name="position" component="div" className="error" />

          <label htmlFor="salary">Salary</label>
          <Field className={styles.formField} name="salary" type="text" />
          <ErrorMessage name="salary" component="div" className="error" />

          <label htmlFor="city">City</label>
          <Field className={styles.formField} name="city" type="text" />
          <ErrorMessage name="city" component="div" className="error" />

          <label htmlFor="image">
            Image - please provide URL (due to free db tier :))
          </label>
          <Field className={styles.formField} name="image" type="text" />
          <ErrorMessage name="image" component="div" className="error" />

          <label htmlFor="description">Description</label>
          <Field
            as="textarea"
            className={styles.formField}
            name="description"
          />
          <ErrorMessage name="description" component="div" className="error" />

          <Button className="button-main" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Formik>
  );
};

export default AddJobPage;
