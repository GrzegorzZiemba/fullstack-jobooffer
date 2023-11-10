import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Make sure to import from 'react-router-dom' not 'react-router'
import styles from '../components/Form.module.css';
import { useCreateJobMutation } from '../slices/jobApiSlice';

const AddJobPage = () => {
	const [createJobPost] = useCreateJobMutation();
	let navigate = useNavigate();
	
	const handleSubmit = async (values) => {
		console.log('AddJobPost');
		try {
			const job = await createJobPost(values).unwrap();
			console.log(job)
			navigate('/');
		} catch (err) {
			console.error('Failed to create jobpost: ', err);
		}
	};

	return (
		<Formik
			initialValues={{ position: "", salary: "", city: "", description: "" }}
			validationSchema={Yup.object({
				position: Yup.string().required('Position is required'),
				salary: Yup.string().required('Salary is required'),
				city: Yup.string().required('City is required'),
				description: Yup.string().required('Description is required')
			})}
			onSubmit={handleSubmit}
		>
			<div className={styles.formContainer}>
				<h1>Add Job</h1>
				<Form>
					<label htmlFor="position">Position</label>
					<Field className={styles.formField} name="position" type="text" />
					<ErrorMessage name="position" component="div" className="error" />

					<label htmlFor="salary">Salary</label>
					<Field className={styles.formField} name="salary" type="text" />
					<ErrorMessage name="salary" component="div" className="error" />

					<label htmlFor="city">City</label>
					<Field className={styles.formField} name="city" type="text" />
					<ErrorMessage name="city" component="div" className="error" />

					<label htmlFor="description">Description</label>
					<Field as="textarea" className={styles.formField} name="description" />
					<ErrorMessage name="description" component="div" className="error" />

					<Button className='button-main' type="submit">Submit</Button>
				</Form>
			</div>
		</Formik>
	);
}

export default AddJobPage;
