import React from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import { Button } from "react-bootstrap";
import swal from "sweetalert";
import LoginAccountForm from './forms/LoginAccountForm';
import CreateAccountForm from './forms/CreateAccountForm'

const Login = () => {
  return (
    <div>
      <LoginAccountForm />
      <hr />
      
      <CreateAccountForm />
      </div>
  )
}

export default Login