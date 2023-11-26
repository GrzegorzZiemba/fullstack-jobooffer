// NotFoundPage.js
import React from "react";

const NotFoundPage = () => {
  const style = {
    maxWidth: "1200px",
    margin: "40px auto",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  };
  return (
    <div style={style}>
      <div>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <a href="/">Go back </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
