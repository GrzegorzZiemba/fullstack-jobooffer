import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"; // Make sure to import from 'react-router-dom' not 'react-router'
import styles from "../components/Form.module.css";
import { useGetJobQuery, useUpdateJobMutation } from "../slices/jobApiSlice";

const EditJobPage = () => {
  const { id: jobId } = useParams();
  const { data, isLoading, error } = useGetJobQuery(jobId);
  const [editJobPost] = useUpdateJobMutation();
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    const payload = {
      jobId,
      ...values,
    };
    try {
      const response = await editJobPost(payload).unwrap();
      if (response.data) {
        navigate("/");
      } else {
        console.error("Error");
      }
    } catch (error) {
      console.error("Error in error :D");
    }
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs!</p>;
  return (
    <Formik
      initialValues={{
        company: data[0].company,
        position: data[0].position,
        salary: data[0].salary,
        city: data[0].city,
        description: data[0].description,
        image: data[0].image,
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

export default EditJobPage;
