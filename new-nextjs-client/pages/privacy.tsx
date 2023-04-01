import styles from './privacy.module.scss';
import MainLayout from '@components/MainLayout/MainLayout';
import { ReactNode } from 'react';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function Privacy() {
  return (
    <div className={cx('container')}>
      <div className={cx('content')}>
        <h1>Privacy Policy of Anteater Pathway</h1>

        <p>
          Anteater Pathway operates the www.anteaterpathway.com website, which
          provides the degree planning service for UCI students.
        </p>

        <p>
          This page is used to inform website visitors regarding our policies
          with the collection, use, and disclosure of Personal Information if
          anyone decided to use our Service, the Anteater Pathwy website.
        </p>

        <p>
          If you choose to use our Service, then you agree to the collection and
          use of information in relation with this policy. The Personal
          Information that we collect are used for providing the Service. We
          will not use or share your information with anyone except as described
          in this Privacy Policy.
        </p>

        <h2>Information Collection and Use</h2>

        <p>
          In order to provide the loading and saving planner, we use UID
          provided by Google Firebase Authentication service. The UID is a
          uniquely generated random character token that is not personal
          identifiable data, such as emails or names.
        </p>

        <h2>Log Data</h2>

        <p>
          We want to inform you that whenever you visit our Service, we receive
          information that your browser.
        </p>

        <h2>Cookies</h2>

        <p>
          Cookies are files with small amount of data that is commonly used an
          anonymous unique identifier. These are sent to your browser from the
          website that you visit and are stored on your computer&apos;s hard
          drive.
        </p>

        <p>Our website does not use these &quot;cookies&quot;.</p>

        <p>
          For more general information on cookies, please read{' '}
          <a href="https://www.generateprivacypolicy.com/#cookies">
            &quot;Cookies&quot; article from the Privacy Policy Generator
          </a>
          .
        </p>

        <h2>Service Providers</h2>

        <p>
          We may employ third-party companies and individuals due to the
          following reasons:
        </p>

        <ul>
          <li>To facilitate our Service;</li>
          <li>To provide the Service on our behalf;</li>
          <li>To perform Service-related services; or</li>
          <li>To assist us in analyzing how our Service is used.</li>
        </ul>

        <p>
          We want to inform our Service users that these third parties have
          access to your Personal Information. The reason is to perform the
          tasks assigned to them on our behalf. However, they are obligated not
          to disclose or use the information for any other purpose.
        </p>

        <h2>Security</h2>

        <p>
          We value your trust in providing us your Personal Information, thus we
          are striving to use commercially acceptable means of protecting it.
          But remember that no method of transmission over the internet, or
          method of electronic storage is 100% secure and reliable, and we
          cannot guarantee its absolute security.
        </p>

        <h2>Links to Other Sites</h2>

        <p>
          Our Service may contain links to other sites. If you click on a
          third-party link, you will be directed to that site. Note that these
          external sites are not operated by us. Therefore, we strongly advise
          you to review the Privacy Policy of these websites. We have no control
          over, and assume no responsibility for the content, privacy policies,
          or practices of any third-party sites or services.
        </p>

        <p>Children&apos;s Privacy</p>

        <p>
          Our Services do not address anyone under the age of 13. We do not
          knowingly collect personal identifiable information from children
          under 13. In the case we discover that a child under 13 has provided
          us with personal information, we immediately delete this from our
          servers. If you are a parent or guardian and you are aware that your
          child has provided us with personal information, please contact us so
          that we will be able to do necessary actions.
        </p>

        <h2>Changes to This Privacy Policy</h2>

        <p>
          We may update our Privacy Policy from time to time. Thus, we advise
          you to review this page periodically for any changes. We will notify
          you of any changes by posting the new Privacy Policy on this page.
          These changes are effective immediately, after they are posted on this
          page.
        </p>

        <h2>Contact Us</h2>

        <p>
          If you have any questions or suggestions about our Privacy Policy, do
          not hesitate to contact us at kunhpark15@gmail.com.
        </p>
      </div>
    </div>
  );
}

Privacy.getLayout = function getLayout(page: ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
