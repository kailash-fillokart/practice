import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from '@material-ui/core';
import img1 from '../../components/products/coming_soon.jpg';
import CommonLayout from '../../layouts/CommonLayout';
import Carousel from 'react-multi-carousel';
import { Image } from 'semantic-ui-react';
import {
  getCompany,
  getOrder,
  getProductsById,
  giveQuater,
} from '../../apiCalls';
import { Box } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Legend,
  Title,
} from 'devextreme-react/chart';

import PieChart, {
  Tooltip,
  Format,
  Label,
  Connector,
  Size,
  CommonAnnotationSettings,
} from 'devextreme-react/pie-chart';
import { useEffect } from 'react';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const useStyles = makeStyles({
  boxitem: {
    textAlign: 'center',
    paddingTop: '5px',
    color: 'white',
  },
  boxitemtext: {
    textAlign: 'center',
    color: 'white',
  },
  hover: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

function DashboardContent({
  company,
  pendingArr,
  shippedArr,
  deliveredArr,
  cancelledArr,
  confirmedArr,
  partiallyDeliveredArr,
  partiallyShippedArr,
}) {
  const classes = useStyles();
  const [topItems, setTopItems] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState(deliveredArr);
  const [catState, setCatState] = useState('');

  let pendingOrder = pendingArr.length;
  let shippedOrder = shippedArr.length;
  let deliveredOrder = deliveredArr.length;
  let cancelledOrder = cancelledArr.length;
  let confirmedOrder = confirmedArr.length;
  let partially_shippedOrder = partiallyShippedArr.length;
  let partially_deliveredOrder = partiallyDeliveredArr.length;
  let sum =
    pendingOrder +
    shippedOrder +
    deliveredOrder +
    cancelledOrder +
    confirmedOrder +
    partially_shippedOrder +
    partially_deliveredOrder;

  // console.log(filteredOrders);

  const calculateCategories = (arr) => {
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

  const calc = [];
  const calcQuanitty = [];

  filteredOrders.map((data) => {
    const {
      attributes: {
        order_items: { data: orderItems },
      },
    } = data;

    orderItems.map((items) => {
      const {
        attributes: {
          net_amount,
          order_quantity,
          product_id: {
            data: {
              id: product_id,
              attributes: {
                category: {
                  data: {
                    attributes: { name: cat_name },
                  },
                },
              },
            },
          },
        },
      } = items;
      calc.push({
        [cat_name]: net_amount,
      });
      calcQuanitty.push({
        [product_id]: order_quantity,
      });
    });
  });

  const calcCat = calculateCategories(calc);
  const calcQnt = calculateCategories(calcQuanitty);

  calcCat['state'] = catState;

  var outputItems = Object.entries(calcQnt).map(([key, value]) => ({
    key,
    value,
  }));

  useEffect(() => {
    try {
      const fetchData = () => {
        const arr = [];
        const items = outputItems.map(async (e) => {
          const { data } = await getProductsById(e['key']).catch(
            (err) => err.response
          );
          data.data['quantity'] = e['value'];
          arr.push(data.data);
        });
        Promise.all(items).then(() => {
          let sortedQuantity = arr.sort((a, b) => {
            return b.quantity - a.quantity;
          });
          setTopItems(sortedQuantity);
        });
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const dataSource =
    filteredOrders.length !== 0
      ? [calcCat].map((data) => {
          const {
            Assets,
            Housekeeping,
            'Industrial Tools & Equipments': Industrial,
            Pantry,
            Stationery,
            state,
          } = data;
          return {
            Assets,
            Housekeeping,
            Pantry,
            Stationery,
            Industrial,
            state,
          };
        })
      : [
          {
            Assets: 0,
            Housekeeping: 0,
            'Industrial Tools & Equipments': 0,
            Pantry: 0,
            Stationery: 0,
            state: 'Not Available',
          },
        ];

  const populationByRegions = [
    {
      region: 'Pending',
      val: pendingOrder / sum,
    },
    {
      region: 'Shipped',
      val: shippedOrder / sum,
    },
    {
      region: 'Delivered',
      val: deliveredOrder / sum,
    },
    {
      region: 'Cancelled',
      val: cancelledOrder / sum,
    },
    {
      region: 'Confirmed',
      val: confirmedOrder / sum,
    },
    {
      region: 'Partially Shipped',
      val: partially_shippedOrder / sum,
    },
    {
      region: 'Partially Delivered',
      val: partially_deliveredOrder / sum,
    },
  ];

  const pointClickHandler = (e) => {
    e.target.select();
  };

  let image;
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();

  const handleChange = (e) => {
    const { value } = e.target;
    let current_month = JSON.parse(currentMonth);
    let current_year = JSON.parse(currentYear);
    if (value === 'this_month') {
      const filterData = deliveredArr.filter((data) => {
        const {
          attributes: { createdDate },
        } = data;
        const created_month = JSON.parse(+createdDate.slice(5, 7));
        return created_month === current_month;
      });
      setFilteredOrders(filterData);
      setCatState(currentMonth);
    } else if (value === 'this_quater') {
      const getQuater = giveQuater(current_month);
      const filterData = deliveredArr.filter((data) => {
        const {
          attributes: { createdDate: month },
        } = data;
        const created_month = JSON.parse(+month.slice(5, 7));
        return created_month >= getQuater[0] && created_month <= getQuater[1];
      });
      setFilteredOrders(filterData);
    } else if (value === 'prev_quater') {
      let getQuater =
        current_month < 4 ? giveQuater(12) : giveQuater(current_month - 3);
      const filterData = deliveredArr.filter((data) => {
        const {
          attributes: { createdDate: month },
        } = data;
        const created_month = JSON.parse(+month.slice(5, 7));
        return created_month >= getQuater[0] && created_month <= getQuater[1];
      });
      setFilteredOrders(filterData);
    } else if (value === 'this_year') {
      const filterData = deliveredArr.filter((data) => {
        const {
          attributes: { createdDate: month },
        } = data;
        const created_year = JSON.parse(+month.slice(0, 4));
        return created_year === current_year;
      });
      setFilteredOrders(filterData);
      setCatState(currentYear);
    } else if (value === 'prev_year') {
      const filterData = deliveredArr.filter((data) => {
        const {
          attributes: { createdDate: month },
        } = data;
        const created_year = JSON.parse(+month.slice(0, 4));
        return created_year === current_year - 1;
      });
      setFilteredOrders(filterData);
      setCatState(currentYear - 1);
    }
  };

  return (
    <CommonLayout comp={company}>
      <Container>
        <Box>
          <div>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Link href={`/pendingAproval`}>
                <div
                  className={classes.hover}
                  style={{
                    borderRadius: '10px',
                    width: '230px',
                    height: '100px',
                    background: 'linear-gradient(90deg,#ffbf96,#fe7096)',
                    margin: '5px',
                  }}
                >
                  <Typography className={classes.boxitem} variant='h3'>
                    {pendingOrder}
                  </Typography>
                  <Typography
                    className={classes.boxitemtext}
                    variant='subtitle1'
                  >
                    Pending Approval
                  </Typography>
                </div>
              </Link>
              <Link href={`/purchaseorder?status=shipped`}>
                <div
                  className={classes.hover}
                  style={{
                    borderRadius: '10px',
                    width: '230px',
                    height: '100px',
                    margin: '5px',
                    background:
                      'radial-gradient( circle farthest-corner at 12.3% 19.3%,  rgba(85,88,218,1) 0%, rgba(95,209,249,1) 100.2% )',
                  }}
                >
                  <Typography className={classes.boxitem} variant='h3'>
                    {shippedOrder}
                  </Typography>
                  <Typography
                    className={classes.boxitemtext}
                    variant='subtitle1'
                  >
                    Shipped
                  </Typography>
                </div>
              </Link>
              <Link href={`/purchaseorder?status=delivered`}>
                <div
                  className={classes.hover}
                  style={{
                    borderRadius: '10px',
                    width: '230px',
                    height: '100px',
                    background:
                      'linear-gradient(to right, rgb(182, 244, 146), rgb(51, 139, 147))',
                    margin: '5px',
                  }}
                >
                  <Typography className={classes.boxitem} variant='h3'>
                    {deliveredOrder}
                  </Typography>
                  <Typography
                    className={classes.boxitemtext}
                    variant='subtitle1'
                  >
                    Delivered
                  </Typography>
                </div>
              </Link>
              <Link href={`/purchaseorder?status=cancelled`}>
                <div
                  className={classes.hover}
                  style={{
                    borderRadius: '10px',
                    width: '230px',
                    height: '100px',
                    background:
                      'linear-gradient( 112.7deg,  rgba(162,247,241,1) 0.3%, rgba(199,146,255,1) 88.7% )',
                    margin: '5px',
                  }}
                >
                  <Typography className={classes.boxitem} variant='h3'>
                    {cancelledOrder}
                  </Typography>
                  <Typography
                    className={classes.boxitemtext}
                    variant='subtitle1'
                  >
                    Cancelled
                  </Typography>
                </div>
              </Link>
            </Box>
          </div>
          <Box
            sx={{
              p: 2,
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 18px 50px -10px',
              borderRadius: '10px',
              mt: 2,
            }}
          >
            <Box sx={{ maxWidth: '145px', float: 'right' }}>
              <select className='form-select' onChange={handleChange}>
                <option value='this_month'>This Month</option>
                <option value='this_quater'>This Quater</option>
                <option value='prev_quater'>Previous Quater</option>
                <option value='this_year'>This Year</option>
                <option value='prev_year'>Previous Year</option>
              </select>
            </Box>
            <Chart
              id='chart'
              palette='Soft'
              dataSource={dataSource}
              className='chart-style'
            >
              <CommonSeriesSettings
                argumentField='state'
                type='bar'
                barPadding={0.5}
              />
              <Series valueField='Pantry' name='Pantry' />
              <Series valueField='Housekeeping' name='Housekeeping' />
              <Series valueField='Stationery' name='Stationary' />
              <Series valueField='Assets' name='Assets' />
              <Series valueField='Industrial' name='Industrial' />
              <Legend verticalAlignment='bottom' horizontalAlignment='center' />
              <Title text='Categories Spend' />
            </Chart>
          </Box>
          <Box sx={{ display: 'flex', mt: 4, mb: 4 }}>
            <Box
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 18px 50px -10px',
                borderRadius: '10px',
                mr: 1,
                width: '50%',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: '15px',
                    marginTop: '10px',
                    textAlign: 'center',
                  }}
                >
                  Top 10 Purchased Items
                </p>
              </div>
              <Carousel itemClass='image-item' responsive={responsive}>
                {topItems.slice(0, 10).map((value, index) => {
                  const {
                    attributes: {
                      image: { data: imageArray },
                    },
                  } = value;
                  if (imageArray === null) {
                    image = img1;
                  } else {
                    image = imageArray[0].attributes.url;
                  }
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '300px',
                      }}
                    >
                      <Box sx={{ mb: 5 }}>
                        <Image
                          draggable={false}
                          style={{ width: '100%', height: '150px' }}
                          src={image}
                        />
                      </Box>
                      <Box
                        sx={{
                          height: '160px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        <h6
                          style={{
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            fontFamily: 'Poppins',
                          }}
                        >
                          {value.attributes.name}
                        </h6>
                        <h3
                          style={{
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            fontFamily: 'Poppins',
                          }}
                        >
                          {value.quantity}{' '}
                          {value.attributes.unit.data.attributes.name}{' '}
                        </h3>
                      </Box>
                    </Box>
                  );
                })}
              </Carousel>
            </Box>
            <Box
              sx={{
                p: 2,
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 18px 50px -10px',
                borderRadius: '10px',
                ml: 1,
                width: '50%',
              }}
            >
              <PieChart
                id='pie'
                type='doughnut'
                title='Order Status Statistics'
                palette='Soft Pastel'
                dataSource={populationByRegions}
                onPointClick={pointClickHandler}
              >
                <CommonAnnotationSettings diameter={100} />
                <Size height={400} width={500} />
                <Series
                  argumentField='region'
                  hoverStyle={{ hatching: 'none' }}
                  selectionStyle={{
                    hatching: 'none',
                    border: { visible: 'true', width: 10 },
                  }}
                >
                  <Label visible={true} position='inside' format='percent'>
                    <Connector visible={true} />
                  </Label>
                </Series>
                <Legend
                  margin={0}
                  horizontalAlignment='right'
                  verticalAlignment='top'
                />
                <Tooltip enabled={true}>
                  <Format type='percent' />
                </Tooltip>
              </PieChart>
            </Box>
          </Box>
        </Box>
      </Container>
    </CommonLayout>
  );
}

export default function Dashboard({
  companies,
  pendingArr,
  shippedArr,
  deliveredArr,
  cancelledArr,
  confirmedArr,
  partiallyShippedArr,
  partiallyDeliveredArr,
}) {
  return (
    <DashboardContent
      company={companies[0]}
      pendingArr={pendingArr}
      shippedArr={shippedArr}
      deliveredArr={deliveredArr}
      cancelledArr={cancelledArr}
      confirmedArr={confirmedArr}
      partiallyShippedArr={partiallyShippedArr}
      partiallyDeliveredArr={partiallyDeliveredArr}
    />
  );
}

export async function getServerSideProps({ req }) {
  const cookies = req.cookies || null;
  let user_id = cookies.user_id;
  let company_id = cookies.company_id;
  let building = cookies.building;

  let role = cookies.user_role;
  let flag;

  if (role === 'super_admin') {
    flag = true;
  }

  const company = await getCompany(user_id).catch((err) => err.response);
  const companies = company.data.data;

  const order = await getOrder(company_id, building, flag).catch(
    (err) => err.response
  );
  const orders = order.data.error ? [] : order.data.data;

  const pendingArr = orders.filter((orders) => {
    return orders.attributes.order_status === 'pending';
  });

  const shippedArr = orders.filter((orders) => {
    return orders.attributes.order_status === 'shipped';
  });

  const deliveredArr = orders.filter((orders) => {
    return orders.attributes.order_status === 'delivered';
  });

  const cancelledArr = orders.filter((orders) => {
    return orders.attributes.order_status === 'cancelled';
  });

  const confirmedArr = orders.filter((orders) => {
    return orders.attributes.order_status === 'confirmed';
  });

  const partiallyShippedArr = orders.filter((orders) => {
    return orders.attributes.order_status === 'partially_shipped';
  });

  const partiallyDeliveredArr = orders.filter((orders) => {
    return orders.attributes.order_status === 'partially_delivered';
  });

  return {
    props: {
      companies,
      pendingArr,
      shippedArr,
      deliveredArr,
      cancelledArr,
      confirmedArr,
      partiallyShippedArr,
      partiallyDeliveredArr,
    },
  };
}
