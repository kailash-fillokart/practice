import React from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import styles from '../../styles/Swiper.module.css';
import img1 from '../../static/images/aboutcards/1.png';
import img2 from '../../static/images/aboutcards/2.png';
import img3 from '../../static/images/aboutcards/3.png';

const IntroFeature = () => {
  React.useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className={styles.card_container}>
      <div data-aos='fade-right' data-aos-delay='50' className={styles.product}>
        <div className={styles.product_thumb}>
          <img src={img1} alt='' />
        </div>
        <div className={styles.title}>
          <h4>Dashboard Management</h4>
          <p style={{ marginTop: '10px' }}>
            You can also <span>download </span> and access monthly and yearly
            expenditure on orders with the help of a chart. All challan,
            inventory management, e-bills, invoices can be seen here in your
            account.
          </p>
        </div>
      </div>
      <div
        data-aos='fade-right'
        data-aos-delay='200'
        className={styles.product}
      >
        <div className={styles.product_thumb}>
          <img src={img2} alt='' />
        </div>
        <div className={styles.title}>
          <h4>Quick Execution</h4>

          <p style={{ marginTop: '10px' }}>
            {' '}
            fillOkart makes a priority that customers order are delivered{' '}
            <span>within 48 hours </span> of placing the order.{' '}
          </p>
        </div>
      </div>
      <div
        data-aos='fade-right'
        data-aos-delay='400'
        className={styles.product}
      >
        <div className={styles.product_thumb}>
          <img src={img3} alt='' />
        </div>
        <div className={styles.title}>
          <h4>Hassle Free Experience</h4>

          <p style={{ marginTop: '10px' }}>
            {' '}
            We find the perfect vendors and take care of the{' '}
            <span>complete purchasing process </span> with the best price
          </p>
        </div>
      </div>
    </div>
  );
};

export default IntroFeature;
