import axios from 'axios';
import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';

// export const strapi_url = 'https://api.fillokart.com';
export const strapi_url = 'http://localhost:1337';

const base = `${strapi_url}/api`;
const header = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const login_url = `${base}/auth/local`;
const catalog_url = `${base}/company-products`;
const category_url = `${base}/categories`;
const basket_url = `${base}/baskets`;
const basket_item_url = `${base}/basket-items`;
const address_url = `${base}/addresses`;
const order_address_url = `${base}/order-addresses`;
const payment_url = `${base}/payments`;
const order_url = `${base}/orders`;
const order_item_url = `${base}/order-items`;
const company_url = `${base}/companies`;
const reset_url = `${base}/password`;
const location_url = 'https://api.worldpostallocations.com/?postalcode=';
const invoice_url = `${base}/order-invoices`;
const email_query_url = `${base}/email-queries`;
const product_url = `${base}/products`;
const company_inventory_url = `${base}/company-inventories`;
const inventory_history_url = `${base}/inventory-histories`;
const inventory_history_item_url = `${base}/inventory-history-items`;
const transaction_url = `${base}/transactions`;
const client_payment_terms_url = `${base}/client-payment-terms`;

//GET Requests

export const getLocationFromPincode = (pincode) =>
  axios.get(`${location_url}${pincode}&countrycode=IN`);

export const getUser = (user) => axios.post(login_url, user);

export const getCatelog = (company_id) =>
  axios.get(`${catalog_url}?filters[company]=${company_id}&populate=*`);

export const getCategories = () => axios.get(category_url);

export const getBaskets = (user_id) =>
  axios.get(`${basket_url}?filters[user_id]=${user_id}`);

export const getBasketItems = () => axios.get(`${basket_item_url}`);

export const getAddresses = (company_id) =>
  axios.get(`${address_url}?filters[company]=${company_id}&populate=*`);

export const getAddressById = (id) => axios.get(`${address_url}/${id}`);

export const getOrderAddress = (company_id) =>
  axios.get(`${order_address_url}?filters[company]=${company_id}&populate=*`);

export const getOrder = (company_id, building, flag) =>
  flag === true
    ? axios.get(`${order_url}?filters[company]=${company_id}&populate=*`)
    : axios.get(
        `${order_url}?filters[company]=${company_id}&filters[order_address][addresses][building_name]=${building}&populate=*`
      );

export const getAllOrder = () => axios.get(order_url);

export const getOrderById = (user_id, pid) =>
  axios.get(`${order_url}/${pid}?filters[user_id]=${user_id}&populate=*`);

export const getCompany = (user_id) =>
  axios.get(`${company_url}?filters[user_ids]=${user_id}`);

export const getCompanyById = (company_id) =>
  axios.get(`${company_url}/${company_id}?populate=*`);

export const getOrderInvoices = (company_id, building, flag) =>
  flag === true
    ? axios.get(`${invoice_url}?filters[order][company]=${company_id}`)
    : axios.get(
        `${invoice_url}?filters[order][company]=${company_id}&filters[order][user_id][building]=${building}`
      );

export const getOrderInvoicesById = (company_id, pid) =>
  axios.get(`${invoice_url}/${pid}?filters[order][company]=${company_id}`);

export const getInvoiceExternally = (pid) => axios.get(`${invoice_url}/${pid}`);

export const getOrderExternally = (pid) => axios.get(`${order_url}/${pid}`);

export const getProductsById = (id) => axios.get(`${product_url}/${id}`);

export const getCompanyInventory = (company_id, building, flag) =>
  flag === true
    ? axios.get(`${company_inventory_url}?filters[company]=${company_id}`)
    : axios.get(
        `${company_inventory_url}?filters[company]=${company_id}&filters[user_id][building]=${building}`
      );

