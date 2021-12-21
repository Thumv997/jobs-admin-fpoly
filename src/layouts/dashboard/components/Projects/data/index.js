/* eslint-disable react/prop-types */
// @mui material components

// Soft UI Dashboard React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images

import logoReact from "assets/images/small-logos/react-1.svg";

export default function data() {
  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [{ Header: "", accessor: "companies", width: "45%", align: "left" }],

    rows: [
      {
        companies: <Company image={logoReact} name="REACT NATIVE" />,
      },
    ],
  };
}
