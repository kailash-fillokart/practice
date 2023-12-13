import React from 'react';
import { Typography, Container } from '@mui/material';
import HeaderAndFooterLayout from '../layouts/HeaderAndFooterLayout';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

const privacy = ({
  COMPANY_NAME,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Container>
      <Head>
        <title>{COMPANY_NAME} &nbsp; - &nbsp; PRIVACY POLICY</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Typography
        variant='h5'
        align='center'
        sx={{ m: 2, p: 1, mb: 3, color: '#93D8FF' }}
      >
        This Privacy Policy applies to the Fillokart.com
      </Typography>

      <div style={{ width: '90%', margin: '0 auto', color: 'silver' }}>
        <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
          Fillokart.com recognises the importance of maintaining your privacy.
          We value your privacy and appreciate your trust in us. This Policy
          describes how we treat user information we collect on
          http://www.fillokart.com and other offline sources. This Privacy
          Policy applies to current and former visitors to our website and to
          our online customers. By visiting and/or using our website, you agree
          to this Privacy Policy.
          <br />
          <br />
          <span style={{ fontWeight: 'bold', color: 'white' }}>
            Fillokart.com
          </span>{' '}
          is a property of Fillokart India Private Limited, an Indian Company
          registered under the Companies Act, 2013 having its registered office
          at 2nd Main, MES Main Road Mutyala Nagar Bangalore Karnataka, India
          560054.
        </p>
        <h5 style={{ color: 'white' }}>Information we collect</h5>
        <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
          <b style={{ color: '#DCDCDC' }}>Contact information.</b> We might
          collect your name, email, mobile number, phone number, street, city,
          state, pincode, country and IP address.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>
            Payment and billing information.
          </b>{' '}
          We might collect your billing name, billing address and payment method
          when you buy a product. We <b>NEVER</b> collect your credit card
          number or credit card expiry date or other details pertaining to your
          credit card on our website. Credit card information will be obtained
          and processed by our online payment partners.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>Information you post.</b> We collect
          information you post in a public space on our website or on a
          third-party social media site belonging to Fillokart.com.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>Demographic information.</b> We may
          collect demographic information about you, products you like, events
          you intend to participate in, products you buy, or any other
          information provided by your during the use of our website. We might
          collect this as a part of a survey also.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>Other information.</b> If you use our
          website, we may collect information about your IP address and the
          browser you're using. We might look at what site you came from,
          duration of time spent on our website, pages accessed or what site you
          visit when you leave us. We might also collect the type of mobile
          device you are using, or the version of the operating system your
          computer or device is running.
        </p>
        <h5 style={{ color: 'white' }}>
          We collect information in different ways.
        </h5>
        <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
          <b style={{ color: '#DCDCDC' }}>
            We collect information directly from you.
          </b>{' '}
          We collect information directly from you when you register on our
          website. We also collect information if you post a comment on our
          websites or ask us a question through phone or email.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>
            {' '}
            We collect information from you passively.
          </b>{' '}
          We use tracking tools like Google Analytics, Google Webmaster, browser
          cookies and web beacons for collecting information about your usage of
          our website.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>
            We get information about you from third parties.
          </b>{' '}
          For example, if you use an integrated social media feature on our
          websites. The third-party social media site will give us certain
          information about you. This could include your name and email address.
        </p>
        <h5 style={{ color: 'white' }}>Use of your personal information.</h5>
        <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
          <b style={{ color: '#DCDCDC' }}>We use information to contact you:</b>{' '}
          We might use the information you provide to contact you for
          confirmation of a purchase on our website or for other promotional
          purposes.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>
            We use information to respond to your requests or questions.
          </b>{' '}
          We might use your information to confirm your registration for an
          event or contest.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>
            {' '}
            We use information to improve our products and services.
          </b>{' '}
          We might use your information to customize your experience with us.
          This could include displaying content based upon your preferences.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>
            We use information to look at site trends and customer interests.
          </b>{' '}
          We may use your information to make our website and products better.
          We may combine information we get from you with information about you
          we get from third parties.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>
            We use information for security purposes.{' '}
          </b>{' '}
          We may use information to protect our company, our customers, or our
          websites.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>
            We use information for marketing purposes.
          </b>{' '}
          We might send you information about special promotions or offers. We
          might also tell you about new features or products. These might be our
          own offers or products, or third-party offers or products we think you
          might find interesting.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>
            We use information to send you transactional communications.
          </b>{' '}
          We might send you emails or SMS about your account.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>
            {' '}
            We use information as otherwise permitted by law.
          </b>
        </p>
        <h5 style={{ color: 'white' }}>
          Sharing of information with third-parties
        </h5>
        <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
          <b style={{ color: '#DCDCDC' }}>
            We will share information with third parties who perform services on
            our behalf
          </b>
          . We share information with vendors who help us manage our online
          registration process or payment processors or transactional message
          processors. Some vendors may be located outside of India.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>
            We will share information with the event organizers
          </b>
          . We share your information with event organizers and other parties
          responsible for fulfilling the purchase obligation. The event
          organizers and other parties may use the information we give them as
          described in their privacy policies.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>
            We will share information with our business partners
          </b>{' '}
          . This includes a third party who provide or sponsor an event, or who
          operates a venue where we hold events. Our partners use the
          information we give them as described in their privacy policies.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>
            We may share information if we think we have to in order to comply
            with the law or to protect ourselves.
          </b>{' '}
          We will share information to respond to a court order or subpoena. We
          may also share it if a government agency or investigatory body
          requests. Or we might also share information when we are investigating
          potential fraud.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>
            We may share information with any successor to all or part of our
            business
          </b>{' '}
          . For example, if part of our business is sold we may give our
          customer list as part of that transaction.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>
            We may share your information for reasons not described in this
            policy
          </b>{' '}
          We will tell you before we do this.
        </p>
        <h5 style={{ color: 'white' }}>Email Opt-Out</h5>
        <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
          <b style={{ color: '#DCDCDC' }}>
            You can opt out of receiving our marketing emails
          </b>{' '}
          . To stop receiving our promotional emails, please email
          help@fillokart.com. It may take about ten days to process your
          request. Even if you opt out of getting marketing messages, we will
          still be sending you transactional messages through email and SMS
          about your purchases.
          <br />
          <b style={{ color: '#DCDCDC' }}>Third party sites</b>
          <br />
          If you click on one of the links to third party websites, you may be
          taken to websites we do not control. This policy does not apply to the
          privacy practices of those websites. Read the privacy policy of other
          websites carefully. We are not responsible for these third party
          sites.
          <br></br>
          <b style={{ color: '#DCDCDC' }}>Grievance Officer</b>
          <br></br>
          In accordance with <b>Information Technology Act 2000</b> and rules
          made there under, the name and contact details of the Grievance
          Officer are provided below:
          <br></br>
          <b style={{ color: '#DCDCDC' }}>Technology Team</b>
          <br></br>
          <b style={{ color: '#DCDCDC' }}>Email: help@fillokart.com</b>
          <br />
          If you have any questions about this Policy or other privacy concerns,
          you can also email us at{' '}
          <b style={{ color: '#DCDCDC' }}> help@fillokart.com</b>
        </p>
        <h5 style={{ color: 'white' }}>Updates to this policy</h5>
        <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
          This Privacy Policy was last updated on 31.03.2021. From time to time
          we may change our privacy practices. We will notify you of any
          material changes to this policy as required by law. We will also post
          an updated copy on our website. Please check our site periodically for
          updates.
        </p>
        <h5 style={{ color: 'white' }}> Jurisdiction</h5>
        <p style={{ textAlign: 'justify', textJustify: 'inter-word' }}>
          If you choose to visit the website, your visit and any dispute over
          privacy is subject to this Policy and the website's terms of use. In
          addition to the foregoing, any disputes arising under this Policy
          shall be governed by the laws of India.
        </p>
      </div>
    </Container>
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
export default privacy;

privacy.Layout = HeaderAndFooterLayout;
