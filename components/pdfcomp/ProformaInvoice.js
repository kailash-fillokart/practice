import * as React from 'react';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import logo from '../../logos/new-fillokart.png';
import { Box } from '@mui/material';
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

const ProformaInvoice = React.forwardRef(
  ({ pdfId, orders, taxObj, amtObj, itemsArray, pincode }, ref) => {
    const {
      attributes: {
        order_number,
        po_number,
        createdDate: date,
        net_amount,
        total_amount,
        order_invoices: { data: orderInvoiceArray },
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
    const expectedDate = `${n.getDate()}/${
      n.getMonth() + 1
    }/${n.getFullYear()}`;
    let totalQuantity = 0;

    return (
      <div style={{ marginTop: '1rem' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <div id={pdfId} ref={ref} style={container}>
                <Grid container direction='row' justifyContent='space-between'>
                  <Grid item xs={3} alignSelf={'center'}>
                    <div
                      style={{
                        marginLeft: 20,
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
                    </h3>
                    <p
                      style={{
                        fontSize: '12px',
                        width: '300px',
                        margin: '5px auto',
                        textAlign: 'center',
                      }}
                    >
                      1820, HBR Layout, 5 th Block 1st Stage, Bengaluru,
                      Karnataka, 560043 <br />
                      GSTIN 29AAECF4834G1ZJ
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
                        Proforma <br /> Invoice
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
                          <TableCell style={row1st}>Sales Order #</TableCell>
                          <TableCell style={{ ...row1st, fontWeight: '600' }}>
                            : SO-{order_number}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={row1st}>Order Date</TableCell>
                          <TableCell style={{ ...row1st, fontWeight: '600' }}>
                            : {orderDate}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={row1st}>Terms</TableCell>
                          <TableCell style={{ ...row1st, fontWeight: '600' }}>
                            : {payment_terms}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={row1st}>
                            Expected Delivery
                          </TableCell>
                          <TableCell style={{ ...row1st, fontWeight: '600' }}>
                            : {expectedDate}
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
                          <TableCell style={row1st}>Purchase Order #</TableCell>
                          <TableCell style={{ ...row1st, fontWeight: '600' }}>
                            : {po_number}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={row1st}>Place Of Supply</TableCell>
                          <TableCell style={{ ...row1st, fontWeight: '600' }}>
                            : Karnataka
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={row1st}>Sales Person</TableCell>
                          <TableCell style={{ ...row1st, fontWeight: '600' }}>
                            : Syed Imran
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={row1st}>Delivery</TableCell>
                          <TableCell style={{ ...row1st, fontWeight: '600' }}>
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
                        building_name,
                        address_type,
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
                              GSTIN {gst_no}
                            </p>
                          ) : (
                            ''
                          )}
                        </div>
                      </Grid>
                    );
                  })}
                  <Grid item xs={12}>
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
                                <TableCell colSpan={2} style={tableheadstyle}>
                                  CGST
                                </TableCell>
                                <TableCell colSpan={2} style={tableheadstyle}>
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
                            <TableCell rowSpan={2} style={tableheadstyle}>
                              Item {'&'} Description{' '}
                            </TableCell>
                            <TableCell rowSpan={2} style={tableheadstyle}>
                              HSN{' '}
                            </TableCell>

                            <TableCell rowSpan={2} style={tableheadstyle}>
                              Qty
                            </TableCell>
                            <TableCell rowSpan={2} style={tableheadstyle}>
                              Rate
                            </TableCell>
                            {[56, 57, 58, 59].includes(
                              parseInt(pincode.toString().slice(0, 2))
                            ) ? (
                              <>
                                {' '}
                                <TableCell colSpan={1} style={tableheadstyle}>
                                  %
                                </TableCell>
                                <TableCell colSpan={1} style={tableheadstyle}>
                                  amt
                                </TableCell>
                                <TableCell colSpan={1} style={tableheadstyle}>
                                  %
                                </TableCell>
                                <TableCell colSpan={1} style={tableheadstyle}>
                                  amt
                                </TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell colSpan={1} style={tableheadstyle}>
                                  %
                                </TableCell>
                                <TableCell colSpan={1} style={tableheadstyle}>
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
                          {itemsArray.map((item, index) => {
                            const {
                              id,
                              attributes: {
                                order_quantity,
                                total_amount,
                                selling_price,
                                tax_amount,
                                product_id: {
                                  data: {
                                    attributes: { name, sku, gst, hsn },
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
                                  Rs.{selling_price.toFixed(2)}
                                </TableCell>

                                {[56, 57, 58, 59].includes(
                                  parseInt(pincode.toString().slice(0, 2))
                                ) ? (
                                  <>
                                    <TableCell style={dataRowStyle}>
                                      {gst.slice(-2) / 2}%
                                    </TableCell>
                                    <TableCell style={dataRowStyle}>
                                      {/* 7767000205 */}
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
                                  Rs.{total_amount.toFixed(2)}
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
                        2. Interest @ 18% p.a wil be charged if the payment is
                        not made with in the stipulated time.
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
                        Account Number: 093705003344 <br /> IFSC: ICIC0000937{' '}
                        <br />
                        Branch: New BEL Road, BANGALORE
                      </p>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      borderTop: '1px solid',
                    }}
                  >
                    <Grid>
                      <div>
                        <Table aria-label='simple table'>
                          <TableRow>
                            <TableCell
                              style={{
                                padding: '4px 14px',
                                fontSize: '12px',
                              }}
                            >
                              Sub Total
                            </TableCell>
                            <TableCell
                              style={{
                                padding: '4px 14px',
                                fontSize: '12px',
                              }}
                            >
                              {total_amount.toFixed(2)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell
                              style={{
                                padding: '4px 14px',
                                fontSize: '12px',
                              }}
                            >
                              Total Quantity
                            </TableCell>
                            <TableCell
                              style={{
                                padding: '4px 14px',
                                fontSize: '12px',
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
                              css={{
                                padding: '4px 14px',
                                fontSize: '12px',
                              }}
                              shipping={total_shipping_charge}
                            />
                          ) : (
                            <IGSTtax
                              taxPer={taxPer}
                              taxAmt={taxAmt}
                              css={{
                                padding: '4px 14px',
                                fontSize: '12px',
                              }}
                              shipping={total_shipping_charge}
                            />
                          )}
                          <TableRow>
                            <TableCell
                              style={{
                                borderBottom: 'none',
                                fontSize: '12px',
                                fontWeight: '600',
                                p: '5px',
                              }}
                            >
                              Total
                            </TableCell>
                            <TableCell
                              style={{
                                borderBottom: 'none',
                                fontSize: '12px',
                                fontWeight: '600',
                                p: '5px',
                              }}
                            >
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
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  }
);

export default ProformaInvoice;
