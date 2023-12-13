import { ArrowLeft } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { DatePicker } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import ReportTable from "./ReportTable";
import { getOrder } from "../../apiCalls";
import { CsvBuilder } from "filefy";

const CategorySales = ({ data, setData, companyId, building }) => {
  const router = useRouter();
  const { RangePicker } = DatePicker;
  const [dates, setDates] = useState([]);

  let itemsArr = [];

  data
    .filter((items) => {
      const cdate = moment(items.attributes.createdDate).format("MM-DD-YYYY");
      const start_date = dates[0];
      const end_date = dates[1];
      const d1 = new Date(cdate);
      const d2 = new Date(start_date);
      const d3 = new Date(end_date);
      if (start_date === undefined && end_date === undefined) return items;
      return d1 >= d2 && d1 <= d3;
    })
    .map((items) => {
      const {
        attributes: {
          order_items: { data: items_arr },
        },
      } = items;
      itemsArr.push(...items_arr);
    });

  const result = Object.values(
    itemsArr.reduce((acc, obj) => {
      const {
        attributes: {
          order_quantity,
          total_amount,
          product_id: {
            data: {
              attributes: {
                category: {
                  data: { id: cat_id },
                },
              },
            },
          },
        },
      } = obj;
      if (acc[cat_id]) {
        acc[cat_id].attributes.order_quantity += order_quantity;
        acc[cat_id].attributes.total_amount += total_amount;
      } else {
        acc[cat_id] = obj;
      }
      return acc;
    }, Object.create(null))
  );

  const TableTitle = () => {
    return (
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Box sx={{ fontWeight: "600", mt: 1, fontSize: "18px" }}>
          Purchase by Category
        </Box>
        <Box>
          <RangePicker
            onChange={(values) => {
              const fetchData = async () => {
                const order = await getOrder(companyId, building, undefined).catch(err => err.response);
                const orders = order.data.data;

                const filteredOrders = orders.filter((orders) => {
                  return orders.attributes.order_status === "delivered";
                });
                setDates(
                  values.map((item) => {
                    return moment(item.$d).format("MM-DD-YYYY");
                  })
                );
                setData(filteredOrders);
              };
              fetchData();
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ fontSize: "10px" }}>
              Start Date : {moment(dates[0]).format("DD-MM-YYYY")}
            </Box>
            <Box sx={{ fontSize: "10px" }}>
              End Date : {moment(dates[1]).format("DD-MM-YYYY")}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  const columns = [
    {
      title: "Category",
      field: "category_name",
    },
    {
      title: "Quantity Sold",
      align: "right",
      field: "order_quantity",
    },
    {
      title: "Total Amount",
      field: "total_amount",
      type: "currency",
      currencySetting: { currencyCode: "INR" },
    },
  ];
  // const rows = [];

  const rows = result.map((items) => {
    const {
      attributes: {
        order_quantity,
        total_amount,
        product_id: {
          data: {
            attributes: {
              category: {
                data: {
                  attributes: { name: category_name },
                },
              },
            },
          },
        },
      },
    } = items;

    return {
      order_quantity,
      total_amount,
      category_name,
    };
  });

  const handleCsv = (data, columns) => {
    const columnTitles = data.map((columnDef) => columnDef.title);
    const csvData = columns.map((rowData) =>
      data.map((columnDef) => rowData[columnDef.field])
    );
    const builder = new CsvBuilder(`Sales-By-Category.csv`)
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
      <ReportTable columns={columns} rows={rows} title={<TableTitle />} handleCsv={handleCsv} />
    </Box>
  );
};

export default CategorySales;
