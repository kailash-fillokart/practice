import React, { useRef } from 'react';
import { getInvoiceExternally, decryptId } from '../../apiCalls';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Container from '@mui/material/Container';
import { useReactToPrint } from 'react-to-print';
import GenericPdfDownloader from '../../components/pdfdownloader/GenericPdfDownloader';
import { Print } from '@mui/icons-material';
import TaxInvoice from '../../components/pdfcomp/TaxInvoice';

const ClientInvoice = ({ invoices, taxArr, amtArr, itemArray, pincode }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const {
    attributes: { invoice_no, net_amount },
  } = invoices;

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
          <h3 style={{ fontFamily: 'poppins' }}>Rs. {net_amount}</h3>
          <p style={{ color: '#db460b' }}>Balance Due</p>
          <br />
          <p>
            Invoice# : <b>{invoice_no}</b>
          </p>
        </div>
        <Box sx={{ mr: 4 }}>
          <button
            type='button'
            className='bg-gray-500 border border-gray-500 p-2 mb-4'
            onClick={handlePrint}
          >
            <Print />
          </button>

          <GenericPdfDownloader
            downloadFileName={`Invoice${invoice_no}`}
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
            <TaxInvoice
              orders={invoices}
              taxObj={taxArr}
              amtObj={amtArr}
              itemsArray={itemArray}
              pdfId='testId'
              ref={componentRef}
              pincode={pincode}
            />
          }
        </div>
      </Container>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  let taxArr = [];
  let amtArr = [];

  const decryptedId = decryptId(params.pid);

  const invoice = await getInvoiceExternally(decryptedId).catch(
    (err) => err.response
  );
  const invoices = invoice.data.data;

  const {
    attributes: {
      order_invoice_items: { data: itemArray },
      order: {
        data: {
          attributes: {
            order_address: {
              data: {
                attributes: {
                  addresses: { data: addressArr },
                },
              },
            },
          },
        },
      },
    },
  } = invoices;

  let pincode;

  addressArr.map((address) => {
    if (address.attributes.address_type === 'billing_address') {
      pincode = address.attributes.pincode;
    }
    return null;
  });

  itemArray.map((item) => {
    const tax =
      item.attributes.order_item.data.attributes.product_id.data.attributes.gst.slice(
        -2
      );
    const value = item.attributes.tax_amount;
    const amount = item.attributes.total_amount;
    taxArr.push({
      [tax]: value,
    });
    amtArr.push({
      [tax]: amount,
    });
    return null;
  });

  return {
    props: {
      invoices,
      taxArr,
      amtArr,
      itemArray,
      pincode,
    },
  };
}

export default ClientInvoice;
