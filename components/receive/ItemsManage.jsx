import { Box, Button } from "@mui/material";
import MaterialTable from "material-table";
import React from "react";
import { toast } from "react-toastify";
import {
  postCompanyInventory,
  getCompanyInventory,
  putCompanyInventory,
  putOrderInvoices,
  getOrderInvoices,
} from "../../apiCalls";

const ItemsManage = ({
  invoiceItemsList,
  setopen,
  compId,
  compInv,
  setCompInv,
  rowItem,
  setOrderInvoices,
  userId,
  building
}) => {
  const columns = [
    {
      title: "Items",
      field: "item_name",
      cellStyle: { fontSize: "13px" },
    },
    {
      title: "Quantity",
      field: "order_quantity",
      cellStyle: { fontSize: "13px", width: "10%" },
      align: "center",
    },
  ];
  const rows = invoiceItemsList.map((items) => {
    const {
      attributes: {
        order_quantity,
        order_item: {
          data: {
            attributes: {
              product_id: {
                data: {
                  attributes: { name: item_name },
                },
              },
            },
          },
        },
      },
    } = items;
    return {
      item_name,
      order_quantity,
    };
  });

  const compInvProductIds = compInv.map((e) => e.attributes.product.data.id);
  const compInvProductObj = compInv.map((e) => ({
    id: e.attributes.product.data.id,
    quantity: e.attributes.stock_inhand,
    item_id: e.id
  }));

  console.log(compInvProductObj)

  const handleInventorySubmit = () => {
    const fetchInventoryItems = invoiceItemsList.map((items) => {
      const {
        attributes: {
          order_quantity,
          order_item: {
            data: {
              attributes: {
                product_id: {
                  data: { id: item_id },
                },
              },
            },
          },
        },
      } = items;

      let checkId = compInvProductIds
        .map((e) => (e === item_id ? e : false))
        .filter((e) => e !== false);


      if (checkId.length === 0) {
        const postData = async () => {
          await postCompanyInventory({
            data: {
              product: item_id,
              company: compId,
              stock_inhand: order_quantity,
              user_id: userId
            },
          }).catch((err) => err.response);
        };
        postData();
      } else {
        let a = compInvProductObj
          .filter((e) => e.id === checkId[0])
          .map((item) => {
            const putData = async () => {
              await putCompanyInventory(item.item_id, {
                data: {
                  stock_inhand: item.quantity + order_quantity,
                },
              }).catch(err => err.response);
            };
            putData();
          });
      }
    });
    Promise.all(fetchInventoryItems).then(() => {
      const fetchCompInventory = async () => {
        const { data } = await putOrderInvoices(rowItem.inv_id, {
          data: {
            inventory_inward: true,
          },
        }).catch((err) => err.response);
        if (data.error === undefined) {
          const compInvent = await getCompanyInventory(compId, building, false).catch(
            (err) => err.response
          );
          const orderInvs = await getOrderInvoices(compId, building, false).catch(err => err.response);
          if(compInvent.data.data.error === undefined && orderInvs.data.data.error === undefined){
              setCompInv(compInvent.data.data);
              setOrderInvoices(orderInvs.data.data);
          }

        }
      };
      fetchCompInventory();
      toast.success("Successfully Received", { autoClose: 1000 });
      setopen(false);
    });
  };

  return (
    <Box>
      <MaterialTable
        columns={columns}
        data={rows}
        title="ORDER INVOICE ITEMS"
        options={{
          search: false,
          border: false,
          paging: false,
          rowStyle: { fontSize: "12px" },
          headerStyle: {
            fontWeight: "600",
            fontSize: "13px",
            borderBottom: "2px solid rgb(10, 177, 60)",
            paddingTop: "0px",
          },
        }}
        actions={[
          {
            icon: () => (
              <>
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={handleInventorySubmit}
                >
                  Save and Receive
                </Button>
              </>
            ),
            isFreeAction: true,
          },
          {
            icon: () => (
              <>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => setopen(false)}
                >
                  Cancel
                </Button>
              </>
            ),
            isFreeAction: true,
          },
        ]}
        sx={{ width: "auto" }}
      />
    </Box>
  );
};

export default ItemsManage;