export const getInventoryHistory = (company_id, building) =>
  axios.get(
    `${inventory_history_url}?filters[company_id]=${company_id}&filters[user_id][building]=${building}&populate=*`
  );

export const getInventoryHistoryItems = (company_id, building) =>
  axios.get(
    `${inventory_history_item_url}?filters[inventory_history][company_id]=${company_id}&filters[inventory_history][user_id][building]=${building}`
  );

export const getTransactions = (company_id, building) =>
  axios.get(
    `${transaction_url}?filters[order_invoices][order][company]=${company_id}&filters[order_invoices][order][user_id][building]=${building}`
  );

export const readClientPayTerms = () => axios.get(client_payment_terms_url);

//POST Requests
export const postAddresses = (data) => axios.post(address_url, data, header);

export const postOrderAddress = (data) =>
  axios.post(order_address_url, data, header);

export const postPayments = (data) => axios.post(payment_url, data, header);

export const postOrders = (data) => axios.post(order_url, data, header);

export const postOrderItems = (data) =>
  axios.post(order_item_url, data, header);

export const postBasket = (data) => axios.post(basket_url, data, header);

export const postBasketItems = (data) =>
  axios.post(basket_item_url, data, header);

export const postResetPassword = (data) => axios.post(reset_url, data, header);

export const postEmailQuery = (data) =>
  axios.post(email_query_url, data, header);

export const postCompanyInventory = (data) =>
  axios.post(company_inventory_url, data, header);

export const postInventoryHistory = (data) =>
  axios.post(inventory_history_url, data, header);

export const postInventoryHistoryItems = (data) =>
  axios.post(inventory_history_item_url, data, header);

//UPDATE Requests
export const putOrderAddress = (address_id, data) =>
  axios.put(`${order_address_url}/${address_id}`, data, header);

export const putOrder = (order_id, data) =>
  axios.put(`${order_url}/${order_id}`, data, header);

export const putBasketItems = (item_id, data) =>
  axios.put(`${basket_item_url}/${item_id}`, data, header);

export const putBasket = (basket_id, data) =>
  axios.put(`${basket_url}/${basket_id}`, data, header);

export const putAddresses = (address_id, data) =>
  axios.put(`${address_url}/${address_id}`, data, header);

export const putCompanyInventory = (comp_inv_id, data) =>
  axios.put(`${company_inventory_url}/${comp_inv_id}`, data, header);

export const putOrderInvoices = (order_inv_id, data) =>
  axios.put(`${invoice_url}/${order_inv_id}`, data, header);

//DELETE Requests
export const delBasket = (basket_id) =>
  axios.delete(`${basket_url}/${basket_id}`, header);

export const delBasketItems = (basketItem_id) =>
  axios.delete(`${basket_item_url}/${basketItem_id}`, header);

export const delAddresses = (address_id) =>
  axios.delete(`${address_url}/${address_id}`, header);

//Extra
export const buttonColor = (status) => {
  switch (status) {
    case 'pending':
      return 'secondary';
    case 'confirmed':
      return 'primary';
    case 'cancelled':
      return 'error';
    case 'shipped':
      return 'info';
    case 'delivered':
      return 'success';
    case 'closed':
      return 'error';
    case 'partially_shipped':
      return 'warning';
    case 'partially_delivered':
      return 'success';
    default:
      return 'inherit';
  }
};

export const giveQuater = (quat) => {
  switch (true) {
    case quat < 4:
      return [1, 3];
    case quat < 7:
      return [4, 6];
    case quat < 10:
      return [7, 9];
    case quat < 13:
      return [10, 12];
    default:
      return [];
  }
};

export const encryptId = (str) => {
  const ciphertext = AES.encrypt(str, 'secretPassphrase');
  return encodeURIComponent(ciphertext.toString());
};

export const decryptId = (str) => {
  const decodedStr = decodeURIComponent(str);
  return AES.decrypt(decodedStr, 'secretPassphrase').toString(enc.Utf8);
};
