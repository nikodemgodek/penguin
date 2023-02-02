import * as React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";

import "./CheckIn.css";
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography
} from "@mui/material";

import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Box from "@mui/material/Box";
import axios from "axios";

const APARTMENT_SEARCH_ENDPOINT = "http://localhost:8080/rooms/search?";

export default function CheckIn() {
  const [roomType, setRoomType] = useState("Economy");
  const [roomCapacity, setRoomCapacity] = useState("Single");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [insertedApartment, setInsertedApartment] = useState("");
  const [msg, setMsg] = useState("");

  const [success, setSuccess] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: "onBlur" // "onChange"
  });
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    const dataToSend = JSON.stringify(data);

    //console.log(success);

    // 1. Check inserted room number is available

    const roomInput = data.apartmentNumber;
    const passport = data.passport;
    //console.log(roomInput);

    // 2. Request to db and check room with id 'roomInput' available column = true

    async function validateRoomInput() {
      const request = await axios.get(
        `http://localhost:8080/rooms/validate?number=${roomInput}`
      );

      const req = await axios.get(
        `http://localhost:8080/guests/find?passport=${passport}`
      );

      const user = req.data;
      const status = request.data;

      if (status && user <= 0) {
        await axios.post(`http://localhost:8080/guests/add`, dataToSend, {
          headers: {
            // 'application/json' is the modern content-type for JSON, but some
            // older servers may use 'text/json'.
            // See: http://bit.ly/text-json
            "content-type": "application/json"
          }
        });
        console.log("Guest added successfuly");
        setMsg("Guest added successfuly");

        //change available to false for this number

        await axios
          .post(
            `http://localhost:8080/rooms?available=false&number=${roomInput}`
          )
          .then(() => {
            console.log("Room status changed to false successfuly");
          });
      } else {
        console.log(
          "Failed to check status for that room. Make sure room is free or exist!"
        );

        setMsg(
          "Failed to check status for that room. Make sure room is free or exist!"
        );
      }
    }

    validateRoomInput();
  };

  const findApartment = () => {
    console.log(
      APARTMENT_SEARCH_ENDPOINT +
        `capacity=${roomCapacity}&type=${roomType}&available=true`
    );
    axios
      .get(
        APARTMENT_SEARCH_ENDPOINT +
          `capacity=${roomCapacity}&type=${roomType}&available=true`
      )
      .then((response) => {
        if (response.data.length === 0) {
          setAvailableRooms("Empty rooms with those params are not available.");
          console.log(response.data);
        } else {
          setAvailableRooms(response.data);
          console.log(response.data);
        }
      });
  };

  const roomTypeRadioHandler = (e) => {
    setRoomType(e.target.value);
  };

  const roomCapacityRadioHandler = (e) => {
    setRoomCapacity(e.target.value);
  };

  return (
    <div className="checkin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mx: 5 }}>
          <Card>
            <CardContent>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Personal data
                </Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <TextField
                      error={errors.firstName ? "true" : ""}
                      helperText={
                        errors.firstName ? "First name must be correct" : ""
                      }
                      {...register("firstName", {
                        required: true,
                        pattern: /^[a-zA-Z]+$/
                      })}
                      id="firstName"
                      label="First name"
                      variant="standard"
                    />
                  </Box>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <TextField
                      error={errors.lastName ? "true" : ""}
                      helperText={
                        errors.lastName ? "Last name must be correct" : ""
                      }
                      {...register("lastName", {
                        required: true,
                        pattern: /^[a-zA-Z]+$/
                      })}
                      id="lastName"
                      label="Last name"
                      variant="standard"
                    />
                  </Box>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <TextField
                      error={errors.address ? "true" : ""}
                      helperText={errors.address ? "Address is required" : ""}
                      {...register("address", { required: true })}
                      id="address"
                      label="Address"
                      variant="standard"
                    />
                  </Box>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <TextField
                      error={errors.zip ? "true" : ""}
                      helperText={
                        errors.zip
                          ? "Zip code must have correct format i.e. 50-231"
                          : ""
                      }
                      {...register("zipCode", {
                        required: true,
                        pattern: /[0-9]{2}-[0-9]{3}/
                      })}
                      id="zipCode"
                      label="Zip code"
                      variant="standard"
                    />
                  </Box>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <TextField
                      error={errors.city ? "true" : ""}
                      helperText={errors.city ? "City is required" : ""}
                      {...register("city", { required: true })}
                      id="city"
                      label="City"
                      variant="standard"
                    />
                  </Box>
                </Grid>

                <Grid xs={12} sm={6} item>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <TextField
                      error={errors.passport ? "true" : ""}
                      helperText={
                        errors.passport ? "Invalid passport number format" : ""
                      }
                      {...register("passport", {
                        required: true,
                        pattern: /[A-Z]{1}[0-9]{7}/
                      })}
                      id="passport"
                      label="Passport number"
                      variant="standard"
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ mx: 5 }}>
          <Card>
            <CardContent>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Payment
                </Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <TextField
                      error={errors.cardNumber ? "true" : ""}
                      helperText={
                        errors.cardNumber ? "Card number is required" : ""
                      }
                      {...register("cardNumber", {
                        required: true
                      })}
                      id="cardNumber"
                      label="Card number"
                      variant="standard"
                    />
                  </Box>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <TextField
                      error={errors.cvc ? "true" : ""}
                      helperText={errors.cvc ? "Invalid CVC code format" : ""}
                      {...register("cvc", {
                        required: true,
                        pattern: /^[0-9]{3,4}$/
                      })}
                      id="cvc"
                      label="CVC code"
                      variant="standard"
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ mx: 5 }}>
          <Card>
            <CardContent>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Room details
                </Typography>
              </Box>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Typography variant="h7" gutterBottom>
                      Room type
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Economy"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          {...register("roomType")}
                          name="roomType"
                          value="Economy"
                          control={<Radio />}
                          label="Economy"
                          onChange={roomTypeRadioHandler}
                        />
                        <FormControlLabel
                          {...register("roomType")}
                          name="roomType"
                          value="Standard"
                          control={<Radio />}
                          label="Standard"
                          onChange={roomTypeRadioHandler}
                        />
                        <FormControlLabel
                          {...register("roomType")}
                          name="roomType"
                          value="Premium"
                          control={<Radio />}
                          label="Premium"
                          onChange={roomTypeRadioHandler}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid xs={12} sm={6} item>
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Typography variant="h7" gutterBottom>
                      Room capacity
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <FormControl>
                      <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Single"
                        name="radio-buttons-group"
                      >
                        <FormControlLabel
                          {...register("roomCapacity")}
                          name="roomCapacity"
                          id="roomCapacity"
                          value="Single"
                          control={<Radio />}
                          label="Single"
                          onChange={roomCapacityRadioHandler}
                        />
                        <FormControlLabel
                          {...register("roomCapacity")}
                          name="roomCapacity"
                          value="Double"
                          control={<Radio />}
                          label="Double"
                          onChange={roomCapacityRadioHandler}
                        />
                        <FormControlLabel
                          {...register("roomCapacity")}
                          name="roomCapacity"
                          value="Tripple"
                          control={<Radio />}
                          label="Tripple"
                          onChange={roomCapacityRadioHandler}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
              <Grid xs={12} sm={6} item>
                <Box>
                  <Typography variant="h7" gutterBottom>
                    Date
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={12} sm={6} item>
                <Box
                  sx={{ mt: 5 }}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Typography>
                    Apartment no.: {availableRooms.toString()}
                  </Typography>
                </Box>
              </Grid>
              <Grid xs={12} sm={6} item>
                <Box
                  sx={{ mt: 2 }}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Button onClick={findApartment} variant="outlined">
                    Find
                  </Button>
                </Box>
              </Grid>

              <Grid xs={12} sm={6} item>
                <Box
                  sx={{ mt: 2 }}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <TextField
                    {...register("apartmentNumber")}
                    label="Apartment number"
                    variant="standard"
                    onChange={(e) => setInsertedApartment(e.target.value)}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="h7" gutterBottom>
                    {msg}
                  </Typography>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </Box>
        <Box
          sx={{ mx: 5 }}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}
