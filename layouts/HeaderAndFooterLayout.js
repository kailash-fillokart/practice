import React from 'react';
import HeaderLogin from '../components/Login/HeaderLogin';
import FooterLogin from '../components/Login/FooterLogIn';

function HeaderAndFooterLayout({ children }) {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #2A2D32 32.89%, #030303 100%)',
      }}
    >
      <HeaderLogin />
      <div style={{ display: 'grid', width: '100%', justifyContent: 'center' }}>
        {children}
      </div>
      <FooterLogin />
    </div>
  );
}

export default HeaderAndFooterLayout;
