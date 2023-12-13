import React from 'react';
import Introduction from './Introduction';
import Features from './Features';
import styles from '../../styles/About.module.css';
import IntroFeature from './IntroFeature';


const About = () => {
  return (
    <div className={styles.about_container} >
      <Introduction />
      <IntroFeature/>
      <Features />
    </div>
  );
};

export default About;
