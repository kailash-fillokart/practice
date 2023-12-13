import React, { useState, useRef } from 'react';
import Container from '@mui/material/Container';
import CommonLayout from '../../layouts/CommonLayout';
import GenericPdfDownloader from '../../components/pdfdownloader/GenericPdfDownloader';
import { getOrderInvoicesById } from '../../apiCalls';
import { ArrowBack } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import TaxInvoice from '../../components/pdfcomp/TaxInvoice';
import { useReactToPrint } from 'react-to-print';
import { Print } from '@mui/icons-material';
import ErrorPage from '../../components/errorpage/error';
import { Box } from '@mui/material';

function invoiceDisplay({
  invoices,
  taxArr,
  amtArr,
  itemArray,
  pincode,
  company_id,
  comp_order_id,
}) {
  const router = useRouter();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const {
    attributes: { invoice_no },
  } = invoices;

  if (parseInt(company_id) !== comp_order_id)
    return (
      <CommonLayout>
        <ErrorPage />
      </CommonLayout>
    );

  return (
    <CommonLayout>
      <Container>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size='small'
              sx={{ mt: '5px', color: 'rgb(10, 177, 60)' }}
              onClick={() => router.push('/invoices')}
            >
              <ArrowBack />
            </Button>
            <div style={{ display: 'flex' }}>
              <Box sx={{ display: 'flex' }}>
                <Box
                  onClick={handlePrint}
                  sx={{
                    color: 'green',
                    cursor: 'pointer',
                    m: '15px 10px 0 0',
                  }}
                >
                  <Print />
                </Box>
                <GenericPdfDownloader
                  downloadFileName={`Invoice${invoice_no}`}
                  rootElementId='testId'
                />
              </Box>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TaxInvoice
            orders={invoices}
            taxObj={taxArr}
            amtObj={amtArr}
            itemsArray={itemArray}
            pdfId='testId'
            pincode={pincode}
            ref={componentRef}
          />
        </div>
      </Container>
    </CommonLayout>
  );
}

export async function getServerSideProps({ req, params }) {
  const cookies = req.cookies || null;
  let company_id = cookies.company_id;

  let taxArr = [];
  let amtArr = [];

  const invoice = await getOrderInvoicesById(company_id, params.pid).catch(
    (err) => err.response
  );
  const invoices = invoice.data.data;

  const {
    attributes: {
      order_invoice_items: { data: itemArray },
      order: {
        data: {
          attributes: {
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
        },
      },
    },
  } = invoices;

  const order_billingAddress = addressArray.find(
    (address) => address.attributes.address_type === 'billing_address'
  );
  const pincode = order_billingAddress.attributes.pincode;

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
      company_id,
      comp_order_id,
    },
  };
}

export default invoiceDisplay;
