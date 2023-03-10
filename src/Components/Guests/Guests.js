import "./Guests.css";
import React from 'react';
import Box from "@mui/material/Box";
import GuestsTable from "./GuestsTable";

export default function Guests() {
  return (
    <div className="guests">
      <Box sx={{ m: 2 }}>
        <GuestsTable />
      </Box>
    </div>
  );
}
