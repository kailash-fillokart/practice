import { Box } from "@mui/material";
import MaterialTable from "material-table";
import React from "react";

const ReportTable = ({columns, rows, title, handleCsv}) => {
  return (
    <Box>
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
            fontSize: "12px",
            background: rowData.order_status === "cancelled" ? "#ededed" : "",
            color: rowData.order_status === "cancelled" ? "gray" : "",
          }),
          headerStyle: {
            fontWeight: "600",
            fontSize: "13px",
            borderBottom: "2px solid rgb(10, 177, 60)",
          },
          exportButton:{
            csv:true
          },
          exportCsv: (data, column) => handleCsv(data, column),
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
          maxBodyHeight: "72vh",
        }}
        title={title}
        sx={{ width: "auto" }}
      />
    </Box>
  );
};

export default ReportTable;
