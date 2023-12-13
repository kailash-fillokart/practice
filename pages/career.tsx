import React, { useEffect } from 'react';
import HeaderAndFooterLayout from '../layouts/HeaderAndFooterLayout';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { Typography, Grid } from '@mui/material';
import styles from '../styles/Careers.module.css';
import { jobOpenings } from '../components/Utils/constants';
import Aos from 'aos';
import 'aos/dist/aos.css';

const image = require('../images/careers.png');

const career = ({
  COMPANY_NAME,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className={styles.careers_container}>
      <Head>
        <title>{COMPANY_NAME} &nbsp; - &nbsp; Careers</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
        <Typography
          className={styles.heading}
          data-aos='fade-up'
          data-aos-offset='500'
          data-aos-easing='ease-in-sine'
          data-aos-anchor-placement='top-bottom'
        >
          CAREERS AT FILLOKART
        </Typography>
        <Typography
          className={styles.sub_heading}
          data-aos='fade-left'
          data-aos-offset='300'
          data-aos-easing='ease-in-sine'
          style={{ color: 'white' }}
        >
          Where Passion Meets Profession
        </Typography>
      </div>

      <div style={{ width: 'inherit' }} className={styles.intro_container}>
        <div className={styles.intro_container_left}>
          <img
            data-aos='zoom-in'
            data-aos-offset='300'
            data-aos-easing='ease-in-sine'
            alt='career-img'
            src={image}
            className={styles.career_image}
          />
        </div>
        <div className={styles.intro_container_right}>
          <Typography
            className={styles.intro_heading}
            data-aos='fade-left'
            data-aos-offset='300'
            data-aos-easing='ease-in-sine'
          >
            Join fillOkart: Where Futures Are Filled With Possibilities.
          </Typography>
          <Typography className={styles.intro_text}>
            At fillOkart, we believe in cultivating an environment where talents
            flourish, innovations thrive, and dreams become reality. We're not
            just in the business of delivering top-notch products, we're in the
            business of shaping futures.
          </Typography>
        </div>
      </div>
      <div className={styles.openings_container}>
        <Typography data-aos='fade-up' className={styles.sub_heading}>
          Current Openings
        </Typography>

        <div className={styles.role_container}>
          {jobOpenings.map((job, index) => {
            return (
              <div key={index}>
                <Typography className={styles.position}>{job.title}</Typography>

                <div className={styles.features_container}>
                  {job.responsibilities && (
                    <div className={styles.role}>
                      <div className={styles.role_sub_heading}>
                        <Typography className={styles.role_sub_heading_text}>
                          Responsibilities:
                        </Typography>
                      </div>
                      <div className={styles.role_text_container}>
                        {job.responsibilities?.map((responsibility, i) => (
                          <div
                            key={i}
                            style={{ display: 'flex', gap: '0.5rem' }}
                            data-aos='fade-left'
                          >
                            <Typography className={styles.role_text}>
                              •
                            </Typography>
                            <Typography className={styles.role_text}>
                              {responsibility}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {job.qualifications && (
                    <div className={styles.role}>
                      <div className={styles.role_sub_heading}>
                        <Typography className={styles.role_sub_heading_text}>
                          Qualifications:
                        </Typography>
                      </div>
                      <div className={styles.role_text_container}>
                        {job.qualifications?.map((qualification, i) => (
                          <div
                            key={i}
                            style={{ display: 'flex', gap: '0.5rem' }}
                            data-aos='fade-left'
                          >
                            <Typography className={styles.role_text}>
                              •
                            </Typography>
                            <Typography className={styles.role_text}>
                              {qualification}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {job.requirements && (
                    <div className={styles.role}>
                      <div className={styles.role_sub_heading}>
                        <Typography className={styles.role_sub_heading_text}>
                          What We're Looking For:
                        </Typography>
                      </div>
                      <div className={styles.role_text_container}>
                        {job.requirements?.map((requirement, i) => (
                          <div
                            key={i}
                            style={{ display: 'flex', gap: '0.5rem' }}
                            data-aos='fade-left'
                          >
                            <Typography className={styles.role_text}>
                              •
                            </Typography>
                            <Typography className={styles.role_text}>
                              {requirement}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.openings_container}>
        <Typography className={styles.sub_heading} data-aos='fade-up'>
          How to Apply?
        </Typography>
        <Typography
          className={styles.role_sub_heading_text}
          style={{ textAlign: 'center', color: 'white' }}
          data-aos='fade-up'
        >
          If you're passionate about pushing the boundaries of Business
          Development /web development and want to be a part of a growing team,
          send your resume to help@fillokart.com
        </Typography>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { COMPANY_NAME } = process?.env;

  return {
    props: {
      COMPANY_NAME,
    },
  };
}

export default career;

career.Layout = HeaderAndFooterLayout;
