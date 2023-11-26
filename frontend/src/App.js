import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import AddJobForm from "./components/forms/AddJobForm";
// import EditJobForm from "./components/forms/EditJobForm";
import Navigation from "./components/nav/Navigation";
import ErrorBoundary from "./ErrorBoundary";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navigation />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
}

export default App;
