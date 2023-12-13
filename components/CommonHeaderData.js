import NotificationsActiveOutlinedIcon from "@material-ui/icons/NotificationsActiveOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";

export const CommonHeaderData = [
  {
    title: "Basket",
    icon: <ShoppingCartOutlinedIcon style={{ fontSize: 35 }} />,
    link: "/productcatalog/basket",
  },
  {
    title: "Notification",
    icon: <NotificationsActiveOutlinedIcon style={{ fontSize: 35 }} />,
  },
  {
    title: "Account",
    icon: <AccountCircle style={{ fontSize: 35 }} />,
  },
];
