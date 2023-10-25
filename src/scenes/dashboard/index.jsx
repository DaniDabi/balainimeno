import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  useEffect(() => {
    const checkInCollection = collection(db, "check-in");
    const checkInQuery = query(checkInCollection);

    const unsubscribe = onSnapshot(checkInQuery, (snapshot) => {
      const transactions = [];
      snapshot.forEach((doc) => {
        const transactionData = doc.data();
        transactions.push({
          txId: doc.id,
          user: `${transactionData.firstName} ${transactionData.lastName}`,
          date: transactionData.date,
          cost: transactionData.total,
        });
      });
      setRecentTransactions(transactions);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const checkInCollection = collection(db, "check-in");
    const checkInQuery = query(checkInCollection);

    const unsubscribe = onSnapshot(checkInQuery, (snapshot) => {
      const transactions = [];
      let total = 0; // Initialize total sales

      snapshot.forEach((doc) => {
        const transactionData = doc.data();
        transactions.push({
          txId: doc.id,
          user: `${transactionData.firstName} ${transactionData.lastName}`,
          date: transactionData.date,
          cost: transactionData.total,
        });
        total += transactionData.total; // Add to total sales
      });

      setRecentTransactions(transactions);
      setTotalSales(total); // Set the total sales state
    });

    return () => {
      unsubscribe();
    };
  }, []);



  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title={`₱ ${totalSales}`} 
          subtitle="Total Sales" /* Updated subtitle */
          icon={
            <PointOfSaleIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>

        
      <Box
      gridColumn="span 4"
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      overflow="auto"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        colors={colors.grey[100]}
        p="15px"
      >
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Recent Transactions
        </Typography>
      </Box>
      {recentTransactions.map((transaction, i) => (
        <Box
          key={`${transaction.txId}-${i}`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          p="15px"
        >
          <Box>
            <Typography
              color={colors.greenAccent[500]}
              variant="h5"
              fontWeight="600"
            >
              {transaction.txId}
            </Typography>
            <Typography color={colors.grey[100]}>{transaction.user}</Typography>
          </Box>
          <Box color={colors.grey[100]}>{transaction.date}</Box>
          <Box
            backgroundColor={colors.greenAccent[500]}
            p="5px 10px"
            borderRadius="4px"
          >
            ₱{transaction.cost} {/* Added peso sign to cost */}
          </Box>
        </Box>
      ))}
    </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
