import React, {useState} from "react";
import { getOrderInvoices } from "../../apiCalls";
import { Box } from "@mui/material";
import MaterialTable from "material-table";
import Link from "next/link";
import CommonLayout from "../../layouts/CommonLayout";

function SalesOrder({ invoices }) {
  const [invs, setinvs] = useState(invoices);

  const handleColor = (status) => {
    switch(status.slice(0,7)){
      case 'Paid' : return 'green';
      case 'Overdue' : return 'red';
      default : return 'blue';
    }
  }

  const columns = [
    {
      title: "Invoice No",
      field: "invoice_no",
      cellStyle: { color: "#0d6efd", cursor: "pointer"},
      render: (rowData) => (
        <Link href={`/invoices/${rowData.invoiceId}`}>
          {rowData.invoice_no}
        </Link>
      ),
    },
    {
      title: "Invoice Date",
      field: "invoice_date",
    },
    {
      title: "Order No",
      field: "order_number",
    },
    {
      title: "Company",
      field: "comp_name",
    },
    {
      title: "Total",
      field: "total_cost",
      type: "currency",
      currencySetting: { currencyCode: "INR" },
      align: "center",
    },
    {
      title: "Status",
      field: "status",
      cellStyle: (status) => ({color:handleColor(status)})
    },
    {
      title: "Balance",
      field: "balance",
      type: "currency",
      align: "left",
      currencySetting: { currencyCode: "INR" },
    },
  ];

  const rows = invs.map((invoice, index) => {
    const {
      id: invoiceId,
      attributes: {
        invoice_no,
        invoice_date,
        net_amount,
        due_date,
        shipping_charge,
        order: {
          data: {
            attributes: {
              order_number,
              company: {
                data: {
                  attributes: { name: comp_name },
                },
              },
            },
          },
        },
        transaction_amounts
      },
    } = invoice;
    let amt;

    let total_cost = net_amount + shipping_charge + 0.18 * shipping_charge;

    if (transaction_amounts.data.length !== 0) {
      amt = transaction_amounts.data
        .map((e) => e.attributes.inv_amount)
        .reduce((prev, next) => prev + next);
    } else {
      amt = 0;
    }

    let balance = total_cost - amt;
    const sno = index + 1;
    const dateToday = new Date();
    const calcDate = `${dateToday.getFullYear()}-${(
      "0" +
      (dateToday.getMonth() + 1)
    ).slice(-2)}-${("0" + dateToday.getDate()).slice(-2)}`;
    const today = new Date(calcDate);
    const due = new Date(due_date);
    const diff = parseInt((due - today) / (1000 * 60 * 60 * 24), 10);
    let status = `${diff} days left`;
    if(balance === 0){
      status = "Paid"
    } else if (diff < 0) {
      status = `Overdue by ${parseInt(
        (today - due) / (1000 * 60 * 60 * 24),
        10
      )} days`;
    } else if (diff === 0) {
      status = `Due Today`;
    }
    return {
      sno,
      invoice_no,
      invoice_date,
      order_number,
      net_amount,
      status,
      comp_name,
      invoiceId,
      balance,
      total_cost
    };
  });

  return (
    <>
      <CommonLayout>
        <Box className="purchase-order-table" sx={{margin:'0 30px'}}>
          <MaterialTable
            columns={columns}
            data={rows}
            options={{
              searchFieldAlignment: "right",
              pageSizeOptions: [50, 100, 150, 200],
              pageSize: 50,
              columnsButton: true,
              border:false,
              rowStyle: { 
                fontSize:"12px" 
              },
              headerStyle: {
                fontSize: "12px",
                fontWeight: "600",
                borderBottom:"2px solid rgb(10, 177, 60)"
              },
              onPageChange: "",
              sorting: true,
              searchFieldStyle:{
                height:'25px',
                width:'200px',
                fontSize:'14px',
                borderRadius:'20px',
                paddingBottom:'5px',
                marginTop:'4px',
              },
              searchFieldVariant:'outlined',
              maxBodyHeight:"77vh"
            }}
            title="Invoices"
            sx={{ width: "auto" }}
          />
        </Box>
      </CommonLayout>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const cookies = req.cookies || null;
  let company_id = cookies.company_id;
  let building = cookies.building;
  let role = cookies.user_role;
  let flag;
  
  if(role === 'super_admin'){
    flag = true;
  }

  const invoice = await getOrderInvoices(company_id, building, flag).catch(err => err.response);
  const invoices = invoice.data.data;
  return {
    props: {
      invoices,
    },
  };
}

export default SalesOrder;
