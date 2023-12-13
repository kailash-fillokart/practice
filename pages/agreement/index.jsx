import { Box, Container } from "@mui/material";
import React from "react";
import CommonLayout from "../../layouts/CommonLayout";
import image from "../../images/coming_sooon.png"

const Agreement = () => {
  return (
    <CommonLayout>
      <Container>
        <Box
          component="img"
          sx={{
            width:'100%',
            objectFit:'cover'
          }}
          alt="The house from the offer."
          src={image}
        />
      </Container>
    </CommonLayout>
  );
};

export default Agreement;
