import React from "react";
import { TextField } from "@material-ui/core";

export default function Input(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    styles = {},
    size,
  } = props;
  return (
    <>
      <TextField
        variant="outlined"
        label={label}
        name={name}
        size={size}
        styles={styles}
        value={value}
        onChange={onChange}
        {...(error && { error: true, helperText: error })}
      />
    </>
  );
}
