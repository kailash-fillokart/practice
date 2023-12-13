import * as React from "react";
import CommonLayout from "../../layouts/CommonLayout";
import MaterialTable from "material-table";
import Link from "next/link";
import Button from "@mui/material/Button";
import { buttonColor, putOrder } from "../../apiCalls";
import { toast } from "react-toastify";
import router from "next/router";
import { Box } from "@mui/material";

function Purchaseorder({ purchaseOrder, title, aproval, rolename }) {
  const [order, setOrder] = React.useState(purchaseOrder);

  const handleApproval = async (orderId) => {
    if (rolename === "super_admin" || rolename === "Admin") {
      const { data } = await putOrder(orderId, {
        data: {
          order_status: "confirmed",
        },
      }).catch(err => err.response);
      if (data.error === undefined) {
        router.push("/purchaseorder");
        toast.success("Order is confirmed", { autoClose: 1500 });
      }
    } else {
      toast.warn("You are Not Authorized to take action!", { autoClose: 1500 });
    }
  };

  const handleReject = async (orderId) => {
    if (rolename === "super_admin" || rolename === "Admin") {
      const { data } = await putOrder(orderId, {
        data: {
          order_status: "cancelled",
        },
      }).catch(err => err.response);
      if (data.error === undefined) {
        router.push("/purchaseorder");
        toast.success("Order is cancelled", { autoClose: 1500 });
      }
    } else {
      toast.warn("You are Not Authorized to take action!", { autoClose: 1500 });
    }
  };

  const columns = [
    {
      title: "id",
      field: "id",
      defaultSort: "desc",
      hidden: true,
    },
    {
      title: "Order Date",
      field: "orderDate",
    },
    {
      title: "Sales Order#",
      field: "order_num",
      cellStyle: { color: "#0d6efd", cursor: "pointer", fontSize: "13px" },
      render: (rowData) => (
        <Link href={`/purchaseorder/${rowData.id}`}>{rowData.order_num}</Link>
      ),
    },
    {
      title: "Purchase Order#",
      field: "po_number",
    },
    {
      title: "Order Status",
      field: "order_status",
      render: (rowData) => (
        <Button
          sx={{ width: "125px" }}
          style={{ fontSize: "10px" }}
          variant="outlined"
          color={buttonColor(rowData.order_status)}
          size="small"
        >
          {rowData.order_status}
        </Button>
      ),
    },
    {
      title: "Total Amount",
      field: "total_cost",
      align: "center",
      type: "currency",
      currencySetting: { currencyCode: "INR" },
    },
    {
      title: "Approval",
      field: "aproval",
      align: "center",
      hidden: aproval ? false : true,
      render: (rowData) => (
        <Box sx={{display:'flex', gap:'10px'}}>
          <Button
            variant="outlined"
            onClick={() => handleApproval(rowData.id)}
            sx={{fontSize:"10px"}}
          >
            {aproval[0]}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleReject(rowData.id)}
            sx={{fontSize:"10px"}}
          >
            {aproval[1]}
          </Button>
        </Box>
      ),
    },
  ];

  const rows = order.map((order) => {
    const {
      id,
      attributes: {
        createdDate: date,
        net_amount: price,
        order_number,
        po_number,
        order_status,
        order_invoices:{
          data: orderInvoiceArray
        },
        company: {
          data: {
            attributes: { name: order_name },
          },
        },
      },
    } = order;

    let total_shipping_charge = 0;

    if(orderInvoiceArray.length !== 0){
      total_shipping_charge = orderInvoiceArray.map(item => item.attributes.shipping_charge).reduce((prev, next) => prev + next);
    }

    let total_cost = price + total_shipping_charge + 0.18 * total_shipping_charge;

    const d = new Date(date);
    const orderDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    const order_num = `SO-${order_number}`;
    const total_amount = price;
    return {
      id,
      orderDate,
      total_amount,
      order_num,
      order_name,
      po_number,
      order_status,
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
              border: false,
              rowStyle: (rowData) => ({
                fontSize:"12px",
                background: (rowData.order_status === 'cancelled') ? "#ededed" : "",
                color: (rowData.order_status === 'cancelled') ? "gray" : ""
              }),
              headerStyle: {
                fontWeight: "600",
                fontSize:"13px",
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
            title={title}
            sx={{ width: "auto" }}
          />
        </Box>
      </CommonLayout>
    </>
  );
}

export default Purchaseorder;
