import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  delBasketItems,
  putBasket,
  putBasketItems,
} from '../../apiCalls/index';
import { TableCell, TableRow } from '@material-ui/core';

export default function Tablerow(props) {
  const [quantity, setQuantity] = React.useState(props.order_quantity);
  const [totalamount, setTotalamount] = React.useState(props.total_amount);
  const [baketItems, setBasketItems] = React.useState(props.basketitems);
  let basket_id = props.basketid;
  let tax_amount = 0;

  const updateQuantity = (action) => {
    if (action == 'increase') {
      if (quantity < 99999) {
        setQuantity(parseInt(quantity) + 1);
        setTotalamount(
          (parseInt(quantity) + 1) * parseInt(props.selling_price)
        );
      }
    }
    if (action == 'reduce') {
      if (quantity > 1) {
        setQuantity(Math.max(parseInt(quantity) - 1, -99999));
        setTotalamount(
          Math.max(parseInt(quantity) - 1, -99999) *
            parseInt(props.selling_price)
        );
      }
    }
  };

  const quantityIncreased = async (totalamount, item_id) => {
    tax_amount =
      (props.tax_percentage * (props.selling_price * (quantity + 1))) / 100;
    if (tax_amount < 1) {
      tax_amount = 1;
    }

    props.setAmount(props.amount + props.selling_price);

    const cartUpdate = {
      order_quantity: parseInt(quantity) + 1,
      total_amount: parseInt(totalamount + props.selling_price),
      tax_amount: tax_amount,
      net_amount: tax_amount + props.selling_price * (quantity + 1),
    };

    const updateItem = await putBasketItems(
      item_id,
      JSON.stringify({ data: cartUpdate })
    ).catch((err) => err.response);

    props.setAmount(
      props.amount + updateItem.data.data.attributes.selling_price
    );

    const updateCart = {
      total_amount: props.amount + props.selling_price,
    };

    const updateBasket = await putBasket(
      basket_id,
      JSON.stringify({ data: updateCart })
    ).catch((err) => err.response);
  };

  const quantityDecreased = async (totalamount, item_id) => {
    tax_amount =
      (props.tax_percentage * (props.selling_price * (quantity + 1))) / 100;
    if (tax_amount < 1) {
      tax_amount = 1;
    }

    if (!(quantity > 1)) {
      return;
    }

    const cartUpdate = {
      order_quantity: parseInt(quantity - 1),
      total_amount: parseInt(totalamount - props.selling_price),
      tax_amount: tax_amount,
      net_amount: tax_amount + props.selling_price * (quantity + 1),
    };

    const updateItem = await putBasketItems(
      item_id,
      JSON.stringify({ data: cartUpdate })
    ).catch((err) => err.response);

    props.setAmount(
      props.amount - updateItem.data.data.attributes.selling_price
    );

    const updateCart = {
      total_amount: props.amount + props.selling_price,
    };

    const updateBasket = await putBasket(
      basket_id,
      JSON.stringify({ data: updateCart })
    ).catch((err) => err.response);
  };

  const deleteItem = async (basketitemid) => {
    const singleItem = await delBasketItems(basketitemid).catch(
      (err) => err.response
    );
    const { selling_price, order_quantity } = singleItem.data.data.attributes;
    setBasketItems('');
    props.setAmount(props.amount - selling_price * order_quantity);

    const updateCart = {
      total_amount: props.amount + props.selling_price,
    };

    const updateBasket = await putBasket(
      basket_id,
      JSON.stringify({ data: updateCart })
    ).catch((err) => err.response);
  };

  if (baketItems != '')
    return (
      <>
        <TableRow sx={{ background: 'white' }}>
          <TableCell
            sx={{ fontSize: '12px', p: 1, m: 1, fontFamily: 'Poppins' }}
          >
            {baketItems.attributes.item_name}
          </TableCell>
          <TableCell
            sx={{
              currency: 'INR',
              fontSize: '12px',
              p: 1,
              m: 1,
              fontFamily: 'Poppins',
            }}
          >
            ₹ {baketItems.attributes.selling_price.toFixed(2)}
          </TableCell>
          <TableCell
            sx={{
              fontSize: '12px',
              p: 1,
              m: 1,
              fontFamily: 'Poppins',
            }}
          >
            {props.deletecolumn ? (
              <ButtonGroup size='small'>
                <Button
                  aria-label='reduce'
                  onClick={() => {
                    updateQuantity('reduce');
                    quantityDecreased(totalamount, baketItems.id);
                  }}
                >
                  <RemoveIcon fontSize='small' />
                </Button>
                <Button sx={{ fontSize: '12px' }}>{quantity}</Button>
                <Button
                  aria-label='increase'
                  onClick={() => {
                    updateQuantity('increase');
                    quantityIncreased(totalamount, baketItems.id);
                  }}
                >
                  <AddIcon fontSize='small' />
                </Button>
              </ButtonGroup>
            ) : (
              <p style={{ marginLeft: '3.2rem' }}>{quantity}</p>
            )}
          </TableCell>
          <TableCell
            sx={{ fontSize: '12px', p: 1, m: 1, fontFamily: 'Poppins' }}
          >
            ₹ {totalamount.toFixed(2)}
          </TableCell>

          {props.deletecolumn ? (
            <TableCell
              sx={{ fontSize: '12px', p: 1, m: 1, fontFamily: 'Poppins' }}
            >
              <IconButton
                aria-label='delete'
                size='medium'
                onClick={() => {
                  deleteItem(baketItems.id);
                }}
              >
                <DeleteIcon fontSize='inherit' />
              </IconButton>
            </TableCell>
          ) : null}
        </TableRow>
      </>
    );
  else return '';
}
