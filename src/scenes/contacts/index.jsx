import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "walkInOnline",
      headerName: "Walk-in/Online",
      type: "text",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Check-in Date",
      flex: 1,
    },
    {
      field: "time",
      headerName: "Check-in Time",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        // Render the cost with a peso sign
        <span>₱ {params.value}</span>
      ),
    },
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Define an async function to fetch data from Firestore
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "check-in"));
      const data = [];
      let idCounter = 1;
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        // Format data as required by the DataGrid
        data.push({
          id: idCounter++, // Firestore document ID
          registrarId: docData.idPresented,
          name: `${docData.firstName} ${docData.lastName}`,
          walkInOnline: docData.checkinType,
          phone: docData.contact,
          address: docData.address,
          date: docData.date,
          time: docData.time,
          cost: docData.total,
        });
      });
      setRows(data);
    };

    // Call the async function to fetch data when the component mounts
    fetchData();
  }, []);
  return (
    <Box m="20px">
      <Header
        title="Check-in"
        subtitle="List of customers"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
