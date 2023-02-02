import "./CheckOut.css";
import { useState } from "react";

import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export default function CheckOut() {
  const [field, setField] = useState("");
  const [msg, setMsg] = useState("");

  const handleField = (e) => {
    setField(e.target.value);
  };

  const resetFieldValue = () => {
    if (field) setField("");
  };

  const handleSubmit = () => {
    handleMessage("Test", 2500);
  };

  const handleMessage = (message, delay) => {
    setMsg(message);
    const time = setTimeout(() => {
      setMsg("");
    }, delay);
    return time;
  };

  return (
    <div className="checkout">
      <Paper>
        <Grid container spacing={1}>
          <Grid xs={12} item>
            <Box
              sx={{ m: 2 }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Typography gutterBottom variant="h6">
                Room ID
              </Typography>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                onChange={handleField}
                value={field}
              />
            </Box>
          </Grid>

          <Grid xs={12} item>
            <Box
              sx={{ m: 2 }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Typography gutterBottom variant="h6">
                {msg}
              </Typography>
            </Box>
          </Grid>

          <Grid xs={12} item>
            <Box
              sx={{ m: 2 }}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Box sx={{ mr: 2 }}>
                <Button onClick={resetFieldValue} variant="outlined">
                  Clear
                </Button>
              </Box>
              .
              <Button onClick={handleSubmit} variant="contained">
                Check out
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
