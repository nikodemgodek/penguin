import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

import { useState, useEffect } from "react";

export default function GuestsTable() {
  const [rooms, setRooms] = useState([]);
  const [err, setErr] = useState("");
  const [dataStatus, setDataStatus] = useState(false);

  const getRooms = () => {
    axios
      .get("http://localhost:8080/rooms")
      .then((response) => {
        setRooms(response.data);
        setDataStatus(true);
      })
      .catch((error) => {
        setDataStatus(false);

        if (error.response) {
          setErr("No response from server.");
        } else if (error.request) {
          setErr("Request failed.");
        } else {
          setErr("Unknown error.");
        }
      });
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Number</TableCell>
            <TableCell align="left">Room capacity</TableCell>
            <TableCell align="left">Room type</TableCell>
            <TableCell align="left">Availability</TableCell>
          </TableRow>
        </TableHead>
        {dataStatus ? (
          <TableBody>
            {rooms.map((room, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {room.name}
                </TableCell>
                <TableCell align="left">{room.number}</TableCell>
                <TableCell align="left">{room.capacity}</TableCell>
                <TableCell align="left">{room.type}</TableCell>
                <TableCell align="left">{room.availability}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>{err}</TableBody>
        )}
        {rooms.length <= 0 ? <TableBody>No rooms available.</TableBody> : ""}
      </Table>
    </TableContainer>
  );
}
