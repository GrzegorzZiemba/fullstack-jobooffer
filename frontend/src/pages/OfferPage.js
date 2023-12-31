import Map from "../components/Map";
import styles from "./offerPage.module.css";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDeleteJobMutation, useGetJobQuery } from "../slices/jobApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
const OfferPage = () => {
  const { id: jobId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [deleteApiCall] = useDeleteJobMutation();
  const deleteHandler = async () => {
    try {
      await deleteApiCall(jobId).unwrap();
      navigate("/");
    } catch (error) {}
  };

  const { data, isLoading, error } = useGetJobQuery(jobId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs!</p>;

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

          {userInfo?.user === data[0].userId ? (
            <div>
              <Button variant="danger" onClick={deleteHandler}>
                Delete
              </Button>

              <LinkContainer to={`/edit/${jobId}`}>
                <Button variant="primary">Edit</Button>
              </LinkContainer>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div style={{ margin: "40px", padding: "20px" }}>
          <LinkContainer to={`/`}>
            <Button variant="secondary">Home</Button>
          </LinkContainer>{" "}
          {data[0].applied.includes(userInfo.user) ? (
            <h1>You already Applied here !</h1>
          ) : (
            <LinkContainer to={`/apply/${jobId}`}>
              <Button variant="primary">APPLY</Button>
            </LinkContainer>
          )}
        </div>
      </div>
      <div className={styles.map}>
        <Map city={data[0].city} work={data[0].company} />
      </div>
    </div>
  );
};

export default OfferPage;
