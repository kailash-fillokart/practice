import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import SettingsApplicationsRoundedIcon from "@material-ui/icons/SettingsApplicationsRounded";
import { Assignment, EventAvailable, Inventory, Receipt, ShoppingBagOutlined, ShoppingCartCheckoutRounded } from "@mui/icons-material";

export const SideBarData = [
  {
    title: "Dashboard",
    icon: <HomeOutlinedIcon />,
    link: "/dashboard"
  },

  {
    title: "Product Catalog",
    icon: <ShoppingBagOutlined />,
    link: "/productcatalog"
  },
  {
    title: "Purchase Order",
    icon: <ShoppingCartCheckoutRounded/>,
    link: "/purchaseorder"
  },
  {
    title: "Pending Approval",
    icon: <EventAvailable/>,
    link: "/pendingAproval"
  },
  {
    title: "Invoices",
    icon: <Receipt/>,
    link: "/invoices"
  },
  {
    title: "Reports & Analysis",
    icon: <AssessmentOutlinedIcon />,
    link: "/report"
  },
  {
    title: "Inventory",
    icon: <Inventory/>,
    link: "/inventory"
  },
  {
    title: "Settings",
    icon: <SettingsApplicationsRoundedIcon />,
    link: "/settings"
  },
  {
    title: "Agreement",
    icon: <Assignment/>,
    link: "/agreement",
  }
];
