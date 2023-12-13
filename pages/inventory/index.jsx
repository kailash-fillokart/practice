import React from "react";
import CommonLayout from "../../layouts/CommonLayout";
import Container from "@mui/material/Container";
import MaterialTable from "material-table";
import {
  getCompanyById,
  getCompanyInventory,
  getInventoryHistory,
  postInventoryHistory,
  postInventoryHistoryItems,
  putCompanyInventory,
} from "../../apiCalls";
import { toast } from "react-toastify";
import { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Box, Button, Modal } from "@mui/material";
// import { useRouter } from "next/router";
import HistoryItemTable from "../../components/history/HistoryItemTable";

const Inventory = ({
  inventoriesData,
  company_id,
  role,
  building,
  companyData,
  user_id,
  inventoryHistories,
}) => {
  const batch_number = `${
    companyData.attributes.name.slice(0, 3) + building.slice(0, 3)
  }`;
  const [inventories, setInventories] = useState(inventoriesData);
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [stock, setStock] = useState([]);
  const [values, setValues] = useState({
    data: {
      batch_number: `${
        batch_number.toUpperCase() + "00" + (inventoryHistories.length + 1)
      }`,
      user_id,
      company_id,
    },
  });
  let history_id = "";
  // const router = useRouter();
  const columns =
    role === "super_admin"
      ? [
          {
            title: "Building",
            field: "building",
          },
          {
            title: "Product Name",
            field: "item_name",
          },
          {
            title: "SKU",
            field: "sku",
          },
          {
            title: "Unit",
            field: "unit_name"
          },
          {
            title: "Category",
            field: "category_name",
          },
          {
            title: "Stock In Hand",
            field: "stock_inhand",
            align: "center",
          },
        ]
      : [
          {
            title: "Product Name",
            field: "item_name",
            width: "40%",
          },
          {
            title: "SKU",
            field: "sku",
          },
          {
            title: "Unit",
            field: "unit_name"
          },
          {
            title: "Category",
            field: "category_name",
          },
          {
            title: "Stock In Hand",
            field: "stock_inhand",
            align: "center",
          }
        ];

  const rows = inventories.map((items) => {
    const {
      id: inven_id,
      attributes: {
        stock_inhand,
        product: {
          data: {
            id: product_id,
            attributes: {
              name: item_name,
              sku,
              category: {
                data: {
                  attributes: { name: category_name },
                },
              },
              unit: {
                data: {
                  attributes: { name: unit_name },
                },
              },
            },
          },
        },
        user_id: {
          data: {
            attributes: { building },
          },
        },
      },
    } = items;
    return {
      item_name,
      sku,
      stock_inhand,
      category_name,
      inven_id,
      building,
      item_name,
      product_id,
      unit_name
    };
  });

  const d = new Date();
  const todayDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleModalOpen = (rowData) => {
    handleOpen(true);
    const stockValues = rowData.map((e) => {
      const { stock_inhand, product_id, inven_id } = e;
      const stock_out = 0;
      const inventory_history = "";
      return {
        stock_inhand,
        stock_out,
        inventory_history,
        product_id,
        inven_id,
      };
    });
    setTableData(rowData);
    setStock(stockValues);
  };

  const createHistoryInentory = async () => {
    const history = await postInventoryHistory(values).catch(err => err.response);
    const Idofhistory = history.data.data.id;
    return Idofhistory;
  };

  const createHistoryItems = async (items) => {
    await postInventoryHistoryItems({ data: items }).catch(err => err.response);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    history_id = createHistoryInentory();
    history_id
      .then(function (historyId) {
        stock.map((history_items) => {
          history_items.inventory_history = historyId;
          if (history_items.inventory_history) {
            createHistoryItems(history_items);
          }
        });
      })
      .then(() => {
        stock.map((history_items) => {
          const updateInventory = async () => {
            const { data } = await putCompanyInventory(history_items.inven_id, {
              data: {
                stock_inhand:
                  history_items.stock_inhand - history_items.stock_out,
              },
            }).catch((err) => err.response);
            if (data.error === undefined) {
              const compInv = await getCompanyInventory(
                company_id,
                building,
                undefined
              ).catch(err => err.response);
              const invHis = await getInventoryHistory(company_id, building).catch(err => err.response);
              const invHisLen = invHis.data.data.length + 1;
              if (
                compInv.data.data.error === undefined &&
                invHis.data.data.error === undefined
              ) {
                setInventories(compInv.data.data);
                setValues({
                  data: {
                    batch_number: `${
                      batch_number.toUpperCase() + "00" + invHisLen
                    }`,
                    user_id,
                    company_id,
                  },
                });
              }
            }
          };
          updateInventory();
        });
      })
      .then(() => {
        handleClose();
        toast.success("Successfully Updated", {
          autoClose: 1000,
        });
      });
  };

  return (
    <CommonLayout>
      <Box className="inventory-table-color-head purchase-order-table" sx={{margin:'0 30px'}}>
        {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
        <MaterialTable
          columns={columns}
          data={rows}
          options={{
            searchFieldAlignment: "right",
            pageSizeOptions: [150, 200],
            pageSize: 150,
            columnsButton: true,
            selection: true,
            border: false,
            rowStyle: {
              fontSize: "12px",
            },
            headerStyle: {
              fontSize: "12px",
              fontWeight: "600",
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
            exportButton: {
              csv: true,
              pdf: true,
            },
            exportPdf: (data, columns) => {
              const doc = new jsPDF("l", "pt");

              const columnTitles = data.map((columnDef) => columnDef.title);

              const pdfData = columns.map((rowData) =>
                data.map((columnDef) => rowData[columnDef.field])
              );
              var xOffset = doc.internal.pageSize.width / 2;
              doc.setFontSize(11);
              doc.text("Inventory Summary", xOffset, 15, { align: "center" });
              doc.text(companyData.attributes.name, xOffset, 30, {
                align: "center",
              });
              doc.text(todayDate, xOffset, 45, { align: "center" });
              doc.autoTable({
                head: [columnTitles],
                body: pdfData,
                startY: 55,
                theme: "grid",
              });

              doc.save(`Inventory-Summary.pdf`);
            },
            searchFieldVariant: "outlined",
            maxBodyHeight: "77vh",
          }}
          actions={[
            (rowData) => {
              return {
                tooltip: "Mange Stock Out",
                icon: () => (
                  <>
                    <Button variant="outlined" color="success" size="small">
                      Generate Gatepass
                    </Button>
                  </>
                ),
                onClick: () => handleModalOpen(rowData),
              };
            },
          ]}
          title="Inventory Summary"
          sx={{ width: "auto" }}
        />
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              bgcolor: "white",
              width: "65%",
              boxShadow: 24,
              margin: "30px auto",
              borderRadius: "15px",
              height: "auto",
            }}
            className="modalscroll"
          >
            <form onSubmit={handleFormSubmit}>
              <Box
                sx={{
                  fontSize: "18px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ fontWeight: "600", mt: 1, fontSize: "15px" }}>
                  GENERATE GATEPASS FOR {tableData.length} ITEMS
                </Box>
                <input
                  type="text"
                  name="batch_number"
                  className="form-control"
                  style={{ width: "300px", margin: "10px" }}
                  disabled
                  value={values.data.batch_number}
                />
              </Box>
              <HistoryItemTable
                tableData={tableData}
                stock={stock}
                setStock={setStock}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  sx={{ margin: "15px 5px" }}
                  onClick={handleClose}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ margin: "15px 5px" }}
                  type="submit"
                >
                  Generate
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </Box>
    </CommonLayout>
  );
};

export async function getServerSideProps({ req }) {
  const cookies = req.cookies || null;
  let company_id = cookies.company_id;
  let user_id = cookies.user_id;
  let building = cookies.building;
  let role = cookies.user_role;
  let flag;

  if (role === "super_admin") {
    flag = true;
  }

  const inventory = await getCompanyInventory(company_id, building, flag).catch(err => err.response);
  const inventoriesData = inventory.data.data;

  const company = await getCompanyById(company_id).catch(err => err.response);
  const companyData = company.data.data;

  const inventoryHistory = await getInventoryHistory(company_id, building).catch(err => err.response);
  const inventoryHistories = inventoryHistory.data.data;

  return {
    props: {
      inventoriesData,
      company_id,
      role,
      building,
      companyData,
      user_id,
      inventoryHistories,
    },
  };
}

export default Inventory;
