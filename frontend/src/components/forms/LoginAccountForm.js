import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import styles from '../Form.module.css'

const LoginAccountForm = () => {
  return (
    <Formik
			initialValues={{ email: "", password: "" }}
			validationSchema={Yup.object({
				email: Yup.string(),
				password: Yup.string(),
			})}
			onSubmit={(values, { setSubmitting }) => {
				 console.log(values.email)
				console.log(values.password)
					
			}}
		>
            <div className={styles.formContainer}>
			<h1>LOGIN</h1>

			<Form>

				<label htmlFor="email">E-mail</label>
				<Field
					className={styles.formField}
					name="email"
					type="text"
				/>
				<ErrorMessage name="email" component="div" style={{ color: "red" }} />

				<label htmlFor="password">Password</label>
				<Field
					className={styles.formField}
					name="password"
					type="password"
				/>
				<ErrorMessage
					name="password"
					component="div"
					style={{ color: "red" }}
				/>

				<Button className='button-main' type="submit">Submit</Button>
			</Form>
            </div>
		</Formik>
	);
}

export default LoginAccountForm