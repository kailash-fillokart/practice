import React from "react";
import { CsvBuilder } from "filefy";
import ReportTable from "./ReportTable";
import { ArrowLeft } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import moment from "moment";

const PayableSummary = ({ transactions }) => {
  const router = useRouter();
  const columns = [
    {
      title: "Date",
      field: "pay_date",
    },
    {
      title: "Payment#",
      field: "payment_no",
    },
    {
      title: "Reference#",
      field: "reference_no",
      align: "center",
    },
    {
      title: "Customer",
      field: "company",
    },
    {
      title: "Invoice#",
      field: "invoice_no"
    },
    {
      title: "Mode",
      field: "payment_mode",
    },
    {
      title: "Amount",
      field: "amount_received",

      type: "currency",
      currencySetting: { currencyCode: "INR" },
      align: "left",
    },
  ];

  // const rows = [];

  const rows = transactions.map((payment) => {
    const {
      attributes: {
        payment_date,
        payment_no,
        reference_no,
        payment_mode,
        amount_received,
        order_invoices: { data: invArr },
        company,
      },
    } = payment;

    const pay_date = moment(payment_date).format("DD/MM/YYYY");

    let invoice = invArr.map((inv) => {
      const {
        attributes: { invoice_no },
      } = inv;
      return invoice_no;
    });

    let invoice_no = invoice.join("\n");

    // let invoice_rep = invArr.map((inv) => {
    //   return (
    //     <>
    //       {inv.attributes.invoice_no}
    //       <br />
    //     </>
    //   );
    // });

    return {
      pay_date,
      payment_no,
      reference_no,
      payment_mode,
      amount_received,
      invoice_no,
      company
    };
  });

  const TableTitle = () => {
    return (
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box sx={{ fontWeight: "600", mt: 1, fontSize: "18px" }}>
          Payable Summary
        </Box>
      </Box>
    );
  };

  const handleCsv = (data, columns) => {
    const columnTitles = data.map((columnDef) => columnDef.title);
    const csvData = columns.map((rowData) =>
      data.map((columnDef) => rowData[columnDef.field])
    );
    const builder = new CsvBuilder(`Payable-Summary.csv`)
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

export default PayableSummary;
