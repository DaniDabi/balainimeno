import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import EditableDateCell from "./EditableDateCell";
import EditableDaysCell from "./EditabelDaysCell";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "idPresented", headerName: "ID Presented" },
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
      field: "checkInDate",
      headerName: "Check-in Date",
      flex: 1,
    },
    {
      field: "checkOutDate",
      headerName: "Check-out Date",
      flex: 1,
      renderCell: (params) => {
        return (
          <EditableDateCell
            initialValue={params.row.checkOutDate}
            onSave={(newDate) => handleDateEdit(params.row.id, newDate)}
          />
        );
      },
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
      renderCell: (params) => <span>₱ {params.value}</span>,
    },
    {
      field: "days",
      headerName: "Number of Days",
      flex: 1,
      renderCell: (params) => {
        return (
          <EditableDaysCell
            initialValue={params.row.days}
            onSave={(newDays) => handleDaysEdit(params.row.id, newDays)}
          />
        );
      },
    },
  ];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "check-in"));
      const data = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        data.push({
          id: doc.id,
          idPresented: docData.idPresented,
          name: `${docData.firstName} ${docData.lastName}`,
          walkInOnline: docData.checkinType,
          phone: docData.contact,
          address: docData.address,
          checkInDate: docData.checkInDate,
          checkOutDate: docData.checkOutDate,
          time: docData.time,
          cost: docData.total,
          days: docData.numberOfDays,
        });
      });
      setRows(data);
    };

    fetchData();
  }, []);

  const handleDateEdit = async (documentId, newDate) => {
    try {
      const docRef = doc(db, "check-in", documentId);
      await updateDoc(docRef, {
        checkOutDate: newDate,
      });
      toast.success("Date Successfully Adjusted", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error updating date:", error);
      toast.error("Data failed to submit", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleDaysEdit = async (documentId, newDays) => {
    try {
      const docRef = doc(db, "check-in", documentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const docData = docSnap.data();
        const total =
          parseFloat(docData.roomRate) - parseFloat(docData.discount);
        await updateDoc(docRef, {
          numberOfDays: newDays,
          total: parseFloat(total) * parseFloat(newDays),
        });
        toast.success("Days and Cost Successfully Adjusted", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error updating Days:", error);
      toast.error("Data failed to submit", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Box m="20px">
      <Header title="Check-in" subtitle="List of customers" />
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
        <ToastContainer />
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
