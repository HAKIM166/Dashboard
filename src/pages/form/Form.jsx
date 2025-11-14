import {
  Alert,
  Box,
  Button,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

export default function Form() {
  const data = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Manger",
      label: "Manger",
    },
    {
      value: "User",
      label: "User",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const regEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,10}$/;

  const regPhone = /^\+?\d{8,15}$/;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
    const onSubmit = () => {
    console.log("done");
    handleClick();
  };

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
      noValidate
      autoComplete="off"
    >
      <Stack direction="row" spacing={2}>
        <TextField
          error={errors.firstName ? true : false}
          helperText={
            errors.firstName ? "This field is required & min 3 character" : null
          }
          {...register("firstName", {
            required: true,
            maxLength: 20,
            minLength: 3,
          })}
          sx={{ flex: 1 }}
          label="First Name"
          variant="filled"
        />
        <TextField
          error={errors.LastName ? true : false}
          helperText={
            errors.LastName ? "This field is required & min 3 character" : null
          }
          {...register("LastName", {
            required: true,
            maxLength: 20,
            minLength: 3,
          })}
          sx={{ flex: 1 }}
          label="Last Name"
          variant="filled"
        />
      </Stack>

      <TextField
        error={errors.email ? true : false}
        helperText={
          errors.email ? "Please provide a valid email address" : null
        }
        {...register("email", { pattern: regEmail, required: true })}
        label="Email"
        variant="filled"
      />

      <TextField
        error={errors.ContactNumber ? true : false}
        helperText={
          errors.ContactNumber ? "Please provide a valid phone number" : null
        }
        {...register("ContactNumber", { pattern: regPhone, required: true })}
        label="Contact Number"
        variant="filled"
      />

      <TextField label="Address 1" variant="filled" />
      <TextField label="Address 2" variant="filled" />
      <TextField
        id="outlined-select-currency"
        select
        label="Role"
        defaultValue="User"
        variant="filled"
      >
        {data.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          type="submit"
          sx={{ textTransform: "capitalize" }}
          variant="contained"
        >
          Create New User
        </Button>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="info"
            sx={{ width: "100%" }}
          >
             Account created successfully
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
