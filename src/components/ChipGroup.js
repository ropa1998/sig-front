import React from "react";
import { Chip } from "@mui/material";

const ChipGroup = (props) => {
  const { array, color } = props;

  return (
    <>
      {array?.map((a, index) => (
        <Chip
          key={index}
          variant="outlined"
          label={a}
          color={color}
          style={{ marginRight: "10px" }}
        />
      ))}
    </>
  );
};

export default ChipGroup;
