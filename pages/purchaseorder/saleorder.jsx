import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import GSTtax from '../../components/tax/gst';
import IGSTtax from '../../components/tax/igst';

export default function Saleorder({
  orders,
  taxObj,
  amtObj,
  itemsArray,
  pincode,
}) {
  const ref = React.createRef();
  const {
    attributes: {
      order_number,
      po_number,
      createdDate: date,
      net_amount,
      total_amount,
      order_status,
      order_invoices: { data: orderInvoiceArray },
      company: {
        data: {
          attributes: { name: companyName },
        },
      },
      payment_terms: {
        data: {
          attributes: { term_name: payment_terms },
        },
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

  let total_shipping_charge = 0;

  if (orderInvoiceArray.length !== 0) {
    total_shipping_charge = orderInvoiceArray
      .map((item) => item.attributes.shipping_charge)
      .reduce((prev, next) => prev + next);
  }

  const calculateTax = (arr) => {
    let sumObj = arr.reduce((acc, obj) => {
      var key = Object.keys(obj)[0];
      if (acc.hasOwnProperty(key)) {
        acc[key] += obj[key];
      } else {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
    return sumObj;
  };

  const taxPer = calculateTax(taxObj);
  const taxAmt = calculateTax(amtObj);

  const d = new Date(date);
  const orderDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

  let result = d.setDate(d.getDate() + 3);
  let n = new Date(result);
  const expectedDate = `${n.getDate()}/${n.getMonth() + 1}/${n.getFullYear()}`;
  let totalQuantity = 0;

  return (
    <>
      <Box sx={{}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Box
            sx={{
              p: 2,
              m: 2,
              borderRadius: '10px',
              width: '60%',
              borderLeft: '5px solid rgb(10, 177, 60)',
            }}
          >
            <Table aria-label='simple table'>
              <TableBody>
                <TableRow>
                  <TableCell
                    sx={{
                      p: 1,
                      m: 1,
                      fontWeight: 'bold',
                      color: 'rgb(10, 177, 60)',
                    }}
                  >
                    SALES ORDER
                  </TableCell>
                  <TableCell sx={{ p: 1, m: 1 }}>:</TableCell>
                  <TableCell
                    sx={{ p: 1, m: 1, textAlign: 'end', fontWeight: 'bold' }}
                  >
                    SO-{order_number}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ p: 1, m: 1 }}>PO Number</TableCell>
                  <TableCell sx={{ p: 1, m: 1 }}>:</TableCell>
                  <TableCell sx={{ p: 1, m: 1, textAlign: 'end' }}>
                    {po_number}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ p: 1, m: 1 }}>Order Date</TableCell>
                  <TableCell sx={{ p: 1, m: 1 }}>:</TableCell>
                  <TableCell sx={{ p: 1, m: 1, textAlign: 'end' }}>
                    {orderDate}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ p: 1, m: 1 }}>Expected Delivery</TableCell>
                  <TableCell sx={{ p: 1, m: 1 }}>:</TableCell>
                  <TableCell sx={{ p: 1, m: 1, textAlign: 'end' }}>
                    {expectedDate}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ p: 1, m: 1 }}>Payment Terms</TableCell>
                  <TableCell sx={{ p: 1, m: 1 }}>:</TableCell>
                  <TableCell sx={{ p: 1, m: 1, textAlign: 'end' }}>
                    {payment_terms}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ p: 1, m: 1 }}>Delivery Method</TableCell>
                  <TableCell sx={{ p: 1, m: 1 }}>:</TableCell>
                  <TableCell sx={{ p: 1, m: 1, textAlign: 'end' }}>
                    fillOkart Logistics
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ p: 1, m: 1, borderBottom: 'none' }}>
                    Sales person
                  </TableCell>
                  <TableCell sx={{ p: 1, m: 1, borderBottom: 'none' }}>
                    :
                  </TableCell>
                  <TableCell
                    sx={{ p: 1, m: 1, borderBottom: 'none', textAlign: 'end' }}
                  >
                    Syed Imran
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Box sx={{ width: '40%' }}>
            <Box sx={{ m: 1, textAlign: 'end' }}>
              ORDER STATUS : <Button>{order_status}</Button>
            </Box>
            {addressArray.map((address) => {
              const {
                id,
                attributes: {
                  address1,
                  address2,
                  address_type,
                  city,
                  state,
                  pincode,
                },
              } = address;
              return (
                <Box
                  key={id}
                  sx={{
                    p: 2,
                    m: 2,
                    borderRadius: '6px',
                    borderRight: '5px solid rgb(10, 177, 60)',
                  }}
                >
                  <Box sx={{ color: 'rgb(10, 177, 60)', fontWeight: '600' }}>
                    {address_type.replace('_', ' ').toUpperCase()}
                  </Box>
                  <Box sx={{ fontSize: '15px' }}>{companyName}</Box>
                  <Box sx={{ fontSize: '14px' }}>
                    {`${address1} ${address2} `} <br />{' '}
                    {`${city}, ${state} - ${pincode}`}{' '}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            m: 2,
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow sx={{ background: '#ededed' }}>
                <TableCell>Items {'&'} Description</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Total price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsArray.map((item) => {
                const {
                  id,
                  attributes: {
                    order_quantity,
                    total_amount,
                    selling_price,
                    product_id: {
                      data: {
                        attributes: { name, sku },
                      },
                    },
                  },
                } = item;
                totalQuantity += order_quantity;
                return (
                  <TableRow key={id} sx={{ background: 'white' }}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{sku}</TableCell>
                    <TableCell> {selling_price.toFixed(2)}</TableCell>
                    <TableCell>{order_quantity}</TableCell>
                    <TableCell> {total_amount.toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Box
            sx={{
              p: 2,
              m: 2,
              width: '62%',
              fontSize: '12px',
            }}
          >
            <h5>
              Terms {'&'} Conditions E.{'&'} O.E.
            </h5>
            <p style={{ margin: '5px 0px' }}>
              1. Goods Once Sold Will Not Be Taken Back.{' '}
            </p>
            <p style={{ margin: '5px 0px' }}>
              2. Interest @ 18% p.a wil be charged if the payment is not made
              with in the stipulated time.
            </p>
            <p style={{ margin: '5px 0px' }}>
              3. Subject to Karnataka jurisdiction only.
            </p>
          </Box>
          <Box
            sx={{
              p: 2,
              m: 2,
              borderRadius: '10px',
              borderRight: '5px solid rgb(10, 177, 60)',
              width: '38%',
            }}
          >
            <Table aria-label='simple table'>
              <TableRow>
                <TableCell sx={{ p: 1, m: 1 }}>Sub Total</TableCell>
                <TableCell sx={{ p: 1, m: 1 }}>
                  {total_amount.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ p: 1, m: 1 }}>Total Quantity</TableCell>
                <TableCell sx={{ p: 1, m: 1 }}>{totalQuantity}</TableCell>
              </TableRow>

              {[56, 57, 58, 59].includes(
                parseInt(pincode.toString().slice(0, 2))
              ) ? (
                <GSTtax
                  taxPer={taxPer}
                  taxAmt={taxAmt}
                  css={{ p: 1, m: 1 }}
                  shipping={total_shipping_charge}
                />
              ) : (
                <IGSTtax
                  taxPer={taxPer}
                  taxAmt={taxAmt}
                  css={{ p: 1, m: 1 }}
                  shipping={total_shipping_charge}
                />
              )}

              <TableRow>
                <TableCell sx={{ p: 1, m: 1, background: '#ededed' }}>
                  Total
                </TableCell>
                <TableCell sx={{ p: 1, m: 1, background: '#ededed' }}>
                  {total_shipping_charge ? (
                    <>
                      Rs{' '}
                      {(
                        net_amount +
                        total_shipping_charge +
                        0.18 * total_shipping_charge
                      ).toFixed(2)}
                    </>
                  ) : (
                    <>Rs {net_amount.toFixed(2)}</>
                  )}
                </TableCell>
              </TableRow>
            </Table>
          </Box>
        </Box>
      </Box>
    </>
  );
}
