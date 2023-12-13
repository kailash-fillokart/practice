import React from 'react'
import CommonLayout from "../../layouts/CommonLayout";
import { Box } from "@mui/material";
import PayableSummary from '../../components/report/PayableSummary';
import { getTransactions } from '../../apiCalls';

const payablesummary = ({transactions}) => {
  return (
    <CommonLayout>
    <Box sx={{margin:"0 30px"}}>
        <PayableSummary transactions={transactions} />
    </Box>
  </CommonLayout>
  )
}

export async function getServerSideProps({ req }) {
    const cookies = req.cookies || null;
    let company_id = cookies.company_id;
    let building = cookies.building;
  
    let role = cookies.user_role;
    let flag;
  
    if (role === "super_admin") {
      flag = true;
    }

    const transaction = await getTransactions(company_id, building).catch(err => err.response);
    const transactions = transaction.data.data;


    return {
      props: {
        transactions
      },
    };
  }

export default payablesummary