import React from "react";

import swal from "sweetalert";
import LoginAccountForm from "../components/forms/LoginAccountForm";
import CreateAccountForm from "../components/forms/CreateAccountForm";

const Login = () => {
  return (
    <div>
      <LoginAccountForm />
      <hr />

      <CreateAccountForm />
    </div>
  );
};

export default Login;
