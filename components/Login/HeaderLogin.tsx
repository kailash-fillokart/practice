import React from 'react';
import { useRouter } from 'next/router';
import logo from '../../logos/fillokartLogo.svg';
import Link from 'next/link';
import LoginFormModal from '../LoginFormModal';

export default function HeaderLogin() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleFormOpen = () => {
    if (localStorage.getItem('userdata') !== null) {
      router.push('/dashboard');
    } else {
      setOpen(true);
    }
  };
  return (
    <>
      <nav
        className='navbar 
                      navbar-expand-xl 
                      sticky-top
                      mx-lg-0
                      mx-md-0
                      mx-sm-0
                      navbar-rounded-pill'
      >
        <div className='container-fluid mx-lg-2 mx-md-0 mx-sm-0'>
          <Link href='/'>
            <div
              className='navbar-brand d-flex align-items-center'
              style={{ cursor: 'pointer' }}
            >
              <img src={logo} style={{ width: '150px', height: '70px' }} />
            </div>
          </Link>

          <div
            className='d-flex justify-content-end'
            id='navbarSupportedContent'
          >
            <button
              onClick={handleFormOpen}
              // onClick={() => router.push('/login')}
              type='submit'
              className='m-0 btn raised shadow fill-button'
              style={{ background: '#AA6B8D' }}
            >
              Sign In
            </button>
            <LoginFormModal open={open} setOpen={setOpen} />
          </div>
        </div>
      </nav>
    </>
  );
}
