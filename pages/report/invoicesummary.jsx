import { Box } from "@mui/material";
import React from "react";
import { getOrderInvoices } from "../../apiCalls";
import TransactionsHistory from "../../components/report/InvoiceSummaryData";
import CommonLayout from "../../layouts/CommonLayout";

const invoicesummary = ({transactions}) => {
  return (
    <CommonLayout>
      <Box sx={{margin:'0 30px'}}>
        <TransactionsHistory 
          transaction={transactions}
        />
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

  const transaction = await getOrderInvoices(company_id, building, flag).catch(err => err.response);
  const transactions = transaction.data.data;

  return {
    props: {
      transactions,
    },
  };
}

export default invoicesummary;
