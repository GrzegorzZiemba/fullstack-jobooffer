import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./Nav.module.css";
import logo from "../../images/logo.png";
import { BsPersonFillLock, BsPersonFillAdd } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../slices/userApiSlice";
import { logout } from "../../slices/authApiSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutUserMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />{" "}
          {/* Added alt attribute for accessibility */}
        </div>

        <div className={styles.buttons}>
          <LinkContainer to="/">
            <button className={styles.button}>Home</button>
          </LinkContainer>
          {/* <LinkContainer to={user ? "/addnewjob" : "/login"}> */}
          <LinkContainer to="/addnewjob">
            <button className={styles.button}>
              {/* {user ? "Add new job offer" : "To add you need to login"} */}
              Add new job offer
            </button>
          </LinkContainer>
          <span className={styles.separator}></span>

          {userInfo ? (
            <>
              <button className={styles.button}>
                <Link to="/manageuser" className={styles.nofocus}>
                  <p className={styles.paragraph}>Manage User</p>
                </Link>
              </button>
              <button className={styles.button} onClick={logoutHandler}>
                <BsPersonFillAdd />
                <p className={styles.paragraph}>Sign out</p>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.nofocus}>
                <BsPersonFillLock />
                <p className={styles.paragraph}>Sign in</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
