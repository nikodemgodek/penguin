import React from 'react';
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Board from "./Components/Board/Board";
import CheckIn from "./Components/CheckIn/CheckIn";
import CheckOut from "./Components/CheckOut/CheckOut";
import RoomBooking from "./Components/RoomBooking/RoomBooking";
import Rooms from "./Components/Rooms/Rooms";
import Guests from "./Components/Guests/Guests";
import Settings from "./Components/Settings/Settings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route index element={<Board />} />
          <Route path="checkin" element={<CheckIn />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="roombooking" element={<RoomBooking />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="guests" element={<Guests />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}
