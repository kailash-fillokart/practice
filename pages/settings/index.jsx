import React, { useEffect } from 'react';
import CommonLayout from '../../layouts/CommonLayout';
import Button from '@mui/material/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Key, AccountBox, Home, AccountCircle } from '@mui/icons-material';
import Link from 'next/link';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import {
  delAddresses,
  getAddresses,
  getCompany,
  getLocationFromPincode,
  postAddresses,
  postResetPassword,
  putAddresses,
} from '../../apiCalls/index';
import { toast } from 'react-toastify';
import { Box } from '@material-ui/core';
import { useRouter } from 'next/router';

export default function settings({ addresses, companies }) {
  const [catagory, setCatagory] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState(addresses);
  const [edit, setEdit] = useState(false);
  const [addressId, setAddressId] = useState('');
  let userdata = localStorage.getItem('userdata');
  const useremail = JSON.parse(userdata);
  const router = useRouter();
  const [reset, setReset] = useState({
    identifier: `${useremail.email}`,
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  let company_id = '';
  let user_id = '';

  if (userdata) {
    userdata = JSON.parse(userdata);
    company_id = userdata.company_id;
    user_id = userdata.id;
  }

  const openEvents = (evt, eventName) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(eventName).style.display = 'block';
    evt.currentTarget.className += ' active';
  };

  useEffect(() => {
    document.getElementById('Address').style.display = 'block';
  }, []);

  const createAddress = async () => {
    let json = {
      user_id: user_id,
      company_id: company_id,
      address1: address1,
      address2: address2,
      address_type: catagory,
      city: city,
      state: state,
      pincode: pincode,
    };

    const addAddress = await postAddresses(
      JSON.stringify({ data: json })
    ).catch((err) => err.response);
    if (addAddress.data.error === undefined) {
      toast.success('Successfuly Added', { autoClose: 1500 });
      const { data } = await getAddresses().catch((err) => err.response);
      setAddress(data.data);
    }
  };

  const handleChange = async (e) => {
    setPincode(e);
    if (e.length > 5) {
      const data = await getLocationFromPincode(e).catch((err) => err.response);
      const result = data.data.result[0];

      if (data.data.result.length !== 0) {
        setState(result.state);
        setCity(result.district);
      } else {
        toast.error('Please Enter a Valid Pincode!!', { autoClose: 1500 });
      }
    }
  };

  const deleteAddress = async (id) => {
    const res = await delAddresses(id).catch((err) => err.response);
    if (res) {
      toast.success('Successfully Deleted', { autoClose: 1500 });
    }
    const { data } = await getAddresses().catch((err) => err.response);
    setAddress(data.data);
  };

  const editAddress = async (
    id,
    address1,
    address2,
    address_type,
    city,
    pincode,
    state
  ) => {
    setAddress1(address1);
    setCatagory(address_type);
    setAddress2(address2);
    setCity(city);
    setPincode(pincode);
    setState(state);
    setEdit(true);
    setAddressId(id);
  };

  const updateAddress = async (address_id) => {
    let json = {
      user_id: user_id,
      company_id: company_id,
      address1: address1,
      address2: address2,
      address_type: catagory,
      city: city,
      state: state,
      pincode: pincode,
    };

    const addAddress = await putAddresses(
      address_id,
      JSON.stringify({ data: json })
    ).catch((err) => err.response);
    if (addAddress.data.error === undefined) {
      toast.success('Successfuly Updated', { autoClose: 1500 });
      const { data } = await getAddresses().catch((err) => err.response);
      setAddress(data.data);
      setAddress1('');
      setCatagory('');
      setAddress2('');
      setCity('');
      setPincode('');
      setState('');
      setEdit(false);
      setAddressId('');
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      if (reset.newPassword === reset.confirmPassword) {
        const { data } = await postResetPassword(reset).catch(
          (err) => err.response
        );
        if (data.error === undefined) {
          localStorage.clear();
          toast.success(data.message, { autoClose: 1500 });
          router.push('/login');
        } else {
          toast.error(data.error.message, { autoClose: 1500 });
        }
      } else {
        toast.error('Confirm Password should be same as New Password!!', {
          autoClose: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setReset({ ...reset, [name]: value });
  };

  return (
    <>
      <Grid sx={{ margin: '0 50px' }}>
        <div className='tab'>
          <button
            className='tablinks active'
            onClick={(e) => {
              openEvents(e, 'Address');
            }}
          >
            <Home /> Addresses
          </button>
          <button
            className='tablinks'
            onClick={(e) => {
              openEvents(e, 'Password');
            }}
          >
            <Key /> Change Password
          </button>
          <button
            className='tablinks'
            onClick={(e) => {
              openEvents(e, 'Profile');
            }}
          >
            <AccountBox /> Profile Settings
          </button>
        </div>
      </Grid>

      <Grid>
        <div
          id='Password'
          className='tabcontent'
          style={{ marginTop: '10px', marginLeft: '50px' }}
        >
          <h4>Reset Password</h4>

          <form onSubmit={handleResetSubmit} style={{ marginTop: 30 }}>
            <FormControl required>
              <TextField
                helperText='Previous Password'
                size='small'
                id='name'
                variant='outlined'
                type='password'
                value={reset.password}
                required
                name='password'
                onChange={(e) => handleResetChange(e)}
                style={{ width: 450 }}
              />

              <TextField
                helperText='New Password'
                size='small'
                id='name'
                variant='outlined'
                type='password'
                value={reset.newPassword}
                required
                name='newPassword'
                onChange={(e) => handleResetChange(e)}
                style={{ marginTop: 30, width: 450 }}
              />

              <TextField
                helperText='Confirm Password'
                size='small'
                id='name'
                variant='outlined'
                type='password'
                value={reset.confirmPassword}
                required
                name='confirmPassword'
                onChange={(e) => handleResetChange(e)}
                style={{ marginTop: 30, width: 450 }}
              />
            </FormControl>
            <Button
              style={{ marginTop: 20, marginBottom: 65, display: 'block' }}
              variant='contained'
              color='error'
              type='submit'
            >
              Reset
            </Button>
          </form>
        </div>

        <div
          id='Address'
          className='tabcontent'
          style={{ marginTop: '10px', marginLeft: '30px', width: '100%' }}
        >
          {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Address Details</h4>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={(e) => {
                  openEvents(e, "addAddress");
                  setAddress1("");
                  setCatagory("");
                  setAddress2("");
                  setCity("");
                  setPincode("");
                  setState("");
                  setEdit(false);
                  setAddressId("");
                }}
              >
                Add New Address
              </Button>
            </Box> */}
          <Box sx={{ display: 'flex', gap: '100px' }}>
            <Box sx={{ width: '40%' }}>
              {address.length > 0 ? (
                address
                  .filter((address) => {
                    return (
                      address.attributes.address_type === 'billing_address'
                    );
                  })
                  .map((address) => {
                    const {
                      id,
                      attributes: {
                        address1,
                        address2,
                        address_type,
                        city,
                        pincode,
                        state,
                      },
                    } = address;
                    return (
                      <Box
                        key={id}
                        sx={{
                          p: 2,
                          m: 2,
                          borderRadius: '6px',
                          borderLeft: '5px solid rgb(10, 177, 60)',
                        }}
                      >
                        <Box
                          sx={{ color: 'rgb(10, 177, 60)', fontWeight: '600' }}
                        >
                          {address_type.replace('_', ' ').toUpperCase()}
                        </Box>
                        <Box sx={{ fontSize: '14px' }}>
                          {`${address1} ${address2} `} <br />{' '}
                          {`${city}, ${state} - ${pincode}`}{' '}
                        </Box>
                      </Box>
                      // <Box
                      //   key={id}
                      //   sx={{
                      //     p: 1,
                      //     m: 2,
                      //     bgcolor: "#f0eeed",
                      //     width: 650,
                      //     borderRadius: "10px",
                      //   }}
                      // >
                      //   <div
                      //     style={{
                      //       display: "flex",
                      //       justifyContent: "space-between",
                      //     }}
                      //   >
                      //     <div style={{ width: "70%" }}>
                      //       {`${address1} ${address2}`} {`${city} ${state}`} -{" "}
                      //       {pincode}
                      //     </div>
                      //     <div>
                      //       <Button
                      //         sx={{
                      //           border: "1px solid",
                      //           minWidth: "30px",
                      //           minHeight: "30px",
                      //         }}
                      //         onClick={(e) => {
                      //           editAddress(
                      //             id,
                      //             address1,
                      //             address2,
                      //             address_type,
                      //             city,
                      //             pincode,
                      //             state
                      //           );
                      //           openEvents(e, "addAddress");
                      //         }}
                      //       >
                      //         <Edit />
                      //       </Button>
                      //       <Button
                      //         sx={{
                      //           border: "1px solid red",
                      //           minWidth: "30px",
                      //           minHeight: "30px",
                      //           ml: 2,
                      //         }}
                      //         color="error"
                      //         onClick={() => deleteAddress(id)}
                      //       >
                      //         <Delete />
                      //       </Button>
                      //     </div>
                      //   </div>
                      // </Box>
                    );
                  })
              ) : (
                <p style={{ color: 'red' }}>
                  No Address Found! Please Add New Address
                </p>
              )}
            </Box>
            <Box sx={{ width: '40%' }}>
              {address.length > 0 ? (
                address
                  .filter((address) => {
                    return (
                      address.attributes.address_type === 'shipping_address'
                    );
                  })
                  .map((address, index) => {
                    const {
                      id,
                      attributes: {
                        address1,
                        address2,
                        address_type,
                        city,
                        pincode,
                        state,
                      },
                    } = address;
                    return (
                      <Box
                        key={id}
                        sx={{
                          p: 2,
                          m: 2,
                          borderRadius: '6px',
                          borderLeft: '5px solid rgb(10, 177, 60)',
                        }}
                      >
                        <Box
                          sx={{ color: 'rgb(10, 177, 60)', fontWeight: '600' }}
                        >
                          {address_type.replace('_', ' ').toUpperCase()}{' '}
                          {index + 1}
                        </Box>
                        <Box sx={{ fontSize: '14px' }}>
                          {`${address1} ${address2} `} <br />{' '}
                          {`${city}, ${state} - ${pincode}`}{' '}
                        </Box>
                      </Box>
                      // <Box
                      //   key={id}
                      //   sx={{
                      //     p: 1,
                      //     m: 2,
                      //     bgcolor: "#f0eeed",
                      //     width: 650,
                      //     borderRadius: "10px",
                      //   }}
                      // >
                      //   <div
                      //     style={{
                      //       display: "flex",
                      //       justifyContent: "space-between",
                      //     }}
                      //   >
                      //     <div style={{ width: "70%" }}>
                      //       {`${address1} ${address2}`} {`${city} ${state}`} -{" "}
                      //       {pincode}
                      //     </div>
                      //     <div>
                      //       <Button
                      //         sx={{
                      //           border: "1px solid",
                      //           minWidth: "30px",
                      //           minHeight: "30px",
                      //         }}
                      //         onClick={(e) => {
                      //           editAddress(
                      //             id,
                      //             address1,
                      //             address2,
                      //             address_type,
                      //             city,
                      //             pincode,
                      //             state
                      //           );
                      //           openEvents(e, "addAddress");
                      //         }}
                      //       >
                      //         <Edit />
                      //       </Button>
                      //       <Button
                      //         sx={{
                      //           border: "1px solid red",
                      //           minWidth: "30px",
                      //           minHeight: "30px",
                      //           ml: 2,
                      //         }}
                      //         color="error"
                      //         onClick={() => deleteAddress(id)}
                      //       >
                      //         <Delete />
                      //       </Button>
                      //     </div>
                      //   </div>
                      // </Box>
                    );
                  })
              ) : (
                <p style={{ color: 'red' }}>
                  No Address Found! Please Add New Address
                </p>
              )}
            </Box>
          </Box>
        </div>
        <div
          id='addAddress'
          className='tabcontent'
          style={{ marginTop: 60, marginLeft: 40, width: '100%' }}
        >
          <h3>Add Address</h3>
          <form noValidate autoComplete='off' style={{ marginTop: 30 }}>
            <FormControl required>
              <TextField
                helperText='Address Line 1'
                size='small'
                id='name'
                variant='outlined'
                type='text'
                value={address1}
                required
                onChange={(e) => setAddress1(e.target.value)}
                style={{ width: 450 }}
              />

              <TextField
                helperText='Address Line 2'
                size='small'
                id='name'
                variant='outlined'
                type='text'
                value={address2}
                required
                onChange={(e) => setAddress2(e.target.value)}
                style={{ marginTop: 30, width: 450 }}
              />

              <TextField
                helperText='Pin Code'
                size='small'
                id='name'
                variant='outlined'
                type='text'
                value={pincode}
                required
                onChange={(e) => handleChange(e.target.value)}
                style={{ marginTop: 30, width: 450 }}
              />

              <TextField
                helperText='City'
                size='small'
                id='name'
                variant='outlined'
                type='text'
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
                style={{ marginTop: 30, width: 450 }}
              />

              <TextField
                helperText='State'
                size='small'
                id='name'
                variant='outlined'
                type='text'
                value={state}
                required
                onChange={(e) => setState(e.target.value)}
                style={{ marginTop: 30, width: 450 }}
              />

              <RadioGroup
                value={catagory}
                onChange={(e) => setCatagory(e.target.value)}
                row
              >
                <FormControlLabel
                  value='billing_address'
                  control={<Radio color='primary' />}
                  label='Billing Address'
                  style={{ marginTop: 20 }}
                ></FormControlLabel>

                <FormControlLabel
                  value='shipping_address'
                  control={<Radio color='primary' />}
                  label='Shipping Address'
                  style={{ marginTop: 20 }}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </form>

          <Link href='/settings'>
            {edit ? (
              <Button
                style={{ marginTop: 20, marginBottom: 65 }}
                variant='contained'
                color='primary'
                type='submit'
                onClick={(e) => {
                  updateAddress(addressId);
                  openEvents(e, 'Address');
                }}
              >
                Update
              </Button>
            ) : (
              <Button
                style={{ marginTop: 20, marginBottom: 65 }}
                variant='contained'
                color='primary'
                type='submit'
                onClick={(e) => {
                  createAddress();
                  openEvents(e, 'Address');
                }}
              >
                Register
              </Button>
            )}
          </Link>
        </div>
        <div
          id='Profile'
          className='tabcontent'
          style={{ marginTop: 60, marginLeft: 40, width: '100%' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AccountCircle sx={{ height: '200px', width: '200px', mt: 2 }} />
            <Box>
              {companies.map((company) => {
                const {
                  id,
                  attributes: { name, gst_no, status },
                } = company;
                return (
                  <Box
                    key={id}
                    sx={{
                      p: 1,
                      m: 2,
                      width: 450,
                      borderRadius: '6px',
                      borderLeft: '5px solid rgb(10, 177, 60)',
                      borderRight: '5px solid rgb(10, 177, 60)',
                      textAlign: 'center',
                    }}
                  >
                    <h6>Company : {name}</h6>
                    <h6>GST Number : {gst_no}</h6>
                    <h6>Status : {status}</h6>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </div>
      </Grid>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const cookies = req.cookies || null;
  let user_id = cookies.user_id;
  let company_id = cookies.company_id;

  const address = await getAddresses(company_id)
    .catch((err) => err.response)
    .catch((err) => err.response);
  const addresses = address.data.data;

  const company = await getCompany(user_id)
    .catch((err) => err.response)
    .catch((err) => err.response);
  const companies = company.data.data;

  return {
    props: {
      addresses,
      companies,
    },
  };
}

settings.Layout = CommonLayout;
