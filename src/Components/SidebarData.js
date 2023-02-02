import React from 'react';
import PersonIcon from "@mui/icons-material/Person";
import BedIcon from "@mui/icons-material/Bed";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BuildIcon from "@mui/icons-material/Build";
import DashboardIcon from "@mui/icons-material/Dashboard";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "/"
  },
  {
    title: "Check In",
    icon: <DateRangeIcon />,
    link: "checkin"
  },
  {
    title: "Check out",
    icon: <DateRangeIcon />,
    link: "checkout"
  },
  {
    title: "Room booking",
    icon: <BedIcon />,
    link: "roombooking"
  },
  {
    title: "Rooms",
    icon: <BedIcon />,
    link: "rooms"
  },
  {
    title: "Guests",
    icon: <PersonIcon />,
    link: "guests"
  },
  {
    title: "Settings",
    icon: <BuildIcon />,
    link: "settings"
  }
];
