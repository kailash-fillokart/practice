import * as React from 'react';
import Button from '@mui/material/Button';
import CommonLayout from '../../layouts/CommonLayout';
import {
  getAddressById,
  getAddresses,
  getBaskets,
  getCompanyById,
  postOrderAddress,
} from '../../apiCalls/index';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableRow,
} from '@mui/material';
import router from 'next/router';
import SubMenu from '../../components/submenu/SubMenu';
import Tablerow from '../../components/basket/basket';
import GSTtax from '../../components/tax/gst';
import IGSTtax from '../../components/tax/igst';
import { Table, TableBody, TableCell, TableHead } from '@material-ui/core';

export default function DashboardContent({
  addresses,
  company_id,
  role,
  user_billingAddress,
  user_shippingAddress,
  baskets,
  total_amount,
  tax_amount,
  net_amount,
  taxObj,
  amtObj,
}) {
  const [ponumber, setPonumber] = React.useState('');
  const [values, setValues] = React.useState({
    bill: '',
    ship: '',
  });
  const [pincode, setPincode] = React.useState(values.bill);

  const Shipping_Address =
    role === 'super_admin'
      ? addresses.filter((adr) => {
          if (adr.attributes.address_type === 'shipping_address') {
            return adr;
          }
        })
      : [user_shippingAddress];

  const Billing_Address =
    role === 'super_admin'
      ? addresses.filter((adr) => {
          if (adr.attributes.address_type === 'billing_address') {
            return adr;
          }
        })
      : [user_billingAddress];

  React.useEffect(async () => {
    try {
      const billId = Billing_Address.map((e) => e.id);
      const shipId = Shipping_Address.map((e) => e.id);
      setValues({ ...values, bill: billId[0], ship: shipId[0] });
      const getpincode = await getAddressById(billId[0]);
      if (getpincode.data.error === undefined) {
        setPincode(getpincode.data.data.attributes.pincode);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleAddress = async (e) => {
    if (e.target.name === 'bill') {
      const getpincode = await getAddressById(e.target.value);
      if (getpincode.data.error === undefined) {
        setPincode(getpincode.data.data.attributes.pincode);
      }
    }
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  let addressessArrayids = Object.values(values);
  const createOrderAddressess = async (addAry) => {
    let json = {
      addresses: addAry,
      company: company_id,
    };
    localStorage.setItem('poNumber', ponumber);
    const newOrderAddress = await postOrderAddress(
      JSON.stringify({ data: json })
    ).catch((err) => err.response);
  };

  const [amount, setAmount] = React.useState(total_amount);
  const [net, setNet] = React.useState(net_amount);
  const [tax, setTax] = React.useState(tax_amount);

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

  let basket = '';
  let basketid = '';
  let basketitems = '';

  if (baskets[0] != undefined) {
    basket = baskets;
    basketid = basket[0].id;
    basketitems = basket[0].attributes.basket_items.data;
  }

  return (
    <CommonLayout>
      <Box>
        <SubMenu activeVal={1} />
      </Box>
      <Box sx={{ margin: '145px 30px 0 30px' }}>
        {/* <pre>{JSON.stringify(values,0,2)}</pre> */}
        <Box
          sx={{
            fontSize: '18px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p>fillOkart Trust {'&'} Safety Promise</p>
          <p style={{ fontSize: '13px' }}>
            Complete the following to ensure accurate routing and reporting of
            Your Order.
          </p>
          <input
            type='text'
            className='form-control'
            style={{ width: '300px' }}
            placeholder='Enter PO Number (Optional)'
            onChange={(e) => setPonumber(e.target.value)}
            value={ponumber}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mt: 4 }}>
          {role === 'super_admin' ? (
            <Box
              sx={{
                p: 2,
                m: 2,
                borderRadius: '6px',
                borderLeft: '5px solid #88c8bc',
                borderRight: '5px solid #88c8bc',
                width: '40%',
              }}
            >
              <Box sx={{ color: '#88c8bc', fontWeight: '600' }}>
                BILLING ADDRESS
              </Box>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id='simple-select-label'>Select</InputLabel>
                <Select
                  labelId='simple-select-label'
                  value={values.bill}
                  label='Select'
                  name='bill'
                  onChange={handleAddress}
                >
                  {Billing_Address.map((address) => {
                    const {
                      id,
                      attributes: {
                        address1,
                        address2,
                        city,
                        state,
                        pincode,
                        building_name,
                      },
                    } = address;

                    return (
                      <MenuItem sx={{ width: '100%' }} value={id} key={id}>
                        <p
                          style={{ whiteSpace: 'normal' }}
                        >{`${building_name}, ${address1}, ${address2}, ${city}, ${state} - ${pincode} `}</p>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          ) : (
            Billing_Address.map((address) => {
              const {
                id,
                attributes: {
                  address1,
                  address2,
                  city,
                  state,
                  pincode,
                  building_name,
                },
              } = address;
              return (
                <Box
                  key={id}
                  sx={{
                    p: 2,
                    m: 2,
                    borderRadius: '6px',
                    borderLeft: '5px solid #88c8bc',
                    borderRight: '5px solid #88c8bc',
                    width: '40%',
                  }}
                >
                  <Box sx={{ color: '#88c8bc', fontWeight: '600' }}>
                    BILLING ADDRESS
                  </Box>
                  <Box sx={{ fontSize: '14px' }}>
                    {`${building_name}, ${address1} ${address2} ${city}, ${state} - ${pincode} `}
                  </Box>
                </Box>
              );
            })
          )}

          {role === 'super_admin' ? (
            <Box
              sx={{
                p: 2,
                m: 2,
                borderRadius: '6px',
                borderLeft: '5px solid #88c8bc',
                borderRight: '5px solid #88c8bc',
                width: '40%',
              }}
            >
              <Box sx={{ color: '#88c8bc', fontWeight: '600' }}>
                SHIPPING ADDRESS
              </Box>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id='simple-select-label'>Select</InputLabel>
                <Select
                  labelId='simple-select-label'
                  value={values.ship}
                  label='Select'
                  name='ship'
                  onChange={handleAddress}
                >
                  {Shipping_Address.map((address) => {
                    const {
                      id,
                      attributes: {
                        address1,
                        address2,
                        city,
                        state,
                        pincode,
                        building_name,
                      },
                    } = address;
                    return (
                      <MenuItem sx={{ width: '100%' }} value={id} key={id}>
                        <p
                          style={{ whiteSpace: 'normal' }}
                        >{`${building_name}, ${address1} ${address2} ${city}, ${state} - ${pincode} `}</p>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          ) : (
            Shipping_Address.map((address) => {
              const {
                id,
                attributes: {
                  address1,
                  address2,
                  city,
                  state,
                  pincode,
                  building_name,
                },
              } = address;
              return (
                <Box
                  key={id}
                  sx={{
                    p: 2,
                    m: 2,
                    borderRadius: '6px',
                    borderLeft: '5px solid #88c8bc',
                    borderRight: '5px solid #88c8bc',
                    width: '40%',
                  }}
                >
                  <Box sx={{ color: '#88c8bc', fontWeight: '600' }}>
                    SHIPPING ADDRESS
                  </Box>
                  <Box sx={{ fontSize: '14px' }}>
                    {`${building_name}, ${address1} ${address2} ${city}, ${state} - ${pincode} `}
                  </Box>
                </Box>
              );
            })
          )}
        </Box>
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
                        deletecolumn={false}
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
            <h6>
              Terms {'&'} Conditions E.{'&'} O.E.
            </h6>
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
              borderRight: '5px solid #88c8bc',
              width: '38%',
            }}
          >
            <Table aria-label='simple table'>
              <TableRow>
                <TableCell
                  sx={{ p: 1, m: 1, fontSize: '13px', fontFamily: 'Poppins' }}
                >
                  Sub Total
                </TableCell>
                <TableCell
                  sx={{ p: 1, m: 1, fontSize: '13px', fontFamily: 'Poppins' }}
                >
                  ₹ {amount.toFixed(2)}
                </TableCell>
              </TableRow>

              {[56, 57, 58, 59].includes(
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
              </TableRow>
            </Table>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            variant='outlined'
            size='small'
            sx={{ m: 2, color: '#88c8bc', border: '1px solid #88c8bc' }}
            onClick={() => router.push('/productcatalog/basket')}
            className='checkout-back'
          >
            Back
          </Button>
          <Button
            variant='outlined'
            size='small'
            sx={{ m: 2, background: '#88c8bc', color: 'white', border: 'none' }}
            className='checkout-next'
            onClick={() => {
              let orderAddId = createOrderAddressess(addressessArrayids);
              orderAddId.then(() => {
                router.push('/productcatalog/payment');
              });
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </CommonLayout>
  );
}

export async function getServerSideProps({ req }) {
  const cookies = req.cookies || null;
  let company_id = cookies.company_id;
  let building = cookies.building;
  let role = cookies.user_role;
  let currUserId = cookies.user_id;

  let flag;

  if (role === 'super_admin') {
    flag = true;
  }

  const address = await getAddresses(company_id).catch((err) => err.response);
  const addresses = address.data.data;

  const user_addresses = await getCompanyById(company_id).catch(
    (err) => err.response
  );
  const {
    attributes: {
      user_ids: { data: userdata },
    },
  } = user_addresses.data.data;

  const currUser = userdata.find((user) => user.id === Number(currUserId));

  const user_billingAddress = currUser.attributes.addresses.data.find(
    (address) => address.attributes.address_type === 'billing_address'
  );
  const user_shippingAddress = currUser.attributes.addresses.data.find(
    (address) => address.attributes.address_type === 'shipping_address'
  );

  let total_amount = 0;
  let tax_amount = 0;
  let net_amount = 0;
  let taxObj = [];
  let amtObj = [];

  const basket = await getBaskets(currUserId).catch((err) => err.response);
  const baskets = basket.data.data;

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

  return {
    props: {
      addresses,
      company_id,
      building,
      role,
      user_billingAddress,
      user_shippingAddress,
      baskets,
      total_amount,
      tax_amount,
      net_amount,
      taxObj,
      amtObj,
    },
  };
}
