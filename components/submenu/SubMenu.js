import { CreditScore, Done, ShoppingBag } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useState } from "react";

const SubMenu = ({activeVal}) => {
  const [activeItem, setActiveItem] = useState(activeVal);
  return (
    <Box>
      <Box
        sx={{
          background: "#88c8bc",
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Poppins",
          fontWeight: "800",
          fontSize: "17px",
          color: "white",
        }}
      >
        STAY TUNED FOR NEW OFFERS!!
      </Box>
      <Box sx={{ mt: 3 }} className="process-wrap ">
        <div className={`process text-center ${activeItem === 1 ? 'active': ''}`}>
          <p>
            <span>
              <ShoppingBag />
            </span>
          </p>
          <h3>Checkout</h3>
        </div>
        <div className={`process text-center ${activeItem === 2 ? 'active': ''}`}>
          <p>
            <span>
              <CreditScore />
            </span>
          </p>
          <h3>Payment</h3>
        </div>
        <div className={`process text-center ${activeItem === 3 ? 'active': ''}`}>
          <p>
            <span>
              <Done />
            </span>
          </p>
          <h3>Order Complete</h3>
        </div>
      </Box>
      {/* <Box className="process-wrap">
        <Box className="process">
          <ShoppingBag sx={{ transform: "scale(1.3)", color: "#88c8bc" }} />
        </Box>
        <Box className="process">
          <CreditScore sx={{ transform: "scale(1.3)", color: "#88c8bc" }} />
        </Box>
        <Box className="process">
          <Done sx={{ transform: "scale(1.3)", color: "#88c8bc" }} />
        </Box>
      </Box> */}
    </Box>
  );
};

export default SubMenu;
