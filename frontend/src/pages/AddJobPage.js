import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import styles from '../components/Form.module.css'

const AddJobPage = () => {
  return (
    <Formik
			initialValues={{ position: "", salary: "", city: "" }}
			validationSchema={Yup.object({
				position: Yup.string(),
				salary: Yup.string(),
                city: Yup.string(),
                description: Yup.string()
			})}
			onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false)
				console.log(values.position)
				console.log(values.salary)
                console.log(values.city)
                console.log(values.description)
					
			}}
		>
            <div className={styles.formContainer}>
			<h1>LOGIN</h1>

			<Form>
            <label htmlFor="position">Position</label>
				<Field
					className={styles.formField}
					name="position"
					type="text"
				/>
				<ErrorMessage name="position" component="div" style={{ color: "red" }} />

				<label htmlFor="salary">salary</label>
				<Field
					className={styles.formField}
					name="salary"
					type="text"
				/>
				<ErrorMessage name="salary" component="div" style={{ color: "red" }} />

                <label htmlFor="city">city</label>
				<Field
					className={styles.formField}
					name="city"
					type="text"
				/>
				<ErrorMessage name="salary" component="div" style={{ color: "red" }} />
				<label htmlFor="description">description</label>
				<Field
					className={styles.formField}
					name="description"
					type="text"
				/>
				<ErrorMessage name="salary" component="div" style={{ color: "red" }} />
				


				<Button className='button-main' type="submit">Submit</Button>
			</Form>
            </div>
		</Formik>
	);
}

export default AddJobPage