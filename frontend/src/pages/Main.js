import React from "react";
import ShowOffers from "../components/ShowOffers";
import { useGetJobsQuery } from "../slices/jobApiSlice";

const Main = () => {
  const { data, isLoading, error } = useGetJobsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs!</p>;

  const style = {
    maxWidth: "1200px",
    margin: "40px auto",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  };

  return (
    <div style={style}>
      {data &&
        data.map((item, index) => (
          <ShowOffers
            workplace={item.work} // Ensure these fields match your data structure
            id={item._id}
            image={item.image}
            position={item.position}
            iden={item.uid}
            key={index}
          />
        ))}
    </div>
  );
};

export default Main;
