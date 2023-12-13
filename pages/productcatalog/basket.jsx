import * as React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CommonLayout from '../../layouts/CommonLayout';
import Tablerow from '../../components/basket/basket';
import { makeStyles } from '@material-ui/core';
import { getBaskets } from '../../apiCalls/index';
import _ from 'lodash';
import { Box, Typography } from '@mui/material';
import SVG from '../../public/empty-cart.svg';
import SVGData from '../../components/SVGData';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles({
  basketflex: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },

  basketflexstart: {
    display: 'flex',
    flex: '1',
    justifyContent: 'flex-start',
  },

  basketflexend: {
    display: 'flex',
    flex: '1',
    justifyContent: 'flex-end',
  },

  basketpaper: {
    padding: 2,
    display: 'flex',
    flexDirection: 'column',
  },

  baskettabl: {
    width: 850,
  },

  baskettablerow: {
    borderRadius: '5px',
    backgroundColor: '#e8e4e4',
  },
});

export default function DashboardContent({
  baskets,
  total_amount,
  tax_amount,
  net_amount,
}) {
  const classes = useStyles();

  const [amount, setAmount] = React.useState(total_amount);
  const [net, setNet] = React.useState(net_amount);
  const [tax, setTax] = React.useState(tax_amount);

  // const calculateTax = (arr) => {
  //   let sumObj = arr.reduce((acc, obj) => {
  //     var key = Object.keys(obj)[0];
  //     if (acc.hasOwnProperty(key)) {
  //       acc[key] += obj[key];
  //     } else {
  //       acc[key] = obj[key];
  //     }
  //     return acc;
  //   }, {});
  //   return sumObj;
  // };

  // const taxPer = calculateTax(taxObj);
  // const taxAmt = calculateTax(amtObj);

  let basket = '';
  let basketid = '';
  let basketitems = '';

  if (baskets[0] != undefined) {
    basket = baskets;
    basketid = basket[0].id;
    basketitems = basket[0].attributes.basket_items.data;
  }

  return (
    <>
      <CommonLayout>
        <Box sx={{ margin: '0 30px' }}>
          {basketitems.length === 0 ? (
            <>
              <div
                style={{
                  display: 'grid',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Link href='/productcatalog'>
                  <Button
                    variant='outlined'
                    color='primary'
                    sx={{
                      fontSize: '12px',
                      fontFamily: 'Poppins',
                      fontWeight: '600',
                    }}
                    startIcon={<AddIcon />}
                  >
                    {' '}
                    ADD ITEMS
                  </Button>
                </Link>
              </div>
              <SVGData SVG={SVG} text='Cart is empty' />
            </>
          ) : (
            <>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}
              >
                <Link href='/productcatalog'>
                  <Button
                    variant='outlined'
                    color='primary'
                    sx={{
                      fontSize: '12px',
                      fontFamily: 'Poppins',
                      fontWeight: '600',
                    }}
                    startIcon={<AddIcon />}
                  >
                    {' '}
                    ADD ITEMS
                  </Button>
                </Link>
                <Link href='/productcatalog/placeorder'>
                  <Button
                    variant='outlined'
                    color='primary'
                    sx={{
                      fontSize: '12px',
                      fontFamily: 'Poppins',
                      fontWeight: '600',
                    }}
                  >
                    CHECKOUT
                  </Button>
                </Link>
              </Box>{' '}
              <Table
                sx={{
                  minWidth: 650,
                  borderRadius: '10px',
                  fontSize: '13px',
                }}
                arial-label='simple table'
              >
                <TableHead>
                  <TableRow sx={{ background: '#ededed' }}>
                    <TableCell
                      sx={{ borderRadius: '10px 0 0 0', fontFamily: 'Poppins' }}
                    >
                      Product
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins' }}>
                      <Box>INR</Box>
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins' }}>
                      <Box sx={{ ml: 4 }}>Quantity</Box>
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'Poppins' }}>
                      <Box>Total</Box>
                    </TableCell>
                    <TableCell
                      sx={{ borderRadius: '0 10px 0 0', fontFamily: 'Poppins' }}
                    >
                      Delete
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(() => {
                    if (basketitems[0] != undefined)
                      return basketitems.map((item, i) => {
                        if (item.attributes.product_id.data.id != undefined)
                          return (
                            <Tablerow
                              key={item.id}
                              product={item.attributes.product_id.data.id}
                              total_amount={item.attributes.total_amount}
                              order_quantity={item.attributes.order_quantity}
                              basketitems={basketitems[i]}
                              item_name={item.attributes.item_name}
                              selling_price={item.attributes.selling_price}
                              basketid={basketid}
                              tax_percentage={item.attributes.product_id.data.attributes.gst.slice(
                                -2
                              )}
                              setAmount={setAmount}
                              amount={amount}
                              setNet={setNet}
                              net={net}
                              setTax={setTax}
                              tax={tax}
                              deletecolumn={true}
                            />
                          );
                      });
                  })()}
                </TableBody>
              </Table>
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Box
                  sx={{
                    p: 2,
                    m: 2,
                    width: '62%',
                    fontSize: '12px',
                  }}
                >
                  <Typography
                    style={{
                      fontWeight: 600,
                      fontSize: '12px',
                    }}
                  >
                    NOTE: The Sub total calculated is without tax applied!
                  </Typography>
                </Box>
                <Box
                  sx={{
                    // borderRadius: '10px',
                    // borderRight: '5px solid #88c8bc',
                    width: '38%',
                    mt: 1,
                  }}
                >
                  <Table aria-label='simple table'>
                    <TableRow>
                      <TableCell
                        sx={{
                          p: 1,
                          m: 1,
                        }}
                      >
                        <Typography
                          style={{
                            fontWeight: 600,
                            fontSize: '14px',
                            // textAlign: 'end',
                          }}
                        >
                          SUBTOTAL
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          p: 1,
                          m: 1,
                        }}
                      >
                        <Typography
                          style={{
                            fontWeight: 600,
                            color: 'green',
                            fontSize: '14px',
                            // textAlign: 'end',
                          }}
                        >
                          ₹ {amount.toFixed(2)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </Table>

                  {/* {[56, 57, 58, 59].includes(
                parseInt(pincode.toString().slice(0, 2))
              ) ? (
                <GSTtax
                  taxPer={taxPer}
                  taxAmt={taxAmt}
                  css={{
                    p: 1,
                    m: 1,
                    fontSize: '13px',
                    fontFamily: 'Poppins',
                  }}
                />
              ) : (
                <IGSTtax
                  taxPer={taxPer}
                  taxAmt={taxAmt}
                  css={{
                    p: 1,
                    m: 1,
                    fontSize: '13px',
                    fontFamily: 'Poppins',
                  }}
                />
              )}

              <TableRow>
                <TableCell
                  sx={{
                    p: 1,
                    m: 1,
                    background: '#ededed',
                    fontSize: '13px',
                    fontFamily: 'Poppins',
                  }}
                >
                  Total
                </TableCell>
                <TableCell
                  sx={{
                    p: 1,
                    m: 1,
                    background: '#ededed',
                    fontSize: '13px',
                    fontFamily: 'Poppins',
                  }}
                >
                  ₹ {net.toFixed(2)}
                </TableCell>
              </TableRow> */}
                  {/* </Table> */}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </CommonLayout>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const cookies = req.cookies || null;
  let user_id = cookies.user_id;
  // let pincode = cookies.pincode;

  let total_amount = 0;
  let tax_amount = 0;
  let net_amount = 0;
  let taxObj = [];
  let amtObj = [];

  const basket = await getBaskets(user_id).catch((err) => err.response);
  const baskets = basket.data.data;

  if (basket.data.data.length === 0) {
    console.log('Empty Cart');
  } else {
    const basketitems = baskets[0].attributes.basket_items.data;

    basketitems.map((item) => {
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

    total_amount = basketitems.reduce(
      (acc, item) => acc + item.attributes.total_amount,
      0
    );
    tax_amount = basketitems.reduce(
      (acc, item) => acc + item.attributes.tax_amount,
      0
    );
    net_amount = basketitems.reduce(
      (acc, item) => acc + item.attributes.net_amount,
      0
    );
  }

  return {
    props: {
      baskets,
      total_amount,
      tax_amount,
      net_amount,
      taxObj,
      amtObj,
      // pincode,
    },
  };
}
