import React from 'react';
import { useRouter } from 'next/router';
import heroimg from '../../logos/hero.png';
import styles from '../../styles/Hero.module.css';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {
  const router = useRouter();
   React.useEffect(() => {
     Aos.init();
   }, []);

  return (
    <div className={styles.heroimg_container} >
      <img src={heroimg} alt='hero img' className={styles.heroimg} />
      <div className={styles.hero_text}>
        <h1 data-aos='fade-right'>
          {' '}
          LOOKING &nbsp; FOR &nbsp;A&nbsp; STANDARD &nbsp;PROCUREMENT&nbsp;{' '}
          <span>AT&nbsp; BEST&nbsp; POSSIBLE&nbsp; PRICES</span> ?
        </h1>
        <p data-aos='fade-right'>
          Now get your supplies without any struggle at FillOkart !
        </p>
        <div data-aos='fade-right'>
          <button
            onClick={() => {
              router.push('/ContactUs');
            }}
            type='submit'
            className={styles.herobtn}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
