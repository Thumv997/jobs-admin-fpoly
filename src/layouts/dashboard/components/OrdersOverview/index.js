/**
=========================================================
* Material Dashboard 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Backdrop, Fade } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import MDInput from "../../../../components/MDInput";
import MDButton from "../../../../components/MDButton";
import axiosClient from "../../../../service";

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: "47px 30px 47px 30px",
      width: 500,
      [theme.breakpoints.down("sm")]: {
        width: "90%",
      },
    },
  })
);

function OrdersOverview() {
  // const [id, setId] = useState("");
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [count, setCount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const getapi = async () => {
    try {
      const res = await axiosClient.get("/jobs/career");
      setJobs(res.career);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getapi();
  }, [loading]);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const DeleteAPi = async (id) => {
    if (id) {
      try {
        const res = await axiosClient.delete(`/jobs/career/${id}`);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
      setLoading(!loading);
    }
  };
  const handleSubmit = async () => {
    try {
      const data = JSON.stringify({
        title,
        count,
      });
      const res = await axiosClient.post("/jobs/career", data);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
    setShowModal(false);
    setLoading(!loading);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleOnChangeValue = (e) => {
    setTitle(e.target.value);
  };
  const handleOnChangeValueCoun = (e) => {
    setCount(e.target.value);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3} display="flex" alignItems="center" justifyContent="space-between">
        <MDTypography variant="h6" fontWeight="medium">
          Danh Sách Ngành Nghề
        </MDTypography>
        <IconButton size="small" disableRipple color="secondary" onClick={handleShowModal}>
          <AddIcon />
        </IconButton>
      </MDBox>
      <MDBox p={3} maxHeight={400} overflow="scroll" marginBottom={3}>
        {jobs.map((job) => (
          <MDBox pt={2} px={2} display="flex" alignItems="center" justifyContent="space-between">
            <MDTypography variant="h4" fontWeight="medium">
              {job?.title}
            </MDTypography>
            {/* eslint no-underscore-dangle: 0  */}
            <MDButton
              variant="contained"
              color="primary"
              onClick={() => {
                // setId(job._id);
                DeleteAPi(job._id);
              }}
            >
              X
            </MDButton>
          </MDBox>
        ))}
      </MDBox>
      <Modal
        open={showModal}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        onClose={handleCancel}
        className={classes.modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <MDBox className={classes.paper}>
            <MDBox marginBottom={4}>
              <MDTypography variant="h2" fontWeight="medium">
                Add New Job
              </MDTypography>
            </MDBox>
            <MDBox marginBottom={2}>
              <MDInput type="title" label="Title" fullWidth onChange={handleOnChangeValue} />
            </MDBox>
            <MDBox>
              <MDInput
                type="description"
                label="Description"
                fullWidth
                onChange={handleOnChangeValueCoun}
              />
            </MDBox>
            <MDBox marginTop={4} display="flex">
              <MDBox marginRight={2}>
                <MDButton variant="contained" color="dark" onClick={handleCancel}>
                  Cancel
                </MDButton>
              </MDBox>
              <MDButton variant="contained" color="info" onClick={handleSubmit}>
                Submit
              </MDButton>
            </MDBox>
          </MDBox>
        </Fade>
      </Modal>
    </Card>
  );
}

export default OrdersOverview;
