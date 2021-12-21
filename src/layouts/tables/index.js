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
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import React, { useEffect, useState } from "react";
import team2 from "assets/images/favicon.png";
import { Backdrop, Fade, Modal } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import axiosClient from "../../service";
import MDAvatar from "../../components/MDAvatar";
import MDButton from "../../components/MDButton";
import MDInput from "../../components/MDInput";

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

function Tables() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [NTD, setNTD] = useState([]);
  const [namee, setName] = useState("");
  const [phonee, setPhone] = useState("");
  const [addresse, setAddress] = useState("");
  const [birthdayy, setbirthday] = useState("");
  const [id, setId] = useState("");
  const [load, setload] = useState(false);
  const classes = useStyles();

  const handleSubmit = async () => {
    try {
      const dataa = JSON.stringify({
        name: namee,
        phone: phonee,
        address: addresse,
        birthday: birthdayy,
      });
      console.log(dataa);
      const res = await axiosClient.patch(`/users/updateUserForAdmin/${id}`, dataa);
      console.log(res);
      setload(!load);
    } catch (e) {
      console.log(e);
    }
    setShowModal(false);
    setload(!load);
  };
  const handleCancel = () => {
    setShowModal(false);
  };

  const handleOnChangeValue = (e) => {
    setName(e.target.value);
  };
  const handleOnChangeValue1 = (e) => {
    setPhone(e.target.value);
  };
  const handleOnChangeValue2 = (e) => {
    setAddress(e.target.value);
  };
  const handleOnChangeValue3 = (e) => {
    setbirthday(e.target.value);
  };

  const getapi = async () => {
    try {
      const res = await axiosClient.get("/users");
      setData(res.users);
      console.log(data.length);
    } catch (e) {
      console.log(e);
    }
  };
  const getNTD = async () => {
    try {
      const res = await axiosClient.get("/users/get-all-ntd");
      setNTD(res.users);
      console.log(NTD);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getapi();

    getNTD();
  }, [load]);

  return (
    <DashboardLayout>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Nhà tuyển dụng
                </MDTypography>
              </MDBox>
              <MDBox p={3} overflow="scroll" maxHeight={400}>
                {NTD.map((item) => (
                  <MDBox
                    pt={2}
                    px={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <MDBox display="flex" alignItems="center" lineHeight={1}>
                      <MDAvatar
                        src={item?.avatar ? item?.avatar : team2}
                        name={item?.name}
                        size="sm"
                      />
                      <MDBox ml={2} lineHeight={1}>
                        <MDTypography display="block" variant="button" fontWeight="medium">
                          {item?.name}
                        </MDTypography>
                        <MDTypography variant="caption">{item?.email}</MDTypography>
                      </MDBox>
                    </MDBox>
                    <MDButton
                      variant="contained"
                      color="dark"
                      onClick={() => {
                        setId(item?._id);
                        setShowModal(true);
                      }}
                    >
                      EDIT
                    </MDButton>
                  </MDBox>
                ))}
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Ứng viên
                </MDTypography>
              </MDBox>
              <MDBox p={3} overflow="scroll" maxHeight={400}>
                {data.map((item) => (
                  <MDBox
                    pt={2}
                    px={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <MDBox display="flex" alignItems="center" lineHeight={1}>
                      <MDAvatar
                        src={item?.avatar ? item?.avatar : team2}
                        name={item?.name}
                        size="sm"
                      />
                      <MDBox ml={2} lineHeight={1}>
                        <MDTypography display="block" variant="button" fontWeight="medium">
                          {item?.name}
                        </MDTypography>
                        <MDTypography variant="caption">{item?.email}</MDTypography>
                      </MDBox>
                    </MDBox>
                    {/* eslint no-underscore-dangle: 0  */}
                    <MDButton
                      variant="contained"
                      color="dark"
                      onClick={() => {
                        setId(item?._id);
                        setShowModal(true);
                      }}
                    >
                      EDIT
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
                        EDIT USERS
                      </MDTypography>
                    </MDBox>
                    <MDBox marginBottom={2}>
                      <MDInput type="name" label="name" fullWidth onChange={handleOnChangeValue} />
                    </MDBox>
                    <MDBox marginBottom={2}>
                      <MDInput
                        type="phone"
                        label="phone"
                        fullWidth
                        onChange={handleOnChangeValue1}
                      />
                    </MDBox>
                    <MDBox marginBottom={2}>
                      <MDInput
                        type="address"
                        label="address"
                        fullWidth
                        onChange={handleOnChangeValue2}
                      />
                    </MDBox>
                    <MDBox marginBottom={2}>
                      <MDInput
                        type="birthday"
                        label="birthday"
                        fullWidth
                        onChange={handleOnChangeValue3}
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
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
