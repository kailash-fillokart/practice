import React, { useEffect } from 'react';
import styles from '../../styles/About.module.css';
import commonstyles from '../../styles/CommonStyles.module.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Introduction = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div data-aos='fade-up' className={styles.intro_container}>
      <div className={commonstyles.title}>
        <h1>What Do We Do?</h1>
      </div>
      <div className={styles.introduction}>
        <p>
          fillOkart is an emerging e-procurement service provider that enables
          tech-based services for clients and their assets and consumable
          requirements.
        </p>
        <p>
          We seek to combine proportionate amount of state-of-the art
          technology, our wide networks and customers needs to offer our online
          based e-procurement services, integrated with our innovation and
          unparalleled quality.
        </p>
        <p>
          We are in the e-procurement segment with our most authentic and
          effective solutions with expertise in the following Office supplies:-
          Housekeeping, Pantry, Stationery, IT Products.
        </p>
      </div>
    </div>
  );
};

export default Introduction;
