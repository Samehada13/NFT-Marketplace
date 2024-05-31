import React from 'react';
import Style from '../styles/subscription.module.css';
import { useRouter } from 'next/router';
import { Button } from '../components/componentIndex';

const terms = () => {
    const router = useRouter();

  return (
    <div className={Style.subscription}>
      <div className={Style.subscription_box}>
        <div className={Style.subscription_box_info}>
          <h1>Terms of Service</h1>
          <p>
            Welcome to An NFT Marketplace for Graphic Artists in Bicol Region. These Terms of Service govern your access to and use of our NFT marketplace platform and related services. By accessing or using our platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
          </p>
          <h2>1. Acceptance of Terms:</h2>
          <p>
            By registering for an account or using our NFT marketplace, you agree to comply with and be legally bound by these Terms and our Privacy Policy. If you are using our services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
          </p>
          <h2>2. Eligibility:</h2>
          <p>
            To use our NFT marketplace, you must be at least 18 years old and have the legal capacity to enter into a binding agreement. By using our platform, you represent and warrant that you meet these requirements.
          </p>
          <h2>3. Account Registration:</h2>
          <p>
            To access certain features of our NFT marketplace, you must register for an account. You agree to provide accurate and complete information during the registration process and to keep your account information up to date. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          <h2>4. Use of the Platform:</h2>
          <p>
            You agree to use our NFT marketplace only for lawful purposes and in accordance with these Terms. You agree not to engage in any activity that:
          </p>
          <ul>
            <li>Violates any applicable laws or regulations.</li>
            <li>Infringes on the intellectual property or other rights of others.</li>
            <li>Is harmful, fraudulent, deceptive, or otherwise objectionable.</li>
            <li>Interferes with the operation or security of our platform.</li>
          </ul>
          <h2>5. NFT Transactions:</h2>
          <p>
            Our platform allows you to buy, sell, and trade NFTs. By conducting transactions on our platform, you agree to the following:
          </p>
          <ul>
            <li>All transactions are final and non-reversible.</li>
            <li>You are solely responsible for the accuracy of transaction details, including wallet addresses.</li>
            <li>We are not responsible for any losses or damages resulting from incorrect transaction details or other user errors.</li>
          </ul>
          <h2>6. Fees:</h2>
          <p>
            We may charge fees for certain transactions or services on our platform. By using our services, you agree to pay any applicable fees and understand that these fees may change from time to time. Fee information will be clearly communicated to you before you complete a transaction.
          </p>
          <h2>7. Intellectual Property:</h2>
          <p>
            All content and materials on our platform, including but not limited to text, graphics, logos, and software, are the property of [NFT Marketplace Name] or its licensors and are protected by intellectual property laws. You may not use, reproduce, or distribute any content or materials without our prior written permission.
          </p>
          <h2>8. Termination:</h2>
          <p>
            We reserve the right to suspend or terminate your account and access to our platform at any time, with or without cause, and with or without notice. Upon termination, you must cease all use of our platform and any associated services.
          </p>
          <h2>9. Disclaimers:</h2>
          <p>
            Our platform is provided on an "as-is" and "as-available" basis. We make no warranties or representations, express or implied, regarding the operation or availability of our platform, or the accuracy, completeness, or reliability of any content or information provided through our platform.
          </p>
          <h2>10. Limitation of Liability:</h2>
          <p>
            To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (i) your use of or inability to use our platform; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein; (iii) any interruption or cessation of transmission to or from our platform; (iv) any bugs, viruses, trojan horses, or the like that may be transmitted to or through our platform by any third party; or (v) any errors or omissions in any content or for any loss or damage incurred as a result of your use of any content posted, emailed, transmitted, or otherwise made available through our platform.
          </p>
          <h2>11. Governing Law:</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of this Jurisdiction (insert link of my Jurisdiction), without regard to its conflict of law principles. Any disputes arising out of or relating to these Terms or your use of our platform shall be resolved exclusively in the courts located in this Jurisdiction (insert link of my Jurisdiction).
          </p>
          <h2>12. Changes to Terms:</h2>
          <p>
            We reserve the right to modify or update these Terms at any time. Any changes will be effective immediately upon posting the revised Terms on our website. Your continued use of our platform following the posting of changes constitutes your acceptance of such changes.
          </p>
          <h2>13. Contact Us:</h2>
          <p>
            If you have any questions or concerns about these Terms, please contact us at this page (insert contactUs page link).
          </p>
          <p>
            By using our NFT marketplace, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
          <div className={Style.buttonRight}>
            <Button btnName="Back to home" handleClick={() => router.push('/')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default terms;
