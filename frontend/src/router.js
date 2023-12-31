import React from "react";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// import Signup from "./components/Signup";
import Main from "./pages/Main";
import Login from "./pages/Login";
import OfferPage from "./pages/OfferPage";
import PrivateRoute from "./components/PrivateRoute";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import NotFoundPage from "./NotFoundPage";
import ManageUserPage from "./pages/ManageUserPage";
import ApplyPage from "./pages/ApplyPage";
// import SignOut from "./components/SignOut";
// import EditJobForm from "./components/EditJobForm"; // Assuming you have this component
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* The index route is implied by the "/" path and should not be duplicated */}
      <Route index element={<Main />} />

      {/* Other public routes */}
      {/* <Route path="signup" element={<Signup />} /> */}
      <Route path="login" element={<Login />} />
      <Route path="offer" element={<OfferPage />} />
      <Route path="/offer/:id" element={<OfferPage />} />
      <Route path="/edit/:id" element={<EditJobPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="addnewjob" element={<AddJobPage />} />
        <Route path="manageuser" element={<ManageUserPage />} />
        <Route path="/apply/:id" element={<ApplyPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);
