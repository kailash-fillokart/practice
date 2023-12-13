import { Box } from "@mui/material";
import React, { useState } from "react";
import CommonLayout from "../../layouts/CommonLayout";
import CategorySales from "../../components/report/CategorySales";
import { getOrder } from "../../apiCalls";

const purchasebycategory = ({ deliveredArr, company_id, building }) => {
  const [invoices, setInvoices] = useState(deliveredArr);
  return (
    <CommonLayout>
      <Box sx={{margin:'0 30px'}}>
        <CategorySales
          data={invoices}
          setData={setInvoices}
          companyId={company_id}
          building={building}
        />
      </Box>
    </CommonLayout>
  );
};

export async function getServerSideProps({ req }) {
  const cookies = req.cookies || null;
  let user_id = cookies.user_id;
  let company_id = cookies.company_id;
  let building = cookies.building;

  let role = cookies.user_role;
  let flag;

  if (role === "super_admin") {
    flag = true;
  }

  const order = await getOrder(company_id, building, flag).catch(err => err.response);
  const orders = order.data.data;

  const deliveredArr = orders.filter((orders) => {
    return orders.attributes.order_status === "delivered";
  });

  return {
    props: {
      deliveredArr,
      company_id,
      building,
    },
  };
}

export default purchasebycategory;
