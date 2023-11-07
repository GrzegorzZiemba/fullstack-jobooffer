import React from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import { Button } from "react-bootstrap";
import swal from "sweetalert";
import CreateAccountForm from './forms/CreateAccountForm';

const Signup = () => {
  return (
    <div><CreateAccountForm /></div>
  )
}

export default Signup