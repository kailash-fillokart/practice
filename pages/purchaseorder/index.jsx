import { CollectionsOutlined } from "@mui/icons-material";
import React from "react";
import { getOrder } from "../../apiCalls";
import Purchaseorder from "../../components/purchaseorder/index";

function PurchaseOrder({orders}) {
  return (
    <div>
      <Purchaseorder purchaseOrder={orders} title="PURCHASE ORDERS"  />
    </div>
  );
}

export async function getServerSideProps({req, query}) {

  const cookies = req.cookies || null;
  let company_id = cookies.company_id;
  let building = cookies.building;
  let role = cookies.user_role;
  let flag;
  
  if(role === 'super_admin'){
    flag = true;
  } 

  const order = await getOrder(company_id, building, flag).catch(err => err.response);
  const orders = (query.status) ? order.data.data.filter((ord)=>{
    return query.status === ord.attributes.order_status
  }) : order.data.data;

  return { 
      props: { 
          orders
        } 
    };
}

export default PurchaseOrder;
