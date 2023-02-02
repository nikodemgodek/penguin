import "./Board.css";

import LoadingSpinner from "../LoadingSpinner.js";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import Box from "@mui/material/Box";

export default function Board() {
  const [countGuests, setCountGuests] = useState("-");
  const [countRooms, setCountRooms] = useState("-");

  const [guestsLoading, setGuestsLoading] = useState(true);
  const [roomsLoading, setRoomsLoading] = useState(true);

  const guestsCount = () => {
    axios
      .get("http://localhost:8080/guests/count")
      .then((response) => {
        setGuestsLoading(false);
        setCountGuests(response.data);
      })
      .catch((error) => {
        console.log("No response to fetch data from guests");
        setGuestsLoading(false);
      });
  };

  const roomsCount = () => {
    axios
      .get("http://localhost:8080/rooms/count")
      .then((response) => {
        setRoomsLoading(false);
        setCountRooms(response.data);
      })
      .catch((error) => {
        console.log("No response to fetch data from rooms");
        setRoomsLoading(false);
      });
  };

  useEffect(() => {
    guestsCount();
    roomsCount();
  }, []);
  return (
    <div className="board">
      <Box sx={{ mx: 5 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={3} item>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Typography variant="h4">
                    {guestsLoading ? <LoadingSpinner /> : countGuests}
                  </Typography>
                  <Typography variant="h6">Guests</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid xs={12} sm={3} item>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Typography variant="h4">
                    {roomsLoading ? <LoadingSpinner /> : countRooms}
                  </Typography>
                  <Typography variant="h6">Rooms</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mx: 5 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6} item>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center">
                  Chart
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={12} sm={6} item>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center">
                  Chart
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
