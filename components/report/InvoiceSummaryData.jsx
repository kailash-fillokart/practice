import React from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import ReportTable from "./ReportTable";
import { ArrowLeft } from "@mui/icons-material";
import { CsvBuilder } from "filefy";
import moment from "moment";

const InvoiceSummaryData = ({ transaction }) => {
  const router = useRouter();
  const handleColor = (status) => {
    switch(status.slice(0,7)){
      case 'Paid' : return 'green';
      case 'Overdue' : return 'red';
      default : return '#0274b5';
    }
  }
  const columns = [
    {
      title: "Order No",
      field: "order_number",
    },
    {
      title: "Purchase Order",
      field: "po_number",
    },
    {
      title: "Invoice No",
      field: "invoice_no",
    },
    {
      title: "Invoice Date",
      field: "inv_date",
    },
    {
      title: "Status",
      field: 'status',
      cellStyle: (status) => ({color:handleColor(status)})
    },
    {
      title: "Total Amount",
      field: "total_amount",
      type: "currency",
      currencySetting: { currencyCode: "INR" },
      align: "center",
    },
    {
      title: "Due Date",
      field: "due_Date",
      align: "right",
    }
  ];

  //   const rows = [];

  const rows = transaction.map((orders) => {
    const {
      attributes: {
        due_date,
        invoice_no,
        invoice_date,
        total_amount,
        net_amount,
        order: {
          data: {
            attributes: { order_number, po_number },
          },
        },
        transaction_amounts
      },
    } = orders;

    let amt;

    if (transaction_amounts.data.length !== 0) {
      amt = transaction_amounts.data
        .map((e) => e.attributes.inv_amount)
        .reduce((prev, next) => prev + next);
    } else {
      amt = 0;
    }

    let balance = net_amount - amt;
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

    const due_Date = moment(due_date).format('DD/MM/YYYY');
    const inv_date = moment(invoice_date).format('DD/MM/YYYY');

    return {
      due_Date,
      invoice_no,
      inv_date,
      total_amount,
      order_number,
      po_number,
      status
    };
  });

  const TableTitle = () => {
    return (
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box sx={{ fontWeight: "600", mt: 1, fontSize: "18px" }}>
          Invocie Summary
        </Box>
      </Box>
    );
  };

  const handleCsv = (data, columns) => {
    const columnTitles = data.map((columnDef) => columnDef.title);
    const csvData = columns.map((rowData) =>
      data.map((columnDef) => rowData[columnDef.field])
    );
    const builder = new CsvBuilder(`Invoice-Summary.csv`)
      .setColumns(columnTitles)
      .addRows(csvData)
      .exportFile();
    return builder;
  };

  return (
    <Box>
      <Button
        size="small"
        onClick={() => router.push("/report")}
        sx={{ mt: "5px", color: "rgb(10, 177, 60)" }}
      >
        <ArrowLeft /> Back
      </Button>
      <ReportTable
        columns={columns}
        rows={rows}
        title={<TableTitle />}
        handleCsv={handleCsv}
      />
    </Box>
  );
};

export default InvoiceSummaryData;
