import Map from "./Map";
import styles from "./offerPage.module.css";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetJobQuery } from "../slices/jobApiSlice";
const OfferPage = () => {
  const { id: jobId } = useParams();

  const { data, isLoading, error } = useGetJobQuery(jobId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs!</p>;

  const city = "Poznan";
  const work = "Working srorking";
  console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <img src="/" className={styles.img} alt="Cloudy Sky" />
          <h1>{work}</h1>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.info}></div>
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
          <div className={styles.info}>
            <h3>Expiry Date</h3>
            <p>
              Offer is not valid
              {/* {" "}
							<i class="far fa-calendar-alt"></i>{" "}
							{formatDate(activeTill) !== "NaN-NaN-NaN"
								? formatDate(activeTill)
								: " Offer is not valid "} */}
            </p>{" "}
          </div>
        </div>
        <Link className="btn btn-light my-3" to="/">
          Home
        </Link>
      </div>
      <div className={styles.map}>
        <Map city={data[0].city} work={work} />
      </div>
    </div>
  );
};

export default OfferPage;
