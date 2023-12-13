import * as React from "react";
import { Button, Box } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Add } from "@material-ui/icons";
import { useRouter } from "next/router";
import {
  getBaskets,
  postBasket,
  postBasketItems,
  putBasket,
} from "../../apiCalls/index";

const useStyles = makeStyles({
  image: {
    width: 140,
    height: 120,
    mixBlendMode: "multiply",
    backgroundRepeat: "no-repeat!important",
    backgroundSize: "contain!important",
  },
});

export default function Itembox(props) {
  const classes = useStyles();
  toast.configure();

  const [user_id, setUser_id] = useState("");
  const [orderquantity, setOrderquantity] = useState("");
  const router = useRouter();
  let testamount = 0;
  let testnet = 0;
  let testtax = 0;

  React.useEffect(() => {
    let userdata = localStorage.getItem("userdata");
    if (userdata) {
      userdata = JSON.parse(userdata);
      setUser_id(userdata.id);
    }
  }, []);

  let basketid = "";
  let tax_amount = 0;

  const fetchCart = async () => {
    const basket = await getBaskets(user_id).catch((err) => err.response);
    const baskets = basket.data.data;

    if (baskets[0] == (undefined || null)) {
      return baskets.id;
    } else {
      return baskets[0].id;
    }
  };

  const createCart = async () => {
    const cartData = {
      user_id: user_id,
    };
    const newCart = await postBasket(JSON.stringify({ data: cartData })).catch(
      (err) => err.response
    );
    addToCart(newCart.data.data.id);
  };

  const addToCart = async (basketid) => {
    tax_amount =
      (props.percentage * (props.selling_price * orderquantity)) / 100;
    if (tax_amount < 1) {
      tax_amount = 0;
    }

    testamount = props.amount;
    testnet = props.net;
    testtax = props.tax;

    props.setAmount(testamount + props.selling_price * orderquantity);
    props.setTax(testtax + tax_amount);
    props.setNet(testnet + (tax_amount + props.selling_price * orderquantity));

    const cartUpdate = {
      product_id: props.item_id,
      basket: basketid,
      order_quantity: orderquantity,
      total_amount: props.selling_price * orderquantity,
      item_name: props.item_name,
      selling_price: props.selling_price,
      tax_amount: tax_amount,
      net_amount: tax_amount + props.selling_price * orderquantity,
      tax_percentage: props.percentage,
    };

    const basketdata = await getBaskets(props.user_id).catch(err => err.response);
    const itemIds = basketdata.data.data[0].attributes.basket_items.data.map((item) => {
      return item.attributes.product_id.data.id
    });


    if(!itemIds.includes(props.item_id)){
      if (orderquantity > 0 && Number.isInteger(+orderquantity)) {
        await postBasketItems(JSON.stringify({ data: cartUpdate })).catch(
          (err) => err.response
        );
  
        setOrderquantity("");
        toast.success("Added Successfully", {
          autoClose: 2000,
        });
  
        const amountData = {
          total_amount: testamount + props.selling_price * orderquantity,
          net_amount:
            testnet + (tax_amount + props.selling_price * orderquantity),
          tax_amount: testtax + tax_amount,
        };
        await putBasket(basketid, JSON.stringify({ data: amountData })).catch(
          (err) => err.response
        );
      } else {
        toast.error("Invalid Quantity", {
          autoClose: 1500,
        });
      }
    }else{
      toast.error("Ops!! Item is already in Basket", {
        autoClose: 1500,
      });
    }

 
  };

  return (
    <Box
      sx={{
        p: 2,
        m: 1,
        width: 200,
        borderRadius: "10px",
        boxShadow: "-1px -1px 46px 3px rgba(222,222,222,1)",
      }}
    >
      <Box sx={{ textAlign: "center", m: 1, p: 1 }}>
        <img src={`${props.image}`} className={classes.image} />
      </Box>
      <Box>
        <h6>INR {props.selling_price}</h6>
      </Box>
      <Box sx={{ fontWeight: "500", minHeight: "70px" }}>
        <p style={{ textAlign: "left", fontSize: "12px" }}>{props.item_name}</p>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: 0,
        }}
      >
        <input
          type="text"
          placeholder="Quantity"
          className="form-control"
          style={{ height: "35px", width: "100px" }}
          value={orderquantity}
          onChange={(e) => {
            setOrderquantity(e.target.value);
          }}
        />
        <Button
          sx={{
            borderRadius: "50%",
            background: "#34c946",
            minWidth: "0",
            width: "30px",
            height: "30px",
          }}
          variant="contained"
          onClick={() => {
            basketid = fetchCart();
            basketid
              .then(function (basketId) {
                if (basketId == (null || undefined)) {
                  createCart();
                } else {
                  addToCart(basketId);
                }
              })
              .then(() => {
                router.push("/productcatalog");
              });
          }}
        >
          <Add />
        </Button>
      </Box>
    </Box>
  );
}
