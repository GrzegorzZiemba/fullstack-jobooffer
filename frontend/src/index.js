import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Signup from "./components/Signup";
import Main from "./pages/Main";
import Login from "./components/Login";
import OfferPage from "./components/OfferPage";
import PrivateRoute from './components/PrivateRoute';
import AddJobPage from './pages/AddJobPage';
// import SignOut from "./components/SignOut";
// import EditJobForm from "./components/EditJobForm"; // Assuming you have this component

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* The index route is implied by the "/" path and should not be duplicated */}
      <Route index element={<Main />} />

      {/* Other public routes */}
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="offer" element={<OfferPage />} /> 

      {/* Nested routes within PrivateRoute for protected content */}
      <Route element={<PrivateRoute />}>
        {/* The paths for these routes should be unique and not conflict with public routes */}
        {/* Uncomment and adjust these routes as per your application's logic */}
        <Route path="addnewjob" element={<AddJobPage />} />
        {/* <Route path="signout" element={<SignOut />} /> */}
        {/* <Route path="edit/:jobId" element={<EditJobForm />} /> */}
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)