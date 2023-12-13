import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Typography, IconButton, InputAdornment } from '@material-ui/core';
import styles from '../styles/Login.module.css';
import image from '../static/images/langindpage/loginhero.png';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { getCompany, getCompanyById, getUser } from '../apiCalls/index';
import CloseIcon from '@mui/icons-material/Close';

export default function BasicModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  const [user, setUser] = React.useState({
    identifier: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await getUser(user).catch((err) => err.response);
      if (data.error === undefined) {
        const company = await getCompany(data.user.id)
          .catch((err) => err.response)
          .catch((err) => err.response);
        localStorage.setItem('userdata', JSON.stringify(data.user));

        Cookies.set('token', data.jwt);
        Cookies.set('user_id', data.user.id);
        // Cookies.set('building', data.user.building);
        Cookies.set('user_role', data.user.assign_role);
        // Cookies.set('user_addresses', data.user.addresses);

        if (company.data.data.error === undefined) {
          const { id: comp_id } = company.data.data[0];

          // addressArr.map((address) => {
          //   if (address.attributes.address_type === 'billing_address') {
          //     Cookies.set('pincode', address.attributes.pincode);
          //   }
          //   return null;
          // });

          const user_addresses = await getCompanyById(comp_id).catch(
            (err) => err.response
          );
          const {
            attributes: {
              user_ids: { data: userdata },
            },
          } = user_addresses.data.data;

          const currUser = userdata.find(
            (user) => user.id === Number(data.user.id)
          );

          const user_billingAddress = currUser.attributes.addresses.data.find(
            (address) => address.attributes.address_type === 'billing_address'
          );
          const user_shippingAddress = currUser.attributes.addresses.data.find(
            (address) => address.attributes.address_type === 'shipping_address'
          );

          Cookies.set('pincode', user_billingAddress.attributes.pincode);
          Cookies.set(
            'building',
            user_shippingAddress.attributes.building_name
          );

          Cookies.set('company_id', comp_id);
          router.push('/dashboard');
          toast.success('Successfuly Logged In', { autoClose: 1500 });
        }
      } else {
        toast.warn('Invalid Email/Password', { autoClose: 1500 });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  React.useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div data-aos='zoom-in' className={styles.modal}>
          <div className={styles.modal_container}>
            <div className={styles.left_container}>
              <div className={styles.img_eclips1}></div>
              <div className={styles.img_eclips2}></div>
              <img src={image} width='100%' objectFit='cover' />
              <h4 className={styles.img_text}>
                Now get your office supplies without any struggle with fillOkart
                !
              </h4>
            </div>
            <div className={styles.right_container}>
              <div className={styles.form_topeclips}></div>

              <div className={styles.closebtn}>
                <CloseIcon style={{ color: '#A9A9A9' }} onClick={handleClose} />
              </div>

              <div className={styles.heading}>
                <h2 className={styles.text1}>Login</h2>
                <p className={styles.text2}>Welcome onboard with us!</p>
              </div>
              <div>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.fields}>
                    <Typography className={styles.input_heading}>
                      Email Address
                    </Typography>
                    <input
                      required
                      id='email'
                      name='identifier'
                      placeholder='Enter your email '
                      className={styles.input}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className={styles.fields}>
                    <Typography className={styles.input_heading}>
                      Password
                    </Typography>
                    <input
                      required
                      id='password'
                      name='password'
                      placeholder='Enter password'
                      className={styles.input}
                      type={showPassword ? 'text' : 'password'}
                      autoComplete='current-password'
                      onChange={(e) => handleChange(e)}
                    />
                    <span className={styles.password_visibility}>
                      {' '}
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? (
                            <Visibility style={{ color: '#A9A9A9' }} />
                          ) : (
                            <VisibilityOff style={{ color: '#A9A9A9' }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    </span>

                    <div className={styles.forgot_pass}>
                      {' '}
                      <Typography
                        style={{
                          fontFamily: 'Poppins',
                          color: '#f1f1f1',
                          textAlign: 'end',
                          fontSize: '0.9rem',
                        }}
                      >
                        Forgot Password?
                      </Typography>{' '}
                    </div>
                  </div>
                  <div>
                    <button type='submit' className={styles.btn}>
                      LOGIN
                    </button>
                  </div>
                </form>
              </div>
              <div className={styles.form_bottomeclips}></div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
