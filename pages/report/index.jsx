import React from "react";
import CommonLayout from "../../layouts/CommonLayout";
import { Box } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import Link from "next/link";

const Report = () => {
  return (
    <>
      <CommonLayout>
        <Box sx={{margin:'0 50px'}}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "30%"
              }}
            >
              <Box sx={{ background: "#ededed", p: 1, borderRadius: "5px" }}>
                <h4>Purchases</h4>
              </Box>
              <Box sx={{ color: "#0d6efd" }}>
                <ArrowRight />{" "}
                <Link href="/report/purchasebyitem">Purchase by Item</Link>
              </Box>
              <Box sx={{ color: "#0d6efd" }}>
                <ArrowRight />{" "}
                <Link href="/report/purchasebycategory">Purchase by Category</Link>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "30%",
              }}
            >
              <Box sx={{ background: "#ededed", p: 1, borderRadius: "5px" }}>
                <h4>Inventory</h4>
              </Box>
              <Box sx={{ color: "#0d6efd" }}>
                <ArrowRight />{" "}
                <Link href="/report/inventoryhistory">Inventory History</Link>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "30%",
              }}
            >
              <Box sx={{ background: "#ededed", p: 1, borderRadius: "5px" }}>
                <h4>Invoices</h4>
              </Box>
              <Box sx={{ color: "#0d6efd" }}>
                <ArrowRight />{" "}
                <Link href="/report/invoicesummary">Invoice Summary</Link>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "30%",
              }}
            >
              <Box sx={{ background: "#ededed", p: 1, borderRadius: "5px" }}>
                <h4>Payables</h4>
              </Box>
              <Box sx={{ color: "#0d6efd" }}>
                <ArrowRight />{" "}
                <Link href="/report/payablesummary">Payable Summary</Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </CommonLayout>
    </>
  );
};

export default Report;
