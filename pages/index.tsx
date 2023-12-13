  import Head from 'next/head';
import HeaderAndFooterLayout from '../layouts/HeaderAndFooterLayout';
import React from 'react';
import { InferGetStaticPropsType } from 'next';
import TeamMembers from '../components/teammembers';
import Hero from '../components/hero';
import About from '../components/about';
import Clients from '../components/Clients';

function Home({
  COMPANY_NAME,
}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <div
      style={{
        overflowX: 'hidden',
      }}
    >
      <Head>
        <title>{COMPANY_NAME} &nbsp; - &nbsp; Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
        <div
          style={{
            display: 'grid',
            justifyContent: 'center',
            gap: '50px',
            justifySelf: 'center',
            overflow: 'hidden',
          }}
        >
          <Hero />

          <About />

          <Clients />

          <TeamMembers />
        </div>
    </div>
  );
}

export async function getStaticProps() {
  const { COMPANY_NAME } = process?.env;

  return {
    props: {
      COMPANY_NAME:null
    },
  };
}

export default Home;
Home.Layout = HeaderAndFooterLayout;
