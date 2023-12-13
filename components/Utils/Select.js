import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

export default function Select(props) {
  const {
    name,
    label,
    value,
    error = null,
    onChange,
    valueField,
    displayField,
    options,
  } = props;

  return (
    <FormControl variant="outlined" {...(error && { error: true })}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value="">All</MenuItem>
        {options.map((item) => {
          return (
            <MenuItem key={item[valueField]} value={item[valueField]}>
              {item[displayField]}
            </MenuItem>
          );
        })}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
