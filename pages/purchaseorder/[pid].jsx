import React from 'react';
import CommonLayout from '../../layouts/CommonLayout';
import {
  getCompanyInventory,
  getOrderById,
  getOrderInvoices,
} from '../../apiCalls';
import ErrorPage from '../../components/errorpage/error';
import PurchaseDetail from '../../components/purchaseorder/details';

function orderDisplay({
  orders,
  taxObj,
  amtObj,
  itemsArray,
  pincode,
  comp_id,
  comp_order_id,
  orderInv,
  inventories,
  user_id,
  building,
}) {
  if (parseInt(comp_id) !== comp_order_id)
    return (
      <CommonLayout>
        <ErrorPage />
      </CommonLayout>
    );

  return (
    <CommonLayout>
      <PurchaseDetail
        orders={orders}
        taxObj={taxObj}
        amtObj={amtObj}
        itemsArray={itemsArray}
        pincode={pincode}
        comp_id={comp_id}
        comp_order_id={comp_order_id}
        orderInv={orderInv}
        inventories={inventories}
        user_id={user_id}
        building={building}
      />
    </CommonLayout>
  );
}

export async function getServerSideProps({ req, params }) {
  const cookies = req.cookies || null;
  let user_id = cookies.user_id;
  let comp_id = cookies.company_id;
  let building = cookies.building;
  let taxObj = [];
  let amtObj = [];
  let role = cookies.user_role;
  let flag;

  if (role === 'super_admin') {
    flag = true;
  }

  const order = await getOrderById(user_id, params.pid).catch(
    (err) => err.response
  );
  const orders = order.data.data;

  const ordInv = await getOrderInvoices(comp_id, building, flag).catch(
    (err) => err.response
  );
  const orderInv = ordInv.data.data;

  const inventory = await getCompanyInventory(comp_id, building, flag).catch(
    (err) => err.response
  );
  const inventories = inventory.data.data;

  const {
    attributes: {
      order_items: { data: itemsArray },
      company: {
        data: { id: comp_order_id },
      },
      order_address: {
        data: {
          attributes: {
            addresses: { data: addressArray },
          },
        },
      },
    },
  } = orders;

  const order_billingAddress = addressArray.find(
    (address) => address.attributes.address_type === 'billing_address'
  );

  const pincode = order_billingAddress.attributes.pincode;

  itemsArray.map((item) => {
    const tax = item.attributes.product_id.data.attributes.gst.slice(-2);
    const value = item.attributes.tax_amount;
    const amount = item.attributes.total_amount;
    taxObj.push({
      [tax]: value,
    });
    amtObj.push({
      [tax]: amount,
    });
  });

  return {
    props: {
      orders,
      taxObj,
      amtObj,
      itemsArray,
      comp_id,
      comp_order_id,
      orderInv,
      inventories,
      user_id,
      building,
      pincode,
    },
  };
}

export default orderDisplay;
