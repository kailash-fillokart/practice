import React, { useEffect, useState } from 'react';
import { CommonHeaderData } from './CommonHeaderData';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { getBaskets, getCompany } from '../apiCalls';
import { Badge } from '@material-ui/core';

const useStyles = makeStyles({
  item: {
    display: 'flex',
  },
  items: {
    marginRight: '10px',
  },
  notify: {
    background: 'red',
    height: '18px',
    width: '18px',
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    position: 'absolute',
    top: '-5px',
    right: '-5px',
  },
});

export default function CommonHeader({ count, company }) {
  const classes = useStyles();
  const [role, setRole] = React.useState({});
  const [user_id, setUser_id] = useState('');
  const [user, setUser] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [basketLength, setBasketLenght] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      let userdata = localStorage.getItem('userdata');
      if (userdata) {
        userdata = JSON.parse(userdata);
        setUser(userdata);
        // if (!!userdata.role_name) {
        //   setUser_id(userdata.id);
        //   setRole(userdata.role_name);
        // }
      }
    };
    fetchData();
  }, []);

  useEffect(async () => {
    const basket = await getBaskets(user.id).catch((err) => err.response);
    if (basket.data.error === undefined) {
      if (basket.data.data.length !== 0)
        setBasketLenght(
          basket.data.data[0].attributes.basket_items.data.length
        );
    }
  }, [user]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const handleLogout = (req, res) => {
    document.cookie =
      'token=; path=/; expires' + new Date(2012, 0, 1).toUTCString();
    document.cookie =
      'user_id=; path=/; expires' + new Date(2012, 0, 1).toUTCString();
    document.cookie =
      'company_id=; path=/; expires' + new Date(2012, 0, 1).toUTCString();
    document.cookie =
      'pincode=; path=/; expires' + new Date(2012, 0, 1).toUTCString();
    localStorage.clear();
    router.push('/');
    toast.success('Successfully Logged Out', { autoClose: 1500 });
  };
  console.log('basketLength', basketLength);

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '15px',
      }}
    >
      <div
        style={{ display: 'flex', flexDirection: 'column', margin: '0 auto' }}
      >
        {company ? (
          <div style={{ textAlign: 'center' }}>
            <h6
              style={{
                whiteSpace: 'nowrap',
                margin: '0 auto',
                fontWeight: '400',
              }}
            >
              Welcome to fillOkart! We're excited to have you onboard!
            </h6>
            <p style={{ fontSize: '14px', fontWeight: '500' }}>
              Dashboard for {company.attributes.name}
            </p>{' '}
          </div>
        ) : (
          ''
        )}
      </div>
      <div className={classes.wrapper}>
        <div className={classes.item}>
          {CommonHeaderData.map((val, key) => {
            if (val.link === '/productcatalog/basket')
              return (
                <div className={classes.items} key={key}>
                  <Link href='/productcatalog/basket'>
                    <div
                      id='icon'
                      style={{
                        display: 'flex',
                        position: 'relative',
                        cursor: 'pointer',
                      }}
                    >
                      <Badge badgeContent={basketLength} color='primary'>
                        {val.icon}{' '}
                      </Badge>
                    </div>
                  </Link>
                </div>
              );

            if (val.title === 'Notification') return;
            else
              return (
                <div key={key}>
                  <div id='icon'>
                    {val.title === 'Account' ? (
                      <>
                        <span
                          id='basic-button'
                          aria-controls='basic-menu'
                          aria-haspopup='true'
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                          style={{ cursor: 'pointer' }}
                        >
                          {val.icon}
                        </span>
                        <Menu
                          id='basic-menu'
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                        >
                          <MenuItem
                            style={{ marginLeft: '10px', marginRight: '10px' }}
                            onClick={handleLogout}
                          >
                            Logout
                          </MenuItem>
                        </Menu>
                      </>
                    ) : (
                      val.icon
                    )}
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </nav>
  );
}
