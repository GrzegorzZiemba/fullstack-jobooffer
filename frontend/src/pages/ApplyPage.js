// import "antd/dist/antd.css";
import React, { useState } from "react";
import { useGetJobQuery } from "../slices/jobApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { Button, Input, message } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useApplyUserMutation } from "../slices/userApiSlice";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const ApplyPage = () => {
  const { id: jobId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, error } = useGetJobQuery(jobId);
  const [cvFile, setCvFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const hasCvFile = Boolean(cvFile);
  const [applyJob] = useApplyUserMutation();
  const navigate = useNavigate();

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setCvFile(file);
      setPageNumber(1); // Reset page number when a new file is selected
    } else {
      message.error("Please select a valid PDF file.");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleApply = async () => {
    try {
      const user = userInfo.user;
      console.log(user);
      const payload = {
        jobId: jobId,
        userId: user,
      };
      const response = await applyJob(payload).unwrap();
      if (response.data) {
        message.info("You applied!");
        navigate("/");
      } else {
        message.error(
          "Unfortunalty you cannot Apply - maybe you are in the Database already ! :) "
        );
      }
    } catch (error) {
      console.log(".");
      message.error(
        "Unfortunalty you cannot Apply - maybe you are in the Database already ! :) "
      );
    }
  };

  const style = {
    maxWidth: "1200px",
    margin: "40px auto",
    textAlign: "center",
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading jobs!</p>;
  return (
    <div style={style}>
      <h2>Company name</h2>
      <h3>{data[0].company}</h3>
      <hr />
      <h2>Salary</h2>
      <h3>{data[0].salary}</h3>
      <hr />
      <h2>Job Position</h2>
      <h3>{data[0].position}</h3>
      <hr />
      <h2>Upload CV (PDF only)</h2>
      <Input type="file" accept=".pdf" onChange={onFileChange} />
      <div>
        {cvFile && (
          <div>
            <hr />
            <h2>CV Preview</h2>
            <Document file={cvFile} onLoadSuccess={onDocumentLoadSuccess}>
              <Page pageNumber={pageNumber} />
            </Document>
            <p>
              Page {pageNumber} of {numPages}
            </p>

            {/* Add the conditionally rendered button */}
            {hasCvFile && (
              <>
                <h1>By clicking APPLY you share your email with others!</h1>
                <Button type="primary" onClick={handleApply}>
                  APPLY
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;
