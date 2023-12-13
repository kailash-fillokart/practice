import { Box } from "@mui/material";
import React from "react";
import { getInventoryHistoryItems } from "../../apiCalls";
import InventoryHistory from "../../components/report/InventoryHistory";
import CommonLayout from "../../layouts/CommonLayout";

const inventoryhistory = ({ inventoryHistories }) => {
  return (
    <CommonLayout>
      <Box sx={{margin:'0 30px'}}>
        <InventoryHistory inventoryHisData={inventoryHistories} />
      </Box>
    </CommonLayout>
  );
};

export async function getServerSideProps({ req }) {
  const cookies = req.cookies || null;
  let company_id = cookies.company_id;
  let building = cookies.building;

  let role = cookies.user_role;
  let flag;

  if (role === "super_admin") {
    flag = true;
  }

  const inventoryHistory = await getInventoryHistoryItems(company_id, building).catch(err => err.response);
  const inventoryHistories = inventoryHistory.data.data;

  return {
    props: {
      inventoryHistories,
    },
  };
}

export default inventoryhistory;
