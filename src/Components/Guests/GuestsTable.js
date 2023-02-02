import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

import LoadingSpinner from "../LoadingSpinner.js";

import { useState, useEffect } from "react";

export default function GuestsTable() {
  const [guests, setGuests] = useState([]);
  const [err, setErr] = useState("");
  const [dataStatus, setDataStatus] = useState(false);

  const [guestsLoading, setGuestsLoading] = useState(true);

  const getGuests = () => {
    axios
      .get("http://localhost:8080/guests")
      .then((response) => {
        setGuests(response.data);
        setDataStatus(true);
        setGuestsLoading(false);
      })
      .catch((error) => {
        setDataStatus(false);
        setGuestsLoading(false);
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
    getGuests();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First name</TableCell>
            <TableCell align="left">Last name</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Zip code</TableCell>
            <TableCell align="left">City</TableCell>
            <TableCell align="left">Passport</TableCell>
            <TableCell align="left">Card number</TableCell>
            <TableCell align="left">CVC</TableCell>
            <TableCell align="left">Room number</TableCell>
            <TableCell align="left">Date from</TableCell>
            <TableCell align="left">Date to</TableCell>
          </TableRow>
        </TableHead>
        {dataStatus ? (
          <TableBody>
            {guests.map((guest, key) => (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {guest.firstName}
                </TableCell>
                <TableCell align="left">{guest.lastName}</TableCell>
                <TableCell align="left">{guest.address}</TableCell>
                <TableCell align="left">{guest.zipCode}</TableCell>
                <TableCell align="left">{guest.city}</TableCell>
                <TableCell align="left">{guest.passport}</TableCell>
                <TableCell align="left">{guest.cardNumber}</TableCell>
                <TableCell align="left">{guest.cvc}</TableCell>
                <TableCell align="left">{guest.apartmentNo}</TableCell>
                <TableCell align="left">{guest.dateFrom}</TableCell>
                <TableCell align="left">{guest.dateTo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            {guestsLoading ? (
              <LoadingSpinner />
            ) : (
              "Couldn't fetch data from server."
            )}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
