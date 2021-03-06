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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";
import axiosClient from "../../service";

function Dashboard() {
  const [data, setData] = useState([]);
  const [job, setJob] = useState([]);
  const [NTD, setNTD] = useState([]);

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
    } catch (e) {
      console.log(e);
    }
  };

  const getJob = async () => {
    try {
      const res = await axiosClient.get("/jobs");
      setJob(res.jobs);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  const jobchart = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "c??ng vi???c", data: [0, 0, 0, 0, 0, job.length] },
  };
  const sales = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "???ng vi??n", data: [0, 0, 0, 0, 0, data.length] },
  };
  const tasks = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Nh??  tuy???n d???ng", data: [0, 0, 0, 0, 0, NTD.length] },
  };

  useEffect(() => {
    getapi();
    getJob();
    getNTD();
  }, []);
  return (
    <DashboardLayout>
      {/* <DashboardNavbar /> */}
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="T???ng l?????ng ng?????i d??ng"
                count={data.length + NTD.length}
                percentage={{
                  color: "success",
                  amount: "--",
                  label: "-------",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="T???ng c??ng vi???c ???? ????ng"
                count={job.length || 0}
                percentage={{
                  color: "success",
                  amount: "--",
                  label: "-------",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Nh?? tuy???n d???ng"
                count={NTD.length}
                percentage={{
                  color: "success",
                  amount: "----",
                  label: "----------",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="???ng vi??n"
                count={data.length}
                percentage={{
                  color: "success",
                  amount: "---",
                  label: "--------",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="C??ng vi???c ????ng trong tu???n"
                  description="c??ng vi???c ????ng 6 th??ng g???n nh???t"
                  date="______________________________"
                  chart={jobchart}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="???ng Vi??n"
                  description="l?????ng ???ng vi??n 6 th??ng g???n nh???t"
                  date="______________________________"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Nh?? Tuy???n D???ng"
                  description="l?????ng nh?? tuy???n d???ng 6 th??ng g???n nh???t"
                  date="______________________________"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
