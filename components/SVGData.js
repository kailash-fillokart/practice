import { Typography } from '@mui/material';
import * as React from 'react';
import styles from '../styles/CommonStyles.module.css';

const SVGData = ({ SVG, text }) => {
  return (
    <div className={styles.svg}>
      <Typography
        sx={{
          color: 'rgb(170, 160, 160)',
          fontSize: '1.6rem',
          fontWeight: '500',
          letterSpacing: '0.6rem',
        }}
      >
        {text}{' '}
      </Typography>
      <img src={SVG} />
    </div>
  );
};

export default SVGData;
