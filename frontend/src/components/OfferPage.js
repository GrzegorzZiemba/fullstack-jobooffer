import Map from "./Map";
import styles from "./offerPage.module.css";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDeleteJobMutation, useGetJobQuery } from "../slices/jobApiSlice";
import { useDispatch, useSelector } from "react-redux";
const OfferPage = () => {
  const { id: jobId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [deleteApiCall] = useDeleteJobMutation();
  const deleteHandler = async () => {
    try {
      console.log(jobId);
      await deleteApiCall(jobId).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, error } = useGetJobQuery(jobId);

  console.log(userInfo.user);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs!</p>;
  console.log(data[0]);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <img
            src={data[0].image ? data[0].image : ""}
            className={styles.img}
            alt="Cloudy Sky"
          />
          <h1>{data[0].company}</h1>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <h3>Company </h3>
            <p>{data[0].company}</p>
          </div>
          <div className={styles.info}>
            <h3>Position </h3>
            <p>{data[0].position}</p>
          </div>
          <div className={styles.info}>
            <h3>Salary </h3>
            <p>{data[0].salary} $ per month</p>
          </div>
          <div className={styles.info}>
            <h3>City </h3>
            <p>{data[0].city}</p>
          </div>
          <div className={styles.info}>
            <h3>Description </h3>
            <p>{data[0].description}</p>
          </div>
          {/* <div className={styles.info}>
            <h3>Expiry Date</h3>
            <p>
              Offer is not valid
              {/* {" "}
							<i class="far fa-calendar-alt"></i>{" "}
							{formatDate(activeTill) !== "NaN-NaN-NaN"
								? formatDate(activeTill)
								: " Offer is not valid "} */}
          {/* </p>{" "}
          </div> */}{" "}
          {userInfo.user === data[0].userId ? (
            <button onClick={deleteHandler}>Can delete</button>
          ) : (
            <h2>cannot delete</h2>
          )}
        </div>
        <Link className="btn btn-light my-3" to="/">
          Home
        </Link>
      </div>
      <div className={styles.map}>
        <Map city={data[0].city} work={data[0].company} />
      </div>
    </div>
  );
};

export default OfferPage;
