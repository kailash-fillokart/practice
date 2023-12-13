import React from 'react';
import { Container, Grid, Link, Typography, Box } from '@material-ui/core';
import logo from '../../logos/fillokartLogo.svg';
import { makeStyles } from '@material-ui/core/styles';
// import FacebookIcon from '@material-ui/icons/Facebook';
import { LinkedIn } from '@mui/icons-material';
// import InstagramIcon from '@material-ui/icons/Instagram';
import router from 'next/router';
import styles from '../../styles/Footer.module.css';
import comstyles from '../../styles/CommonStyles.module.css';

const useStyles = makeStyles((theme) => ({
  footer: {
    background: '#F8F8F8',
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function FooterLogIn() {
  // const scrollToRef = useRef();
  // const classes = useStyles();

  const footers = [
    {
      title: 'About Us',
      link: '/',
    },

    {
      title: 'Contact Us',
      link: '/ContactUs',
    },
    {
      title: 'Career',
      // link: 'https://docs.google.com/forms/d/e/1FAIpQLSc_r4nw81Ot3djhNOMdJ9-Lp8KCUXv6AuFEdSc7RmS3Huccxw/viewform?usp=sf_link',
      link: '/career',
    },
    {
      title: 'Privacy Policy',
      link: '/privacy',
    },
  ];

  return (
    <div
      style={{
        background: '#101010',
        overflow: 'hidden',
        paddingBottom: '4rem',
        marginTop: '4rem',
      }}
    >
      <Grid container spacing={1} style={{ overflow: 'hidden' }}>
        <Grid item xs={12} style={{ gap: '2rem' }}>
          <Container
            maxWidth='xl'
            component='footer'
            style={{ paddingTop: '20px', paddingBottom: '20px' }}
          >
            <Grid container spacing={3}>
              <Grid
                item
                xs
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  minWidth: '230px',
                  flexDirection: 'column',
                }}
              >
                <div style={{ cursor: 'pointer' }}>
                  <img
                    src={logo}
                    alt='FillOKartLgo.png'
                    width='280px'
                    height='100px'
                    onClick={() => {
                      router.push('/');
                    }}
                  />
                </div>
                <div
                  style={{
                    maxWidth: '320px',
                    fontSize: '16px',
                    letterSpacing: '1px',
                    marginTop: '20px',
                    textAlign: 'center',
                  }}
                  className={`${styles.text} ${styles.logotext}`}
                >
                  <Typography>
                    Fillokart India Private Limited that has unique features and
                    has high security.
                  </Typography>
                </div>

                <Box display='flex' justifyContent='flex-start' m={1} p={1}>
                  <Box pr={1} className='mx-2'>
                    <Link
                      href='https://ne-np.facebook.com/watch/fillokartindia/'
                      target='_blank'
                    >
                      {/* <div className={comstyles.socialicon}>
                        <FacebookIcon
                          style={{
                            color: 'white',
                          }}
                          fontSize='large'
                        />
                      </div> */}
                    </Link>
                  </Box>
                  <Box className='mx-2'>
                    <Link
                      href='https://www.linkedin.com/company/fillokart/'
                      target='_blank'
                    >
                      <div className={comstyles.socialicon}>
                        <LinkedIn
                          className={styles.social_links}
                          style={{
                            color: 'white',
                          }}
                          fontSize='large'
                        />
                      </div>
                    </Link>
                  </Box>
                  <Box pl={1} className='mx-2'>
                    <Link
                      href='https://www.instagram.com/fillokart/?hl=en'
                      target='_blank'
                    >
                      {/* <div className={comstyles.socialicon}>
                        <InstagramIcon
                          style={{
                            color: 'white',
                          }}
                          fontSize='large'
                        />
                      </div> */}
                    </Link>
                  </Box>
                </Box>

                <Typography variant='body2' style={{ color: '#58BA47' }}>
                  {'©2022-23 Fillokart India Private Limited'}
                </Typography>
              </Grid>
              <Grid
                item
                xs
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  minWidth: '230px',
                  color: '#f1f1f1',
                }}
              >
                <div style={{ display: 'grid', gap: '1.2rem' }}>
                  <Typography
                    variant='h6'
                    gutterBottom
                    style={{ fontWeight: 'bold', color: '#f1f1f1' }}
                    className={styles.text2}
                  >
                    Our Hours
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    gutterBottom
                    className={styles.text2}
                  >
                    10:00 AM – 07.00 PM
                    <br></br>
                    Monday – Saturday
                  </Typography>
                  <Typography
                    variant='h6'
                    gutterBottom
                    style={{ fontWeight: 'bold' }}
                    className={styles.text2}
                  >
                    Address
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    gutterBottom
                    className={styles.text2}
                  >
                    Fillokart India Private Limited, 1820, HBR Layout, 5th Block
                    1st Stage, <br />
                    Bengalore, Karnataka, <br />
                    India - 560043
                  </Typography>
                </div>
              </Grid>
              <Grid
                item
                xs
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  minWidth: '230px',
                }}
              >
                <div style={{ float: 'right', gap: '1rem' }}>
                  <Typography
                    variant='h6'
                    gutterBottom
                    style={{ fontWeight: 'bold', marginBottom: '10px' }}
                    className={styles.text2}
                  >
                    Product
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    gutterBottom
                    className={styles.text2}
                    style={{
                      marginBottom: '30px',
                      display: 'grid',
                      gap: '0.6rem',
                    }}
                  >
                    {footers.map((item, index) => (
                      <li key={index} style={{ listStyle: 'none' }}>
                        <Link
                          href={item.link}
                          variant='subtitle1'
                          style={{
                            fontSize: '15px',
                            textDecoration: 'underline',
                            color: '#47D247',
                          }}
                        >
                          <p className={styles.links}>{item.title}</p>
                        </Link>
                      </li>
                    ))}
                  </Typography>

                  <Typography
                    variant='h6'
                    gutterBottom
                    style={{ fontWeight: 'bold', marginBottom: '10px' }}
                    className={styles.text2}
                  >
                    Contact us
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    gutterBottom
                    className={styles.text2}
                  >
                    Phone: +91 76768 69212
                    <br></br>
                    Email: help@fillokart.com
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
    // <></>
  );
}
