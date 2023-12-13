import React, { useState, useRef } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MaterialTable from 'material-table';
import { Box, Modal } from '@mui/material';
import TaxInvoice from '../pdfcomp/TaxInvoice';
import ReceiveInventory from '../receive/ReceiveInventory';
import { Print } from '@mui/icons-material';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import ProformaInvoice from '../pdfcomp/ProformaInvoice';
import { ArrowBack, Cancel, Download } from '@mui/icons-material';
import Saleorder from '../../pages/purchaseorder/saleorder';
import GenericPdfDownloader from '../pdfdownloader/GenericPdfDownloader';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useReactToPrint } from 'react-to-print';
import { getOrderInvoicesById } from '../../apiCalls';
import { saveAs } from 'file-saver';

const PurchaseDetail = ({
  orders,
  taxObj,
  amtObj,
  itemsArray,
  pincode,
  comp_id,
  orderInv,
  inventories,
  user_id,
  building,
}) => {
  const [pdfview, setPdfview] = useState(false);
  const [value, setValue] = useState('1');
  const [orderInvoices, setOrderInvoices] = useState(orderInv);
  const [taxObj1, setTaxObj1] = useState([]);
  const [amtObj1, setAmtObj1] = useState([]);
  const [itemsArray1, setItemsArray1] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [open, setOpen] = useState(false);
  const [compInv, setCompInv] = useState(inventories);

  const router = useRouter();
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleTabsChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInvoiceClick = async (inv_id) => {
    const { data } = await getOrderInvoicesById(comp_id, inv_id).catch(
      (err) => err.response
    );
    let taxArr1 = [];
    let amtArr1 = [];
    const {
      attributes: {
        order_invoice_items: { data: itemArray },
      },
    } = data.data;
    itemArray.map((item) => {
      const tax =
        item.attributes.order_item.data.attributes.product_id.data.attributes.gst.slice(
          -2
        );
      const value = item.attributes.tax_amount;
      const amount = item.attributes.total_amount;
      taxArr1.push({
        [tax]: value,
      });
      amtArr1.push({
        [tax]: amount,
      });
      return null;
    });
    setTaxObj1(taxArr1);
    setAmtObj1(amtArr1);
    setItemsArray1(itemArray);
    setInvoice(data.data);
    handleOpen(true);
  };

  const {
    attributes: { order_number },
  } = orders;

  const ordInvoices = orderInvoices.filter(
    (invs) => invs.attributes.order.data.id === orders.id
  );

  const columns = [
    {
      title: 'Inv Date',
      field: 'date',
      cellStyle: { fontSize: '13px' },
    },
    {
      title: 'Invoice#',
      field: 'invoice_no',
      cellStyle: {
        color: '#0d6efd',
        cursor: 'pointer',
        fontSize: '13px',
      },
      render: (rowData) => (
        <>
          <button
            className='btn btn-sm m-0 text-primary'
            onClick={() => handleInvoiceClick(rowData.inv_id)}
          >
            {rowData.invoice_no}
          </button>
        </>
      ),
    },
    {
      title: 'Amount',
      field: 'net_amount',
      align: 'center',
      type: 'currency',
      currencySetting: { currencyCode: 'INR' },
      cellStyle: { fontSize: '13px' },
    },
    {
      title: 'Balance',
      field: 'balance',
      align: 'right',
      type: 'currency',
      currencySetting: { currencyCode: 'INR' },
      cellStyle: { fontSize: '13px' },
    },
    {
      title: 'Status',
      field: 'status',
      cellStyle: { fontSize: '13px' },
      align: 'right',
    },
    {
      title: 'Delivery Chalan',
      field: 'image',
      cellStyle: { fontSize: '13px' },
      align: 'right',
    },
  ];

  const handleDcDownload = (file, filename) => {
    const {
      attributes: { url },
    } = file;
    saveAs(url, `DC-${filename}`);
  };

  const rows = ordInvoices.map((inv) => {
    const {
      id: inv_id,
      attributes: {
        invoice_no,
        invoice_date: date,
        net_amount,
        transaction_amounts,
        upload_dc_image: { data: imageArray },
      },
    } = inv;
    let amt;
    let image;

    if (imageArray === null) {
      image = 'UPLOAD PENDING';
    } else {
      let data_image = () => {
        return (
          <>
            UPLOADED{' '}
            <button
              className='btn btn-sm m-0 text-info'
              onClick={() => handleDcDownload(imageArray, invoice_no)}
            >
              {' '}
              <Download />
            </button>
          </>
        );
      };
      image = data_image();
    }

    if (transaction_amounts.data.length !== 0) {
      amt = transaction_amounts.data
        .map((e) => e.attributes.inv_amount)
        .reduce((prev, next) => prev + next);
    } else {
      amt = 0;
    }

    let balance = net_amount - amt;
    let status = 'Unpaid';
    if (balance === 0) {
      status = 'Paid';
    }
    return {
      invoice_no,
      date,
      net_amount,
      balance,
      status,
      inv_id,
      image,
    };
  });
  return (
    <Box sx={{ margin: '0 30px' }}>
      <TabContext value={value}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Button
              size='small'
              onClick={() => router.push('/purchaseorder')}
              sx={{ mt: '5px', color: 'rgb(10, 177, 60)' }}
            >
              <ArrowBack />
            </Button>
            <TabList onChange={handleTabsChange} className='sub-bar-color'>
              <Tab label='Purchase Order' value='1' />
              <Tab label='Invoices' value='2' />
              <Tab label='Receive' value='3' />
            </TabList>
          </Box>
          <div style={{ display: 'flex' }}>
            {pdfview ? (
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
                  downloadFileName={`Proforma${order_number}`}
                  rootElementId='testId'
                />
              </Box>
            ) : (
              ''
            )}
            {value === '1' ? (
              <Box sx={{ mt: '9px' }}>
                <span style={{ fontSize: '14px' }}>Show in PDF</span>
                <FormControlLabel
                  value='start'
                  label=''
                  control={<Switch color='primary' />}
                  labelPlacement='start'
                  onChange={() => setPdfview(!pdfview)}
                />
              </Box>
            ) : (
              ''
            )}
          </div>
        </Box>
        <TabPanel value='1'>
          <div>
            {pdfview ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ProformaInvoice
                  pdfview={setPdfview}
                  orders={orders}
                  taxObj={taxObj}
                  amtObj={amtObj}
                  itemsArray={itemsArray}
                  pincode={pincode}
                  pdfId='testId'
                  ref={componentRef}
                />
              </Box>
            ) : (
              <Saleorder
                orders={orders}
                taxObj={taxObj}
                amtObj={amtObj}
                itemsArray={itemsArray}
                pincode={pincode}
              />
            )}
          </div>
        </TabPanel>
        <TabPanel value='2'>
          <Box
            sx={{
              borderRadius: '10px',
              boxShadow: '9px 2px 14px -8px rgba(87,87,87,1)',
            }}
          >
            <MaterialTable
              columns={columns}
              data={rows}
              title='INVOICES'
              options={{
                searchFieldAlignment: 'right',
                pageSizeOptions: [10],
                pageSize: 10,
                columnsButton: true,
                border: false,
                rowStyle: { fontSize: '12px' },
                headerStyle: {
                  fontWeight: '600',
                  fontSize: '13px',
                  borderBottom: '2px solid rgb(10, 177, 60)',
                },
                onPageChange: '',
                sorting: true,
                searchFieldStyle: {
                  height: '25px',
                  width: '200px',
                  fontSize: '14px',
                  borderRadius: '20px',
                  paddingBottom: '5px',
                  marginTop: '4px',
                },
                searchFieldVariant: 'outlined',
                maxBodyHeight: '66vh',
              }}
              sx={{ width: 'auto' }}
            />
          </Box>
        </TabPanel>
        <TabPanel value='3'>
          <ReceiveInventory
            orderInvoiceData={ordInvoices}
            compId={comp_id}
            compInv={compInv}
            setCompInv={setCompInv}
            setOrderInvoices={setOrderInvoices}
            userId={user_id}
            building={building}
          />
        </TabPanel>
      </TabContext>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            boxShadow: 24,
            p: 4,
            pt: 1,
            margin: '30px auto',
            height: '100vh',
          }}
          className='modalscroll'
        >
          <div style={{ display: 'flex', justifyContent: 'right' }}>
            <Button>
              <GenericPdfDownloader
                downloadFileName={
                  invoice.length !== 0 ? invoice.attributes.invoice_no : ''
                }
                rootElementId='testId'
              />
            </Button>
            <Button
              sx={{ fontSize: '10px', color: '#9c1506', mt: 1 }}
              onClick={() => setOpen(false)}
            >
              <Cancel />
            </Button>
          </div>
          <div>
            <TaxInvoice
              orders={invoice}
              taxObj={taxObj1}
              amtObj={amtObj1}
              itemsArray={itemsArray1}
              pdfId='testId'
              pincode={pincode}
            />
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default PurchaseDetail;
