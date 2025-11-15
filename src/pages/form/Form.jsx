/**
 * Profile Form Page
 * -----------------
 * User profile form built with react-hook-form and MUI,
 * including validation for core fields and a success snackbar on submit.
 * On submit → save data into localStorage("profile_user")
 * so Profile.jsx can read it.
 */

import React from "react";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import Header from "../../components/Header";
import { useForm } from "react-hook-form";

export default function Form() {
  const roles = [
    { value: "Admin", label: "Admin" },
    { value: "Manager", label: "Manager" },
    { value: "User", label: "User" },
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
    if (reason === "clickaway") return;
    setOpen(false);
  };

  
  const onSubmit = (values) => {
    
    let existing = {};
    try {
      const saved = localStorage.getItem("profile_user");
      if (saved) existing = JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to parse profile_user from localStorage:", e);
    }

    const fullName = `${values.firstName || ""} ${values.lastName || ""}`.trim();

    const updatedUser = {
      ...existing,
      name: fullName || existing.name || "User",
      email: values.email,
      phone: values.contactNumber,
      role: values.role || existing.role || "User",

      address1: values.address1 || "",
      address2: values.address2 || "",
    };

    localStorage.setItem("profile_user", JSON.stringify(updatedUser));

    console.log("Profile saved:", updatedUser);
    handleClick(); // show snackbar
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
      noValidate
      autoComplete="off"
    >
      <Header
        title="PROFILE FORM"
        subTitle="View and update your personal profile"
      />

      {/* First / Last Name */}
      <Stack direction="row" spacing={2}>
        <TextField
          error={!!errors.firstName}
          helperText={
            errors.firstName
              ? "This field is required & min 3 characters"
              : null
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
          error={!!errors.lastName}
          helperText={
            errors.lastName
              ? "This field is required & min 3 characters"
              : null
          }
          {...register("lastName", {
            required: true,
            maxLength: 20,
            minLength: 3,
          })}
          sx={{ flex: 1 }}
          label="Last Name"
          variant="filled"
        />
      </Stack>

      {/* Email */}
      <TextField
        error={!!errors.email}
        helperText={
          errors.email ? "Please provide a valid email address" : null
        }
        {...register("email", { pattern: regEmail, required: true })}
        label="Email"
        variant="filled"
      />

      {/* Phone */}
      <TextField
        error={!!errors.contactNumber}
        helperText={
          errors.contactNumber ? "Please provide a valid phone number" : null
        }
        {...register("contactNumber", { pattern: regPhone, required: true })}
        label="Contact Number"
        variant="filled"
      />

      {/* Address 1 */}
      <TextField
        label="Address 1"
        variant="filled"
        {...register("address1")}
      />

      {/* Address 2 */}
      <TextField
        label="Address 2"
        variant="filled"
        {...register("address2")}
      />

      {/* Role */}
      <TextField
        select
        label="Role"
        defaultValue="User"
        variant="filled"
        {...register("role", { required: true })}
      >
        {roles.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          sx={{ textTransform: "capitalize" }}
          variant="contained"
        >
          Create New User
        </Button>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Account saved successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}
