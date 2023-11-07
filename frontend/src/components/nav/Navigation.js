import React from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import styles from "./Nav.module.css";
import logo from "../../images/logo.png";
import { BsPersonFillLock,  BsPersonFillAdd} from "react-icons/bs";

const Navigation = () => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.container}>
				<div className={styles.logo}>
					<img src={logo} alt="Logo" /> {/* Added alt attribute for accessibility */}
				</div>

				<div className={styles.buttons}>
					<LinkContainer to="/">
						<button className={styles.button}>Home</button>
					</LinkContainer>
					{/* <LinkContainer to={user ? "/addnewjob" : "/login"}> */}
					<LinkContainer to='/'>
						<button className={styles.button}>
							{/* {user ? "Add new job offer" : "To add you need to login"} */}
							Add new job offer
						</button>
					</LinkContainer>
					<span className={styles.separator}></span>

			
						<Link to="/signout" className={styles.nofocus}>
							<BsPersonFillAdd />
							<p className={styles.paragraph}>Sign out</p>
						</Link>
			
						<Link to="/login" className={styles.nofocus}>
							<BsPersonFillLock />
							<p className={styles.paragraph}>Sign in</p>
						</Link>
			
				</div>
			</div>
		</nav>
	);
};

export default Navigation;
