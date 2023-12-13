import React from 'react';
import styles from '../../styles/Team.module.css';
import comstyles from '../../styles/CommonStyles.module.css';
import { TeamMembersData } from '../Utils/constants';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SingleMember from './SingleMember';
import Aos from 'aos';
import 'aos/dist/aos.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f1f1f1',
    },
  },
});

const TeamMembers = () => {
  React.useEffect(() => {
    Aos.init();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <div data-aos='fade-up' className={styles.team_container}>
        <div className={comstyles.title}>
          <h1>Our Team</h1>
        </div>
        <div className={styles.team}>
          {TeamMembersData.map((person) => {
            return (
              <SingleMember
                key={person.id}
                name={person.name}
                position={person.position}
                image={person.image}
                linkedinLink={person.linkedinLink}
                angelistLink={person.angelistLink}
              />
            );
          })}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default TeamMembers;
