import { Box, Button, Modal } from "@mui/material";
import MaterialTable from "material-table";
import React from "react";
import { useState } from "react";
import ItemsManage from "./ItemsManage";

const ReceiveInventory = ({
  orderInvoiceData,
  compId,
  compInv,
  setCompInv,
  setOrderInvoices,
  userId,
  building
}) => {
  const [open, setOpen] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [rowItem, setRowItem] = useState({});

  const columns = [
    {
      title: "Inv Date",
      field: "date",
      cellStyle: { fontSize: "13px" },
    },
    {
      title: "Invoice#",
      field: "invoice_no",
      cellStyle: { fontSize: "13px" },
    },
    {
      title: "Amount",
      field: "net_amount",
      align: "left",
      type: "currency",
      currencySetting: { currencyCode: "INR" },
      cellStyle: { fontSize: "13px" },
    },
  ];

  const rows = orderInvoiceData.map((inv) => {
    const {
      id: inv_id,
      attributes: {
        invoice_no,
        invoice_date: date,
        net_amount,
        order_invoice_items: { data: itemsArray },
        inventory_inward
      },
    } = inv;

    return {
      invoice_no,
      date,
      net_amount,
      inv_id,
      itemsArray,
      inventory_inward,
    };
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleReceiveClick = (rowData) => {
    handleOpen(true);
    setInvoiceItems(rowData.itemsArray);
    setRowItem(rowData);
  };

  return (
    <Box
      sx={{
        borderRadius: "10px",
        boxShadow: "9px 2px 14px -8px rgba(87,87,87,1)",
      }}
    >
      <MaterialTable
        columns={columns}
        data={rows}
        title="STOCK RECEIVE"
        options={{
          searchFieldAlignment: "right",
          pageSizeOptions: [10],
          pageSize: 10,
          columnsButton: true,
          border: false,
          rowStyle: { fontSize: "12px" },
          headerStyle: {
            fontWeight: "600",
            fontSize: "13px",
            borderBottom: "2px solid rgb(10, 177, 60)",
          },
          onPageChange: "",
          sorting: true,
          searchFieldStyle: {
            height: "25px",
            width: "200px",
            fontSize: "14px",
            borderRadius: "20px",
            paddingBottom: "5px",
            marginTop: "4px",
          },
          searchFieldVariant: "outlined",
          maxBodyHeight: "66vh",
          actionsColumnIndex: -1,
        }}
        actions={[
          (rowData) => {
            return {
              icon: () => (
                <>
                  <Button
                    variant="outlined"
                    color="info"
                    size="small"
                    disabled={rowData.inventory_inward}
                    onClick={() => handleReceiveClick(rowData)}
                  >
                    Receive
                  </Button>
                </>
              ),
            };
          },
        ]}
        sx={{ width: "auto" }}
      />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            bgcolor: "white",
            width: "75%",
            boxShadow: 24,
            margin: "30px auto",
            borderRadius: "15px",
            height: "auto",
          }}
          className="modalscroll"
        >
          <ItemsManage
            invoiceItemsList={invoiceItems}
            setopen={setOpen}
            compId={compId}
            compInv={compInv}
            setCompInv={setCompInv}
            rowItem={rowItem}
            setOrderInvoices={setOrderInvoices}
            userId={userId}
            building={building}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ReceiveInventory;
