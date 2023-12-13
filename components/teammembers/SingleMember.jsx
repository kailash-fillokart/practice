import React from 'react';
import styles from '../../styles/Team.module.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import comstyles from '../../styles/CommonStyles.module.css';
import { Link } from '@material-ui/core';


const SingleMember = ({
  name,
  position,
  image,
  linkedinLink,
  angelistLink,
}) => {
  return (
    <div className={styles.profile_card}>
      <div className={styles.img}>
        <img src={image} alt='boy1' />
      </div>
      <div className={styles.caption}>
        <h3> {name} </h3>
        <p> {position} </p>
        <div className={styles.social_links}>
          <Link href={linkedinLink} target='_blank'>
            <div className={comstyles.socialicon}>
              {' '}
              <LinkedInIcon color='primary' fontSize='large' />
            </div>
          </Link>
          {name === 'Syed Imran' && (
            <Link href={angelistLink} target='_blank'>
              <div className={comstyles.socialicon}>
                {' '}
                <FontDownloadIcon style={{ color: 'white' }} fontSize='large' />
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleMember;
