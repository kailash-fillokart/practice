import React, { useRef } from 'react';
import { decryptId, getOrderExternally } from '../../apiCalls';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Container from '@mui/material/Container';
import { useReactToPrint } from 'react-to-print';
import GenericPdfDownloader from '../../components/pdfdownloader/GenericPdfDownloader';
import { Print } from '@mui/icons-material';
import ProformaInvoice from '../../components/pdfcomp/ProformaInvoice';

const ClientOrder = ({ orders, taxObj, amtObj, itemsArray, pincode }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const {
    attributes: { order_number, net_amount },
  } = orders;

  return (
    <div>
      <AppBar component='nav'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Fillokart India Private Limited
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          marginTop: '100px',
          marginLeft: '50px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h3 style={{ fontFamily: 'poppins' }}>
            Order Details - Rs {net_amount.toFixed(2)}
          </h3>
        </div>
        <Box sx={{ mr: 4, display: 'flex' }}>
          <button type='button' className='btn p-2 mb-4' onClick={handlePrint}>
            <Print />
          </button>
          <GenericPdfDownloader
            downloadFileName={`PO-${order_number}`}
            rootElementId='testId'
          />
        </Box>
      </Box>
      <Container
        style={{
          marginTop: '10px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {
            <ProformaInvoice
              orders={orders}
              taxObj={taxObj}
              amtObj={amtObj}
              itemsArray={itemsArray}
              pincode={pincode}
              pdfId='testId'
              ref={componentRef}
            />
          }
        </div>
      </Container>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  let taxObj = [];
  let amtObj = [];

  const decryptedId = decryptId(params.pid);

  const order = await getOrderExternally(decryptedId).catch(
    (err) => err.response
  );
  const orders = order.data.data;

  const {
    attributes: {
      order_items: { data: itemsArray },
      order_address: {
        data: {
          attributes: {
            addresses: { data: addressArr },
          },
        },
      },
    },
  } = orders;

  let pincode;

  addressArr.map((address) => {
    if (address.attributes.address_type === 'billing_address') {
      pincode = address.attributes.pincode;
    }
    return null;
  });

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
      pincode,
    },
  };
}

export default ClientOrder;
