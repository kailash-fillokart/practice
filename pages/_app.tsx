import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';
import 'react-multi-carousel/lib/styles.css';
import '../styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || EmptyLayout;
  const [role, setRole] = React.useState('');

  React.useEffect(() => {
    let userdata: any = localStorage.getItem('userdata');

    if (userdata) {
      userdata = JSON.parse(userdata);
      setRole(userdata.assign_role);
    }
  }, []);

  let allowed = false;

  const router = useRouter();

  if (
    router.pathname == '/' ||
    router.pathname == '/ContactUs' ||
    router.pathname == '/privacy' ||
    router.pathname == '/login' ||
    router.pathname == '/test' ||
    router.pathname == '/career' ||
    router.pathname == '/invoiceview/[pid]'
  ) {
    allowed = true;
  }

  if (
    role === 'superClient' ||
    role === 'client' ||
    role === 'Authenticated' ||
    role === 'Public' ||
    role === 'super_admin' ||
    role === 'Executive' ||
    role === 'Admin'
  ) {
    allowed = true;
  }

  const ComponentToRender = allowed ? Component : '';

  if (allowed == true)
    return (
      <>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link
            href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css'
            rel='stylesheet'
            integrity='sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1'
            crossOrigin='anonymous'
          />
          <script
            src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js'
            integrity='sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW'
            crossOrigin='anonymous'
          ></script>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ToastContainer />
      </>
    );
  else return ComponentToRender;
}

const EmptyLayout = ({ children }) => <>{children}</>;

export default MyApp;
