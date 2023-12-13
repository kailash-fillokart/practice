import * as React from 'react';
import CommonLayout from '../../layouts/CommonLayout';
import Itembox from '../../components/products/product';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import {
  getBaskets,
  getCategories,
  getCatelog,
  getCompanyById,
} from '../../apiCalls/index';
import { Box } from '@mui/material';
const coming_soon = require('../../components/products/coming_soon.jpg');

export default function Dashboard({
  companyProducts,
  cname,
  basketItemLength,
  user_shippingAddress,
}) {
  const [category_id, setCategory_id] = React.useState('All');
  const [amount, setAmount] = React.useState(0);
  const [net, setNet] = React.useState(0);
  const [tax, setTax] = React.useState(0);
  const [productItem, setProductItem] = useState(companyProducts);

  let company_id = '';
  let user_id = '';

  let userdata = localStorage.getItem('userdata');

  if (userdata) {
    userdata = JSON.parse(userdata);
    company_id = userdata.company_id;
    user_id = userdata.id;
  }

  const handleSearch = (e) => {
    let target = e.target;
    if (target.value == '') return setProductItem(companyProducts);
    else
      return setProductItem(
        companyProducts.filter((x) =>
          x.attributes.product_id.data.attributes.name
            .toLowerCase()
            .includes(target.value)
        )
      );
  };

  let image;

  return (
    <>
      <CommonLayout itemCount={basketItemLength}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '0 30px 10px 30px',
          }}
        >
          <FormControl sx={{ width: 300 }}>
            <InputLabel>Categories</InputLabel>
            <Select
              labelId='demo-multiple-name-label'
              id='demo-multiple-name'
              size='small'
              value={category_id}
              sx={{
                lineHeight: '30px',
                background: 'white',
                borderRadius: '10px',
                height: '35px',
              }}
              onChange={(e) => {
                setCategory_id(e.target.value);
              }}
              input={<OutlinedInput label='Categories' />}
            >
              {cname.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Paper
            component='form'
            sx={{
              display: 'flex',
              alignItems: 'right',
              width: '330px',
              border: '1px solid #cfcccc',
              boxShadow: '0 0 0 0',
              height: '35px',
              borderRadius: '10px',
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder='Search Products'
              onChange={handleSearch}
            />
            <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          {(() => {
            if (category_id != undefined)
              return productItem
                .filter(
                  (ite) =>
                    ite.attributes.address.data.attributes.building_name ===
                    user_shippingAddress.attributes.building_name
                )
                .map((product, i) => {
                  const {
                    id,
                    attributes: {
                      sell_price,
                      product_id: {
                        data: {
                          id: item_id,
                          attributes: {
                            name,
                            gst,
                            image: { data: imageArray },
                            category: {
                              data: {
                                attributes: { name: cat_name },
                              },
                            },
                          },
                        },
                      },
                    },
                  } = product;

                  if (imageArray === null) {
                    image = coming_soon;
                  } else {
                    image = imageArray[0].attributes.url;
                  }

                  if (category_id == 'All')
                    return (
                      <Itembox
                        key={id}
                        selling_price={sell_price}
                        item_id={item_id}
                        item_name={name}
                        percentage={gst.slice(-2)}
                        image={image}
                        setAmount={setAmount}
                        amount={amount}
                        setNet={setNet}
                        net={net}
                        setTax={setTax}
                        tax={tax}
                        user_id={user_id}
                      />
                    );
                  else if (category_id === cat_name)
                    return (
                      <Itembox
                        key={id}
                        selling_price={sell_price}
                        item_id={item_id}
                        item_name={name}
                        percentage={gst.slice(-2)}
                        image={image}
                        setAmount={setAmount}
                        amount={amount}
                        setNet={setNet}
                        net={net}
                        setTax={setTax}
                        tax={tax}
                        user_id={user_id}
                      />
                    );
                  else return '';
                });
          })()}
        </Box>
      </CommonLayout>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const cookies = req.cookies || null;
  let company_id = cookies.company_id;
  let user_id = cookies.user_id;

  const companyProduct = await getCatelog(company_id).catch(
    (err) => err.response
  );
  const companyProducts = companyProduct.data.data;

  const category = await getCategories().catch((err) => err.response);
  const categories = category.data.data;

  const basketItem = await getBaskets(user_id).catch((err) => err.response);

  const basketItems = basketItem.data.data;
  const basketItemLength =
    basketItems.length === 0
      ? 0
      : basketItems[0].attributes.basket_items.data.length;

  let cname = categories.map((cat) => {
    return cat.attributes.name;
  });
  cname.unshift('All');

  const user_addresses = await getCompanyById(company_id).catch(
    (err) => err.response
  );
  let currUserId = cookies.user_id;

  const {
    attributes: {
      user_ids: { data: userdata },
    },
  } = user_addresses.data.data;
  const currUser = userdata.find((user) => user.id === Number(currUserId));
  const user_shippingAddress = currUser.attributes.addresses.data.find(
    (address) => address.attributes.address_type === 'shipping_address'
  );
  return {
    props: {
      companyProducts,
      cname,
      basketItemLength,
      user_shippingAddress,
      basketItems,
    },
  };
}
