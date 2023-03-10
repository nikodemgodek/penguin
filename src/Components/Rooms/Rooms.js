import "./Rooms.css";
import React from 'react';
import Box from "@mui/material/Box";
import RoomsTable from "./RoomsTable";

export default function Rooms() {
  return (
    <div className="rooms">
      <Box sx={{ m: 2 }}>
        <RoomsTable />
      </Box>
    </div>
  );
}
