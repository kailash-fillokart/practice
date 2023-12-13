import React from "react";
import { getOrder } from "../../apiCalls";
import Purchaseorder from "../../components/purchaseorder/index";

function PendingAproval({orders}) {
  const ord = orders.filter((order)=>{
    return order.attributes.order_status === 'pending'
  })
  const [approval,setApproval] = React.useState(['Approve','Reject'])
  const userdata = localStorage.getItem('userdata')
  const rolename = JSON.parse(userdata).assign_role;
  return (
    <div>
      <Purchaseorder purchaseOrder={ord}  title="Pending Aproval" aproval={approval} rolename={rolename}  />
    </div>
  );
};

export async function getServerSideProps({req}) {
  const cookies = req.cookies || null;
  let company_id = cookies.company_id;
  let building = cookies.building;
  let role = cookies.user_role;
  let flag;
  
  if(role === 'super_admin'){
    flag = true;
  }

  const order = await getOrder(company_id, building, flag).catch(err => err.response);
  const orders = order.data.data;

  return { 
      props: { 
          orders 
        } 
    };
}


export default PendingAproval;
