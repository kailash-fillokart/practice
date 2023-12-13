import * as React from 'react';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import logo from '../../logos/FlillOkart-logo.png';
import Box from '@mui/material/Box';
import GSTtax from '../../components/tax/gst';
import IGSTtax from '../../components/tax/igst';
import {
  container,
  dataRowStyle,
  row1st,
  tableheadblackstyle,
  tableheadstyle,
} from '../../styles/PDFViewStyles';
import { capitalizeWords } from '../../utils/constants';

const TaxInvoice = React.forwardRef(
  ({ pdfId, orders, taxObj, amtObj, itemsArray, pincode }, ref) => {
    const {
      attributes: {
        invoice_no,
        net_amount,
        total_amount,
        invoice_date,
        payment_terms: {
          data: {
            attributes: { term_name },
          },
        },
        shipping_charge,
        order: {
          data: {
            attributes: {
              order_number,
              po_number,
              user_id: {
                data: {
                  attributes: { phone, username },
                },
              },
              company: {
                data: {
                  attributes: { name: companyName, gst_no },
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
          },
        },
      },
    } = orders;

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

    const d = new Date(invoice_date);
    const invoiceDate = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    let result = d.setDate(d.getDate() + 2);
    let n = new Date(result);
    let totalQuantity = 0;

    return (
      <>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    backgroundColor: 'white',
                  }}
                >
                  <div id={pdfId} ref={ref} style={container}>
                    <Grid
                      container
                      direction='row'
                      justifyContent='space-between'
                      style={{ paddingBottom: '5px' }}
                    >
                      <Grid item xs={3} alignSelf={'center'}>
                        <div
                          style={{
                            marginBottom: 3,
                            borderRadius: '10px',
                            padding: 10,
                          }}
                        >
                          <img
                            src={logo}
                            alt='Loading...'
                            width='150px'
                            height='auto'
                          />
                        </div>
                      </Grid>
                      <Grid item xs={6} alignSelf={'center'}>
                        <h3
                          align='center'
                          style={{
                            fontWeight: '500',
                            marginTop: '10px',
                          }}
                        >
                          Fillokart India Private Limited
                          {/* COMPANY NAME */}
                        </h3>
                        <p
                          style={{
                            // marginTop: 10,
                            fontSize: '12px',
                            width: '300px',
                            margin: '5px auto',
                            textAlign: 'center',
                          }}
                        >
                          1820, HBR Layout, 5th Block 1st Stage, Bengaluru,
                          Karnataka, 560043 <br />
                          GSTIN - 29AAECF4834G1ZJ
                        </p>
                      </Grid>
                      <Grid item xs={3} alignSelf={'center'}>
                        <div
                          style={{
                            marginTop: 8,
                            textAlign: 'center',
                            marginLeft: 50,
                          }}
                        >
                          <h3>
                            TAX <br /> INVOICE
                          </h3>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={6} style={{ borderTop: '1px solid' }}>
                        <div>
                          <Table
                            aria-label='simple table'
                            style={{ margin: '10px' }}
                          >
                            <TableRow>
                              <TableCell style={row1st}>Invoice #</TableCell>
                              <TableCell
                                style={{ ...row1st, fontWeight: '600' }}
                              >
                                : {invoice_no}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={row1st}>
                                Sales Order #
                              </TableCell>
                              <TableCell
                                style={{ ...row1st, fontWeight: '600' }}
                              >
                                : SO-{order_number}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={row1st}>Invoice Date</TableCell>
                              <TableCell
                                style={{ ...row1st, fontWeight: '600' }}
                              >
                                : {invoiceDate}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={row1st}>Terms</TableCell>
                              <TableCell
                                style={{ ...row1st, fontWeight: '600' }}
                              >
                                : {term_name}
                              </TableCell>
                            </TableRow>
                          </Table>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          borderTop: '1px solid',
                          borderLeft: '1px solid',
                        }}
                      >
                        <div>
                          <Table
                            aria-label='simple table'
                            style={{ margin: '10px' }}
                          >
                            <TableRow>
                              <TableCell style={row1st}>
                                Purchase Order #
                              </TableCell>
                              <TableCell
                                style={{ ...row1st, fontWeight: '600' }}
                              >
                                : {po_number}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={row1st}>
                                Place Of Supply
                              </TableCell>
                              <TableCell
                                style={{ ...row1st, fontWeight: '600' }}
                              >
                                : Karnataka
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={row1st}>Sales Person</TableCell>
                              <TableCell
                                style={{ ...row1st, fontWeight: '600' }}
                              >
                                : Syed Imran
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={row1st}>Delivery</TableCell>
                              <TableCell
                                style={{ ...row1st, fontWeight: '600' }}
                              >
                                : fillOkart Logistics
                              </TableCell>
                            </TableRow>
                          </Table>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          borderTop: '1px solid',
                          fontWeight: '600',
                          borderBottom: '1px solid',
                          fontSize: '12px',
                          padding: '1px 0px',
                        }}
                      >
                        <div style={{ marginLeft: 10, padding: 4 }}>
                          Billing Address
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          borderTop: '1px solid',
                          borderLeft: '1px solid',
                          fontWeight: '600',
                          borderBottom: '1px solid',
                          fontSize: '12px',
                          padding: '1px 0px',
                        }}
                      >
                        <div style={{ marginLeft: 10, padding: 4 }}>
                          Shipping Address
                        </div>
                      </Grid>
                      {addressArray.map((address, index) => {
                        const {
                          attributes: {
                            address1,
                            address2,
                            city,
                            state,
                            pincode,
                            address_type,
                            building_name,
                          },
                        } = address;
                        return (
                          <Grid
                            item
                            xs={6}
                            style={{
                              borderLeft: index === 1 ? '1px solid' : 'none',
                            }}
                          >
                            <div style={{ margin: '8px 0px 8px 14px' }}>
                              <p
                                style={{
                                  margin: '0px',
                                  fontSize: '12px',
                                  fontWeight: '500',
                                }}
                              >
                                {address_type === 'shipping_address' &&
                                  `${capitalizeWords(username)}, `}
                                {capitalizeWords(companyName)}
                              </p>
                              <p style={{ margin: '0px', fontSize: '12px' }}>
                                {`${building_name}, ${address1}, ${address2}`}{' '}
                                <br />
                                {`${city}, ${state}`}
                                <br />
                                {`India - ${pincode}`}
                              </p>
                              {address_type === 'shipping_address' ? (
                                <p
                                  style={{
                                    margin: '0px',
                                    fontSize: '12px',
                                  }}
                                >
                                  Phone : {phone}
                                </p>
                              ) : (
                                ''
                              )}
                              {address_type === 'billing_address' ? (
                                <p
                                  style={{
                                    margin: '0px',
                                    fontSize: '12px',
                                  }}
                                >
                                  GST : {gst_no}
                                </p>
                              ) : (
                                ''
                              )}
                            </div>
                          </Grid>
                        );
                      })}
                      <Grid
                        item
                        xs={12}
                        style={
                          {
                            // margin: '0px 10px',
                            // borderBottom: '1px solid',
                          }
                        }
                      >
                        <div>
                          <Table>
                            <TableHead>
                              <TableRow
                                style={{
                                  backgroundColor: '#e8e4e4',
                                  verticalAlign: 'text-bottom',
                                }}
                              >
                                <TableCell
                                  rowSpan={1}
                                  style={{
                                    ...tableheadblackstyle,
                                    borderLeft: '1px solid',
                                  }}
                                ></TableCell>{' '}
                                <TableCell
                                  rowSpan={1}
                                  style={tableheadblackstyle}
                                ></TableCell>{' '}
                                <TableCell
                                  rowSpan={1}
                                  style={tableheadblackstyle}
                                ></TableCell>{' '}
                                <TableCell
                                  rowSpan={1}
                                  style={tableheadblackstyle}
                                ></TableCell>
                                <TableCell
                                  rowSpan={1}
                                  style={tableheadblackstyle}
                                ></TableCell>
                                {[56, 57, 58, 59].includes(
                                  parseInt(pincode.toString().slice(0, 2))
                                ) ? (
                                  <>
                                    <TableCell
                                      colSpan={2}
                                      style={tableheadstyle}
                                    >
                                      CGST
                                    </TableCell>
                                    <TableCell
                                      colSpan={2}
                                      style={tableheadstyle}
                                    >
                                      SGST
                                    </TableCell>
                                  </>
                                ) : (
                                  <TableCell colSpan={2} style={tableheadstyle}>
                                    IGST
                                  </TableCell>
                                )}
                                <TableCell
                                  colSpan={2}
                                  style={tableheadblackstyle}
                                ></TableCell>
                              </TableRow>
                              <TableRow
                                style={{
                                  backgroundColor: '#e8e4e4',
                                  verticalAlign: 'text-bottom',
                                }}
                              >
                                <TableCell rowSpan={2} style={tableheadstyle}>
                                  S.No
                                </TableCell>
                                <TableCell
                                  rowSpan={2}
                                  style={{
                                    ...tableheadstyle,
                                    textAlign: 'start',
                                  }}
                                >
                                  Item {'&'} Description{' '}
                                </TableCell>
                                <TableCell rowSpan={2} style={tableheadstyle}>
                                  HSN{' '}
                                </TableCell>
                                <TableCell rowSpan={2} style={tableheadstyle}>
                                  Quantity
                                </TableCell>
                                <TableCell rowSpan={2} style={tableheadstyle}>
                                  Rate
                                </TableCell>
                                {[56, 57, 58, 59].includes(
                                  parseInt(pincode.toString().slice(0, 2))
                                ) ? (
                                  <>
                                    {' '}
                                    <TableCell
                                      colSpan={1}
                                      style={tableheadstyle}
                                    >
                                      %
                                    </TableCell>
                                    <TableCell
                                      colSpan={1}
                                      style={tableheadstyle}
                                    >
                                      amt
                                    </TableCell>
                                    <TableCell
                                      colSpan={1}
                                      style={tableheadstyle}
                                    >
                                      %
                                    </TableCell>
                                    <TableCell
                                      colSpan={1}
                                      style={tableheadstyle}
                                    >
                                      amt
                                    </TableCell>
                                  </>
                                ) : (
                                  <>
                                    <TableCell
                                      colSpan={1}
                                      style={tableheadstyle}
                                    >
                                      %
                                    </TableCell>
                                    <TableCell
                                      colSpan={1}
                                      style={tableheadstyle}
                                    >
                                      amt
                                    </TableCell>
                                  </>
                                )}
                                <TableCell rowSpan={2} style={tableheadstyle}>
                                  Amount
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {itemsArray
                                .filter((item) => {
                                  return item.attributes.order_quantity !== 0;
                                })
                                .map((item, index) => {
                                  const {
                                    id,
                                    attributes: {
                                      order_quantity,
                                      total_amount,
                                      tax_amount,
                                      order_item: {
                                        data: {
                                          attributes: {
                                            selling_price,
                                            product_id: {
                                              data: {
                                                attributes: {
                                                  name,
                                                  sku,
                                                  gst,
                                                  hsn,
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  } = item;
                                  totalQuantity += order_quantity;
                                  return (
                                    <TableRow key={id}>
                                      <TableCell
                                        style={{
                                          ...dataRowStyle,
                                          borderLeft: '1px solid',
                                        }}
                                      >
                                        {index + 1}
                                      </TableCell>
                                      <TableCell
                                        style={{
                                          ...dataRowStyle,
                                          textAlign: 'start',
                                          padding: '8px 6px',
                                        }}
                                      >
                                        {capitalizeWords(name)}
                                        <br />
                                        SKU : {sku}
                                      </TableCell>
                                      <TableCell style={dataRowStyle}>
                                        {hsn}
                                      </TableCell>

                                      <TableCell style={dataRowStyle}>
                                        {order_quantity}
                                      </TableCell>
                                      <TableCell style={dataRowStyle}>
                                        {selling_price.toFixed(2)}
                                      </TableCell>

                                      {[56, 57, 58, 59].includes(
                                        parseInt(pincode.toString().slice(0, 2))
                                      ) ? (
                                        <>
                                          <TableCell style={dataRowStyle}>
                                            {gst.slice(-2) / 2}%
                                          </TableCell>
                                          <TableCell style={dataRowStyle}>
                                            {(tax_amount / 2).toFixed(2)}
                                          </TableCell>
                                          <TableCell style={dataRowStyle}>
                                            {gst.slice(-2) / 2}%
                                          </TableCell>
                                          <TableCell style={dataRowStyle}>
                                            {(tax_amount / 2).toFixed(2)}
                                          </TableCell>
                                        </>
                                      ) : (
                                        <>
                                          <TableCell style={dataRowStyle}>
                                            {gst.slice(-2)}%
                                          </TableCell>
                                          <TableCell style={dataRowStyle}>
                                            {tax_amount.toFixed(2)}
                                          </TableCell>
                                        </>
                                      )}

                                      <TableCell style={dataRowStyle}>
                                        {total_amount.toFixed(2)}
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                            </TableBody>
                          </Table>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          // marginTop: '10px',
                          borderTop: '1px solid',
                          borderRight: '0.5px solid',
                        }}
                      >
                        <div style={{ margin: '14px' }}>
                          <p
                            style={{
                              margin: '5px 0px',
                              fontWeight: '500',
                              fontSize: '12px',
                            }}
                          >
                            Terms {'&'} Conditions E.{'&'} O.E.
                          </p>
                          <p style={{ margin: '5px 0px', fontSize: '12px' }}>
                            1. Goods Once Sold Will Not Be Taken Back.{' '}
                          </p>
                          <p style={{ margin: '5px 0px', fontSize: '12px' }}>
                            2. Interest @ 18% p.a wil be charged if the payment
                            is not made with in the stipulated time.
                          </p>
                          <p style={{ margin: '5px 0px', fontSize: '12px' }}>
                            3. Subject to Karnataka jurisdiction only.
                          </p>
                        </div>
                        <div style={{ margin: '12px' }}>
                          <p
                            style={{
                              margin: '5px 0px',
                              fontWeight: '500',
                              fontSize: '12px',
                            }}
                          >
                            Thanks for your Business!..
                          </p>
                          <br />

                          <p style={{ margin: '5px 0px', fontSize: '12px' }}>
                            Bank Details <br />
                            Fillokart India Private Limited <br />
                            Account Number: 093705003344 <br /> IFSC:
                            ICIC0000937 <br />
                            Branch: New BEL Road, BANGALORE
                          </p>
                        </div>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        style={{
                          borderTop: '1px solid',
                          // marginTop: '10px',
                        }}
                      >
                        <Grid>
                          <div>
                            <Table aria-label='simple table'>
                              <TableRow>
                                <TableCell
                                  sx={{
                                    padding: '4px 14px',
                                    fontSize: '12px !important',
                                  }}
                                >
                                  Sub Total
                                </TableCell>
                                <TableCell
                                  sx={{
                                    padding: '4px 14px',
                                    fontSize: '12px !important',
                                  }}
                                >
                                  Rs. {total_amount.toFixed(2)}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  sx={{
                                    padding: '4px 14px',
                                    fontSize: '12px !important',
                                  }}
                                >
                                  Total Quantity
                                </TableCell>
                                <TableCell
                                  sx={{
                                    padding: '4px 14px',
                                    fontSize: '12px !important',
                                  }}
                                >
                                  {totalQuantity}
                                </TableCell>
                              </TableRow>
                              {[56, 57, 58, 59].includes(
                                parseInt(pincode.toString().slice(0, 2))
                              ) ? (
                                <GSTtax
                                  taxPer={taxPer}
                                  taxAmt={taxAmt}
                                  shipping={shipping_charge}
                                  css={{
                                    padding: '4px 14px',
                                    fontSize: '12px !important',
                                  }}
                                />
                              ) : (
                                <IGSTtax
                                  taxPer={taxPer}
                                  taxAmt={taxAmt}
                                  shipping={shipping_charge}
                                  css={{
                                    padding: '4px 14px',
                                    fontSize: '12px !important',
                                  }}
                                />
                              )}
                              <TableRow>
                                <TableCell
                                  sx={{
                                    borderBottom: 'none !important',
                                    fontSize: '12px !important',
                                    fontWeight: '600 !important',
                                    padding: '4px 14px',
                                  }}
                                >
                                  Total
                                </TableCell>
                                <TableCell
                                  sx={{
                                    borderBottom: 'none !important',
                                    fontSize: '12px !important',
                                    fontWeight: '600 !important',
                                    padding: '4px 14px',
                                  }}
                                >
                                  {shipping_charge ? (
                                    <>
                                      Rs{' '}
                                      {(
                                        net_amount +
                                        shipping_charge +
                                        0.18 * shipping_charge
                                      ).toFixed(2)}
                                    </>
                                  ) : (
                                    <>Rs {net_amount.toFixed(2)}</>
                                  )}
                                </TableCell>
                              </TableRow>
                            </Table>
                          </div>
                        </Grid>
                        <Grid style={{ borderTop: '1px solid' }}>
                          <div style={{ margin: '16px 16px 0px 16px' }}>
                            <div style={{ height: '90px' }}></div>
                            <p
                              align={'center'}
                              style={{ fontSize: '12px', marginBottom: '5px' }}
                            >
                              Authorized Signature
                            </p>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
);

export default TaxInvoice;
