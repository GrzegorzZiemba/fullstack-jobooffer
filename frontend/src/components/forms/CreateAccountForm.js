import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { style } from '@mui/system';
import styles from '../Form.module.css'

const CreateAccountForm = () => {
  return (
    <Formik
    initialValues={{ email: "", password: "" }}
    validationSchema={Yup.object({
        email: Yup.string(),
        password: Yup.string(),
    })}
    onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
       
                console.log(values.username)
                console.log(values.email)
                console.log(values.password)
       
    }}
>
    <div className={styles.formContainer}>
    <h1>SINGIN</h1>

        <Form as='form'>
            
            <label htmlFor="username">Username</label>
            <Field
className={styles.formField}                name="username"
                type="text"
            />
            <ErrorMessage name="email" component="div" style={{ color: "red" }} />
          
            <label htmlFor="email">E-mail</label>
            <Field
className={styles.formField}                name="email"
                type="text"
            />
            <ErrorMessage name="email" component="div" style={{ color: "red" }} />
            
            <label htmlFor="password">Password</label>
            <Field
className={styles.formField}                name="password"
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
</Formik> )
}

export default CreateAccountForm