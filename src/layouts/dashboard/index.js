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
    datasets: { label: "công việc", data: [0, 0, 0, 0, 0, job.length] },
  };
  const sales = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Ứng viên", data: [0, 0, 0, 0, 0, data.length] },
  };
  const tasks = {
    labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: { label: "Nhà  tuyển dụng", data: [0, 0, 0, 0, 0, NTD.length] },
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
                title="Tổng lượng người dùng"
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
                title="Tổng công việc đã đăng"
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
                title="Nhà tuyển dụng"
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
                title="Ứng viên"
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
                  title="Công việc đăng trong tuần"
                  description="công việc đăng 6 tháng gần nhất"
                  date="______________________________"
                  chart={jobchart}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Ứng Viên"
                  description="lượng ứng viên 6 tháng gần nhất"
                  date="______________________________"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Nhà Tuyển Dụng"
                  description="lượng nhà tuyển dụng 6 tháng gần nhất"
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
