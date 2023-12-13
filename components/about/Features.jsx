import React from 'react';
import styles from '../../styles/About.module.css';
import commonstyles from '../../styles/CommonStyles.module.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
const dispatched1 = require('../../static/images/langindpage/delivery.png');
const login2 = require('../../static/images/langindpage/login.png');
const order1 = require('../../static/images/langindpage/order.png');
const track1 = require('../../static/images/langindpage/trackorder.png');

const Features = () => {
  React.useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className={styles.feature_container}>
      <div data-aos="fade-up" className={commonstyles.title}>
        <h1>We Provide Many Features</h1>
        <p>You can explore the features that we provide and Enjoy :)</p>
      </div>
      <div className={styles.feature}>
        <div className={`${styles.single_feature} ${styles.f1}`}>
          <div
            data-aos='fade-right'
            data-aos-delay='300'
            className={styles.sf_des}
          >
            <h1>Login</h1>
            <p>Login to your account with provided credentials.</p>
          </div>
          <div
            data-aos='fade-left'
            data-aos-delay='200'
            className={styles.sf_img}
          >
            <img className={styles.img1} src={login2} alt='logIn' />
          </div>
        </div>

        <div
          className={`${styles.single_feature} ${styles.rev_single_feature}`}
        >
          <div
            data-aos='fade-right'
            data-aos-delay='200'
            className={styles.sf_img}
          >
            <img src={order1} alt='order' />
          </div>
          <div
            data-aos='fade-left'
            data-aos-delay='200'
            className={styles.sf_des}
          >
            <h1>Order</h1>
            <p>
              Select products from the catalogue covering thousands of varieties
              of products and brands. This catalogue of products are approved by
              manager.
            </p>
          </div>
        </div>

        <div
          className={`${styles.single_feature} ${styles.f1}`}
          style={{ marginBottom: '20px' }}
        >
          <div
            data-aos='fade-right'
            data-aos-delay='200'
            className={styles.sf_des}
          >
            <h1>Track Order</h1>
            <p>
              Clients can always track their order from their dashboard anytime
              and anywhere. Here dispatch details, time and places are always
              mentioned to keep the process crystal clear for customers
            </p>
          </div>
          <div
            data-aos='fade-left'
            data-aos-delay='200'
            className={styles.sf_img}
          >
            <img src={track1} alt='order' />
          </div>
        </div>

        <div
          className={`${styles.single_feature} ${styles.rev_single_feature}`}
        >
          <div
            data-aos='fade-right'
            data-aos-delay='300'
            className={styles.sf_img}
          >
            <img src={dispatched1} alt='order' />
          </div>
          <div
            data-aos='fade-left'
            data-aos-delay='300'
            className={styles.sf_des}
            style={{ marginBottom: '20px' }}
          >
            <h1>Delivery</h1>
            <p>
              fillOkart ensures hassle-free doorstep delivery of your order
              within 48 hours. Saving customers time and money is our highest
              priority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
