
import React, { useState } from "react";
import { Box, Button, TextField, Select, MenuItem} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";


const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    // Create a reference to the 'check-in' collection
    const checkInCollection = collection(db, "check-in");
    const total = parseFloat(values.roomRate) - parseFloat(values.discount)
  
    try {
      // Add the form data to the Firestore collection
      await addDoc(checkInCollection, {
        checkinType: values.checkinType,
        idPresented: values.idPresented,
        date: values.date,
        time: values.time,
        firstName: values.firstName,
        lastName: values.lastName,
        roomType: values.roomType,
        roomNum: values.roomNum,
        contact: values.contact,
        address: values.address,
        roomRate: values.roomRate,
        discount: values.discount,
        numberOfDays: values.numberOfDays,
        total: parseFloat(total) * parseFloat (values.numberOfDays)
      });
      toast.success("Data successfully submitted", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
  
      // Show an error toast notification
      toast.error("Data failed to submit", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false); // Stop the loading effect
    }
  };
  

  return (
    <Box m="20px">
      <Header title="CHECK-IN" subtitle="Enter New Customer Infomation" />
      <ToastContainer />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Select
                fullWidth
                variant="filled"
                label="Select Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.checkinType}
                name="checkinType"
                error={!!touched.checkinType && !!errors.checkinType}
                helperText={touched.checkinType && errors.checkinType}
                sx={{ gridColumn: "span 1", gridRow: "1 / span 1" }}
              >
                <MenuItem value="select" disabled>Select | walk-in/online</MenuItem>
                <MenuItem value="walk-in">Walk-in</MenuItem>
                <MenuItem value="online">Online</MenuItem>
              </Select>
              <Select
                fullWidth
                variant="filled"
                label="Id Presented"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.idPresented}
                name="idPresented"
                error={!!touched.idPresented && !!errors.idPresented}
                helperText={touched.idPresented && errors.idPresented}
                sx={{ gridColumn: "span 1", gridRow: "1 / span 1" }}
              >
                <MenuItem value="id" disabled>Id Presented</MenuItem>
                <MenuItem value="driver's license">Driver's License</MenuItem>
                <MenuItem value="philhealth">PhilHealth</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date}
                name="date"
                error={!!touched.date && !!errors.date}
                helperText={touched.date && errors.date}
                sx={{ gridColumn: "span 1", gridRow: "1 / span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="time"
                label="Time"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.time}
                name="time"
                error={!!touched.time && !!errors.time}
                helperText={touched.time && errors.time}
                sx={{ gridColumn: "span 1", gridRow: "1 / span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 1", gridRow: "2 / span 1" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 1", gridRow: "2 / span 1" }}
              />
              <Select
                fullWidth
                variant="filled"
                label="Room Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomType}
                name="roomType"
                error={!!touched.roomType && !!errors.roomType}
                helperText={touched.roomType && errors.roomType}
                sx={{ gridColumn: "span 1", gridRow: "2 / span 1" }}
              >
                <MenuItem value="roomType" disabled>Select room type</MenuItem>
                <MenuItem value="kingSuite">King Suite</MenuItem>
                <MenuItem value="queenChamber">Queen Chamber</MenuItem>
                <MenuItem value="knightRoom">Knight Room</MenuItem>
                <MenuItem value="queenFamily1">Queen Family 1</MenuItem>
                <MenuItem value="queenFamily2">Queen Family 2</MenuItem>
              </Select>
              <Select
                fullWidth
                variant="filled"
                label="Room Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomNum}
                name="roomNum"
                error={!!touched.roomNum && !!errors.roomNum}
                helperText={touched.roomNum && errors.roomNum}
                sx={{ gridColumn: "span 1", gridRow: "2 / span 1" }}
              >
                <MenuItem value="roomNum" disabled>Select Room Number</MenuItem>
                <MenuItem value="202">202</MenuItem>
                <MenuItem value="203">203</MenuItem>
                <MenuItem value="204">204</MenuItem>
                <MenuItem value="205">205</MenuItem>
                <MenuItem value="206">206</MenuItem>
                <MenuItem value="207">207</MenuItem>
                <MenuItem value="208">208</MenuItem>
                <MenuItem value="301">301</MenuItem>
                <MenuItem value="302">302</MenuItem>
                <MenuItem value="303">303</MenuItem>
                <MenuItem value="304">304</MenuItem>
                <MenuItem value="305">305</MenuItem>
                <MenuItem value="306">306</MenuItem>
                <MenuItem value="307">307</MenuItem>
                <MenuItem value="308">308</MenuItem>
                <MenuItem value="401">401</MenuItem>
                <MenuItem value="402">402</MenuItem>
                <MenuItem value="403">403</MenuItem>
                <MenuItem value="404">404</MenuItem>
                <MenuItem value="405">405</MenuItem>
                <MenuItem value="406">406</MenuItem>
                <MenuItem value="407">407</MenuItem>
              </Select>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 1",gridRow: "3 / span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 1",gridRow: "3 / span 1" }}
              />
              <Select
                fullWidth
                variant="filled"
                label="Room Rate"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.roomRate}
                name="roomRate"
                error={!!touched.roomRate && !!errors.roomRate}
                helperText={touched.roomRate && errors.roomRate}
                sx={{ gridColumn: "span 1", gridRow: "3 / span 1" }}
              >
                <MenuItem value="roomRate" disabled>Room Rate</MenuItem>
                <MenuItem value="600">600</MenuItem>
                <MenuItem value="1200">1200</MenuItem>
                <MenuItem value="1899">1899</MenuItem>
                <MenuItem value="3499">3499</MenuItem>
                <MenuItem value="3999">3999</MenuItem>
                <MenuItem value="4699">4699</MenuItem>
              </Select>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Discount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.discount}
                name="discount"
                error={!!touched.discount && !!errors.discount}
                helperText={touched.discount && errors.discount}
                sx={{ gridColumn: "span 1",gridRow: "3 / span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number" // Change the input type to "number"
                label="Number of Days"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.numberOfDays}
                name="numberOfDays"
                error={!!touched.numberOfDays && !!errors.numberOfDays}
                helperText={touched.numberOfDays && errors.numberOfDays}
                sx={{ gridColumn: "span 1", gridRow: "4 / span 1" }} // Adjust the size
              />
            </Box>
            <Box display="flex" justifyContent="start" mt="20px">
              <Button type="submit" color="secondary" variant="contained"  disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required"),
  checkinType: yup.string().required("required"),
  idPresented: yup.string().required("required"),
  roomRate: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address: "",
  checkinType: "select",
  idPresented: "id",
  roomType:"roomType",
  roomNum:"roomNum",
  roomRate:"roomRate",
  discount: 0,
  numberOfDays: 1,
};

export default Form;
