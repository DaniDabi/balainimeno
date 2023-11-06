import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { tokens } from "../../theme";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import StatBox from "../../components/StatBox";
import { db } from "../../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Bar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalSales, setTotalSales] = useState({});

  // Function to calculate total sales for a given room type
  const calculateTotalSales = async (roomType) => {
    const checkInCollection = collection(db, "check-in");
    const q = query(checkInCollection, where("roomType", "==", roomType));
    const querySnapshot = await getDocs(q);

    let total = 0;
    querySnapshot.forEach((doc) => {
      const transactionData = doc.data();
      total += transactionData.total || 0;
    });

    return total;
  };

  // Use the function to calculate total sales for each room type
  useEffect(() => {
    const roomTypes = ["Suite Room", "Knight Room", "Queen Chamber", "Queen Family 1", "Queen Family 2"];
    const totalSalesData = {};

    roomTypes.forEach(async (roomType) => {
      const sales = await calculateTotalSales(roomType);
      totalSalesData[roomType] = sales;
      setTotalSales(totalSalesData);
    });
  }, []);

  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Breakdown" />
      <Box height="50vh">
        <BarChart />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(9, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {Object.entries(totalSales).map(([roomType, sales]) => (
          <Box
            key={roomType}
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={`₱ ${sales.toString()}`}
              subtitle={roomType}
              icon={
                <PointOfSaleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Bar;
