import React from 'react';
import styles from '../../styles/Client.module.css';
import commonstyles from '../../styles/CommonStyles.module.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { ClientsLogo } from '../Utils/constants';

const Clients = () => {
  React.useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className={styles.client_container}>
      <div className={commonstyles.title}>
        <h1>Our Awesome Clients</h1>
        <p>Supporting Hands to Grow Us :)</p>
      </div>
      <div className={styles.clientslogo}>
        {/* <marquee direction='left'> */}
        <div className={styles.logo_container}>
          {ClientsLogo.map((elem) => {
            return (
              <div key={elem.id} className={styles.logo}>
                <img src={elem.img} />
              </div>
            );
          })}
          {ClientsLogo.map((elem) => {
            return (
              <div key={elem.id} className={styles.logo}>
                <img src={elem.img} />
              </div>
            );
          })}
          {ClientsLogo.map((elem) => {
            return (
              <div key={elem.id} className={styles.logo}>
                <img src={elem.img} />
              </div>
            );
          })}{' '}
          {ClientsLogo.map((elem) => {
            return (
              <div key={elem.id} className={styles.logo}>
                <img src={elem.img} />
              </div>
            );
          })}
          {/* {ClientsLogo.map((elem, index) => {
            return (
              <div
                key={index}
                className={styles.logo}
                // data-aos='zoom-in'
                // data-aos-delay="250"
              >
                <img src={elem.img} />
              </div>
            );
          })} */}
          {/* {ClientsLogo.map((elem) => {
            return (
              <div
                key={elem.id}
                className={styles.logo}
                // data-aos='zoom-in'
                // data-aos-delay="250"
              >
                <img src={elem.img} />
              </div>
            );
          })} */}
        </div>
        {/* </marquee> */}

        {/* <div className={styles.logo_container}>
          {ClientsLogo.map((elem) => {
            return (
              <div
                key={elem.id}
                className={styles.logo}
                // data-aos='zoom-in'
                // data-aos-delay="250"
              >
                <img src={elem.img} />
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

export default Clients;
