import React, { useEffect } from 'react';
import CommonLayout from '../../layouts/CommonLayout';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Grid } from '@mui/material';
import {
  delBasket,
  delBasketItems,
  encryptId,
  getAllOrder,
  getBaskets,
  getCompany,
  getOrder,
  getOrderAddress,
  postOrderItems,
  postOrders,
  postPayments,
  putOrder,
  putOrderAddress,
  readClientPayTerms,
} from '../../apiCalls/index';
const image = require('../../images/Rectangle.png');
import SubMenu from '../../components/submenu/SubMenu';

export default function payment({
  baskets,
  orderAddressess,
  company_id,
  user_id,
  companys,
  orders,
  allPaymentTerms,
}) {
  const [catagory, setCatagory] = useState(
    companys[0].attributes.payment_terms.data.id
  );
  let [orderNumber, setOrderNumber] = useState('');
  const [clicked, setClicked] = useState(false);
  const [emailSendTo, setEmailSendTo] = useState('');

  const router = useRouter();

  let order_id = '';
  let basket_id = '';
  let total_amount = 0;
  let tax_amount = 0;
  let net_amount = 0;
  let IdofOrder = '';

  let poNumber = localStorage.getItem('poNumber');

  let basket = '';
  let basketid = '';
  let basketitems = '';

  let orderIds = orders.map((ord) => {
    return ord.id;
  });

  let nextorderId = Math.max(...orderIds) + 1;

  if (baskets[0] != undefined) {
    basket = baskets;
    basketid = basket[0].id;

    basketitems = basket[0].attributes.basket_items.data;

    basketitems.map((basketitem) => {
      total_amount = total_amount + basketitem.attributes.total_amount;
      tax_amount = tax_amount + basketitem.attributes.tax_amount;
      net_amount = net_amount + basketitem.attributes.net_amount;
    });
  }

  const {
    attributes: {
      payment_terms: {
        data: {
          id: payterm_id,
          attributes: { term_name },
        },
      },
    },
  } = companys[0];

  // setCatagory(payterm_id)
  // let payTerm = '';

  // if (term_name === 'NET 15') {
  //   payTerm = 'Credit 15 Days';
  // } else if (term_name === 'NET 25') {
  //   payTerm = 'Credit 25 Days';
  // } else if (term_name === 'NET 30') {
  //   payTerm = 'Credit 30 Days';
  // } else if (term_name === 'NET 7') {
  //   payTerm = 'Credit 7 Days';
  // } else if (term_name === 'Due on Receipt') {
  //   payTerm = 'Due on receipt';
  // } else if (term_name === 'Advance Payment') {
  //   payTerm = 'Advance Payment';
  // }

  // const createPayment = async () => {
  //   let json = {
  //     payment_mode: catagory,
  //     company: company_id,
  //   };

  //   const newPayment = await postPayments(JSON.stringify({ data: json })).catch(
  //     (err) => err.response
  //   );
  //   return newPayment.data.data;
  // };

  let selected_user = [];
  let user = companys[0].attributes.user_ids.data;

  useEffect(() => {
    selected_user = user.filter((e) => e.id === JSON.parse(user_id));

    const selected_user_addr = selected_user[0].attributes.addresses.data.find(
      (address) => address.attributes.address_type === 'shipping_address'
    );
    if (selected_user[0].attributes.assign_role === 'super_admin') {
      setEmailSendTo(selected_user[0].attributes.email);
    } else if (selected_user[0].attributes.assign_role === 'Admin') {
      let super_admin_email = user.filter(
        (e) => e.attributes.assign_role === 'super_admin'
      );

      setEmailSendTo(
        super_admin_email[0].attributes.email +
          ' ' +
          selected_user[0].attributes.email
      );
    } else if (selected_user[0].attributes.assign_role === 'Executive') {
      let super_admin_email = user.filter(
        (e) => e.attributes.assign_role === 'super_admin'
      );

      let admin_email = user.filter((e) => {
        let shipaddr = e.attributes.addresses.data.find(
          (address) => address.attributes.address_type === 'shipping_address'
        );
        return (
          e.attributes.assign_role === 'Admin' &&
          shipaddr.attributes.building_name ===
            selected_user_addr.attributes.building_name
        );
      });

      if (admin_email.length === 0) {
        setEmailSendTo(
          super_admin_email[0].attributes.email +
            ' ' +
            selected_user[0].attributes.email
        );
      } else {
        setEmailSendTo(
          super_admin_email[0].attributes.email +
            ' ' +
            admin_email[0].attributes.email +
            ' ' +
            selected_user[0].attributes.email
        );
      }
    }
  }, [user_id]);

  const createOrder = async () => {
    orderNumber = 'BST1100060' + nextorderId.toString().padStart(3, '0');
    setOrderNumber(orderNumber);
    let date = new Date();

    let json = {
      company: company_id,
      order_number: orderNumber,
      po_number: poNumber === '' ? orderNumber : poNumber,
      order_address: orderAddressess[orderAddressess.length - 1].id,
      user_id: user_id,
      payment_terms: catagory,
      createdDate: date,
      send_email_to: emailSendTo,
    };

    const order = await postOrders(JSON.stringify({ data: json })).catch(
      (err) => err.response
    );
    IdofOrder = order.data.data.id;

    updateOrder(IdofOrder, total_amount, tax_amount, net_amount);

    if (orderAddressess[0].order == null) {
      updateOrderAddressess(IdofOrder, orderAddressess[0].id);
    }

    return IdofOrder;
  };

  const createOrderItems = async (
    orderId,
    item,
    total,
    tax,
    net,
    quantity,
    sel_price
  ) => {
    let json = {
      order: orderId,
      product_id: item,
      order_quantity: quantity,
      total_amount: total,
      tax_amount: tax,
      net_amount: net,
      selling_price: sel_price,
    };
    const orderItems = await postOrderItems(
      JSON.stringify({ data: json })
    ).catch((err) => err.response);
  };

  const deleteBasket = async () => {
    const deleteCart = await delBasket(basketid).catch((err) => err.response);
    return deleteCart.data.data.id;
  };

  const deleteItem = async (basketid, basketitemid) => {
    const singleItem = await delBasketItems(basketitemid).catch(
      (err) => err.response
    );
  };

  const updateOrderAddressess = async (orderId, ordA) => {
    let json = {
      order: orderId,
    };
    let addressess = ordA;
    const updateOrderAddress = await putOrderAddress(
      addressess,
      JSON.stringify({ data: json })
    ).catch((err) => err.response);
  };

  const updateOrder = async (IdofOrder, total, tax, net) => {
    let json = {
      total_amount: total,
      tax_amount: tax,
      net_amount: net,
    };

    const order = await putOrder(
      IdofOrder,
      JSON.stringify({ data: json })
    ).catch((err) => err.response);
  };

  const handleButtonClicked = () => {
    setClicked(true);
  };

  return (
    <CommonLayout>
      <Box>
        <SubMenu activeVal={2} />
      </Box>
      <Box sx={{ margin: '145px 30px 0 30px' }}>
        <Box>
          <Grid conatiner spacing={3}>
            <Grid item xs={12}>
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
              </Box>
            </Grid>
            <Grid container direction='row' justifyContent='center'>
              <Grid item>
                <Box
                  sx={{
                    p: 2,
                    marginTop: '60px',
                  }}
                >
                  <form
                    noValidate
                    autoComplete='off'
                    className='radio-payment-form'
                  >
                    <FormControl required>
                      <FormLabel sx={{ mb: 2, fontFamily: 'Poppins' }}>
                        {' '}
                        Select a Payment Method
                      </FormLabel>
                      <RadioGroup
                        defaultValue={catagory}
                        onChange={(e) => setCatagory(e.target.value)}
                      >
                        {/* {allPaymentTerms.map((t) => {
                          let displayText;

                          if (
                            t.attributes.term_name === 'Due on Receipt' ||
                            t.attributes.term_name === 'Advance Payment'
                          ) {
                            displayText = t.attributes.term_name.replace(
                              /_/g,
                              ' '
                            );
                          } else {
                            const days = t.attributes.term_name.match(/\d+/);
                            displayText = `${days} days credit`;
                          }
                          return (
                            <FormControlLabel
                              value={t.id}
                              control={<Radio color='primary' />}
                              label={displayText}
                              key={t.id}
                              // checked={false}
                              // checked={t.id === payterm_id}
                            ></FormControlLabel>
                          );
                        })} */}
                        <FormControlLabel
                          value='online payment'
                          control={<Radio color='primary' />}
                          label='Online Payment'
                          disabled
                        ></FormControlLabel>
                        <FormControlLabel
                          value={payterm_id}
                          control={<Radio color='primary' />}
                          label={term_name}
                          // checked={false}
                          // checked
                        ></FormControlLabel>
                      </RadioGroup>
                    </FormControl>
                  </form>
                </Box>
              </Grid>
              <Grid item>
                <img src={image} width='400px' alt='Loading' />
              </Grid>
            </Grid>

            <Grid item xs={12} align='center'>
              <Button
                variant='outlined'
                size='small'
                sx={{ m: 2, color: '#88c8bc', border: '1px solid #88c8bc' }}
                type='button'
                className='checkout-back'
                onClick={() => router.push('/productcatalog/placeorder')}
              >
                Back
              </Button>
              <Button
                variant='outlined'
                size='small'
                sx={{
                  m: 2,
                  background: '#88c8bc',
                  color: 'white',
                  border: 'none',
                }}
                className='checkout-next'
                type='submit'
                disabled={clicked}
                onClick={() => {
                  // createPayment();
                  handleButtonClicked();
                  if (baskets[0] != undefined) {
                    order_id = createOrder();

                    order_id.then(function (orderId) {
                      basketitems.map((basketitem) => {
                        createOrderItems(
                          orderId,
                          basketitem.attributes.product_id.data.id,
                          basketitem.attributes.total_amount,
                          basketitem.attributes.tax_amount,
                          basketitem.attributes.net_amount,
                          basketitem.attributes.order_quantity,
                          basketitem.attributes.selling_price
                        );
                      });
                    });

                    basket_id = deleteBasket();
                    basket_id
                      .then(function (basketId) {
                        basketitems.map((basketitem) => {
                          deleteItem(basketId, basketitem.id);
                        });
                      })
                      .then(() => {
                        router.push(
                          `/productcatalog/shipping?id=${encryptId(
                            orderNumber
                          )}`
                        );
                      });
                  }
                }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </CommonLayout>
  );
}

export async function getServerSideProps({ req }) {
  const cookies = req.cookies || null;
  let user_id = cookies.user_id;
  let company_id = cookies.company_id;

  const company = await getCompany(user_id).catch((err) => err.response);
  const companys = company.data.data;

  const basket = await getBaskets(user_id).catch((err) => err.response);
  const baskets = basket.data.data;

  const orderAddress = await getOrderAddress(company_id).catch(
    (err) => err.response
  );
  const orderAddressess = orderAddress.data.data;

  const order = await getAllOrder().catch((err) => err.response);
  const orders = order.data.data;

  const paymentTerm = await readClientPayTerms().catch((err) => err.response);
  const allPaymentTerms = paymentTerm.data.data;

  return {
    props: {
      baskets,
      orderAddressess,
      company_id,
      user_id,
      companys,
      orders,
      allPaymentTerms,
    },
  };
}
