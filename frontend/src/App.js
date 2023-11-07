import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AddJobForm from "./components/forms/AddJobForm";
// import EditJobForm from "./components/forms/EditJobForm";
import Navigation from "./components/nav/Navigation";
import Signup from "./components/Signup";

import Main from "./pages/Main";

import Login from "./components/Login";
// import SignOut from "./components/SignOut";
import OfferPage from "./components/OfferPage";


function App() {
  
  return (
    <div className="App">
    <Router>
      <Navigation  />
      <Routes>
        {/* <Route path="/addnewjob" element={uid ? <AddJobForm /> : <div>Please sign in to add a new job.</div>} /> */}
        <Route path="/" element={<Main />} />
        {/* <Route path="/signout" element={<SignOut />} /> */}
        <Route path="/login" element={<Login />} />
      {/* <Route path="/edit/:jobId" element={<EditJobForm />} /> */}
      <Route path="/signup" element={<Signup />} />
        <Route path="/offer" element={<OfferPage />} /> 
      </Routes>
    </Router>
  </div>
  );
}

export default App;
