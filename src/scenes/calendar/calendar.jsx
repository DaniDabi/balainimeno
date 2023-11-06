import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { db } from "../../config/firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");

  // Fetch events from Firestore
  useEffect(() => {
    const eventsCollection = collection(db, "events");
    const eventsQuery = query(eventsCollection);

    const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
      const events = [];
      snapshot.forEach((doc) => {
        const eventData = doc.data();
        events.push({
          id: doc.id,
          title: eventData.title,
          start: eventData.start,
          end: eventData.end,
          allDay: eventData.allDay,
        });
      });
      setCurrentEvents(events);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };

  const handleAddEvent = async () => {
    if (newEventTitle && newEventDate) {
      const eventsCollection = collection(db, "events");
      try {
        await addDoc(eventsCollection, {
          title: newEventTitle,
          start: newEventDate,
          end: newEventDate,
          allDay: true,
          created: serverTimestamp(),
        });
        setNewEventTitle("");
        setNewEventDate("");
      } catch (error) {
        console.error("Error adding event: ", error);
      }
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        {/* <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box> */}

        {/* CALENDAR */}\
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            eventClick={handleEventClick}
            events={currentEvents} // Pass the events data to FullCalendar
          />
        </Box>
      </Box>

      {/* Event creation form */}
      <Box
        p="10px"
        border={`1px solid ${colors.grey[300]}`}
        borderRadius="4px"
        mt="20px"
      >
        <Typography variant="h6">Add Event</Typography>
        <TextField
          label="Title"
          fullWidth
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          type="date"
          value={newEventDate}
          onChange={(e) => setNewEventDate(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddEvent}
          mt="10px"
        >
          Add Event
        </Button>
      </Box>
    </Box>
  );
};

export default Calendar;
