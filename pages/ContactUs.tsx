import React from 'react';
import { Grid, TextareaAutosize, InputLabel, Typography } from '@material-ui/core';
import Controls from '../components/Utils/Controls';
import { useForm, Form } from '../components/useForm';
import HeaderAndFooterLayout from '../layouts/HeaderAndFooterLayout';
import { TextField } from '@mui/material';
import { postEmailQuery } from '../apiCalls';
import { toast } from 'react-toastify';
import styles from '../styles/Contact.module.css';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import comstyles from '../styles/CommonStyles.module.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
const image = require('../static/images/langindpage/contactus.png');


const initialFValues = {
  company_name: '',
  email: '',
  gst_number: '',
  phone: '',
  hear: '',
  message: '',
  name: '',
  location: '',
};

const style = {
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& > fieldset': { borderColor: 'white' },
    '&.Mui-focused fieldset': {
      ' borderColor': '#93D8FF',
    },
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  input: { color: 'white' },
  resize:"vertical"
};

export function ContactUs() {
    React.useEffect(() => {
      Aos.init();
    }, []);
    
  const validate = (fieldValues = values) => {
    let temp = { company_name: '', email: '', phone: '', gst_number: '' };
    if ('company_name' in fieldValues)
      temp.company_name = fieldValues.company_name
        ? ''
        : 'This field is required.';
    if ('email' in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ''
        : 'Email is not valid.';
    if ('phone' in fieldValues)
      temp.phone =
        fieldValues.phone.length > 9 ? '' : 'Minimum 10 numbers required.';

    if ('gst_number' in fieldValues)
      temp.gst_number = fieldValues.gst_number ? '' : 'This field is required.';

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == '');
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await postEmailQuery({
        data: values,
      }).catch((err) => err.response);

      if (data.error === undefined) {
        
        resetForm();
        // router.push('/');
        toast.success('Succesfully Sent', { autoClose: 700 });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div style={{ overflowX: 'hidden' }}>
        <div style={{ margin: '3rem 10px' }}>
          <div
            data-aos='fade-up'
            data-aos-delay='300'
            className={comstyles.title}
            style={{ fontFamily: 'Franklin Gothic Medium' }}
          >
            <h1>We'd Love To Hear From You</h1>
            <p>Any QUESTIONS, CONCERNS, COMMENTS? YOU TELL US. WE LISTEN.</p>
          </div>
        </div>
        <div className={styles.contact_info}>
          <img data-aos='fade-left' data-aos-delay='300' src={image} />
          <div data-aos='fade-right' className={styles.address}>
            <p data-aos='fade-right' data-aos-delay='400'>
              <BusinessIcon /> &nbsp; 5th Block, 1st Stage, HBR Layout, Near
              Manyata Tech Park, Bengalore, Karnataka - 560043
            </p>
            <p data-aos='fade-right' data-aos-delay='500'>
              <EmailIcon /> &nbsp; help@fillokart.com
            </p>
            <p data-aos='fade-right' data-aos-delay='600'>
              <CallIcon /> &nbsp; +91 76768 69212
            </p>
            <p data-aos='fade-right' data-aos-delay='700'>
              <AccessTimeIcon /> &nbsp; Monday to Saturday – 9:00 am to 7:00 pm
            </p>
          </div>
        </div>
        <div className='contact-head mt-lg-5 mt-sm-3'></div>

        <div
          style={{
            marginTop: '1.5rem',
          }}
        >
          <h2 data-aos="fade-up" className={styles.heading}>LEAVE A MESSAGE</h2>
          <Form onSubmit={handleSubmit}>
            <Grid
              container
              direction='column'
              alignItems='center'
              justify='center'
            >
              <Grid
                item
                xs={12}
                style={{
                  width: '800px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <TextField
                  name='name'
                  label='Contact Name'
                  value={values.name}
                  onChange={handleInputChange}
                  className='fill-card-shadow'
                  sx={style}
                />
                <TextField
                  name='company_name'
                  label='Company Name'
                  value={values.company_name}
                  onChange={handleInputChange}
                  className='fill-card-shadow'
                  sx={style}
                />
                <TextField
                  name='location'
                  label='Location'
                  value={values.location}
                  onChange={handleInputChange}
                  className='fill-card-shadow'
                  sx={style}
                />
                <TextField
                  label='Email Address'
                  name='email'
                  value={values.email}
                  onChange={handleInputChange}
                  className='fill-card-shadow'
                  sx={style}
                />

                <TextField
                  name='gst_number'
                  label='GST No.'
                  value={values.gst_number}
                  onChange={handleInputChange}
                  sx={style}
                />

                <TextField
                  label='Mobile Number'
                  name='phone'
                  value={values.phone}
                  onChange={handleInputChange}
                  className='fill-card-shadow'
                  sx={style}
                />

                <TextField
                  name='hear'
                  label='How did you hear about us ?'
                  value={values.hear}
                  onChange={handleInputChange}
                  className='fill-card-shadow'
                  sx={style}
                />

                <div
                  style={{
                    marginTop: '5px',
                    marginLeft: '7px',
                    width: '80%',
                  }}
                  className='fill-m-b-50-25'
                >
                  <InputLabel
                    style={{ marginBottom: '5px', marginLeft: '2px' }}
                  >
                    <p style={{ color: '#f1f1f1' }}>Message:</p>
                  </InputLabel>
                  <TextareaAutosize
                    style={{
                      color:"white",
                      height: '200px',
                      width: '100%',
                      background: 'transparent',
                      padding: '2% 2%',
                      border: '1px solid #f1f1f1',
                    }}
                    rowsMax={4}
                    aria-label='maximum height'
                    placeholder='  Enter Your Message Here...'
                    value={values.message}
                    name='message'
                    onChange={handleInputChange}
                  />
                </div>
              </Grid>
              <div>
                <Controls.Button
                  type='submit'
                  text='Submit'
                  onClick={handleSubmit}
                  style={{ backgroundColor: 'rgba(50,205,50,0.9)' }}
                  className='mx-4'
                />

                <Controls.Button
                  text='Reset'
                  color='default'
                  onClick={resetForm}
                  className='mx-4'
                />
              </div>
            </Grid>
          </Form>
        </div>
      </div>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=G-LKCR75S9XX"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      />
    </>
  );
}

export default ContactUs;
ContactUs.Layout = HeaderAndFooterLayout;
