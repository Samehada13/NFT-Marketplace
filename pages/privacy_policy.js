

import React from 'react';
import { useRouter } from 'next/router';
import Style from '../styles/subscription.module.css';
import { Button } from '../components/componentIndex';

const Subscription = () => {

    const router = useRouter();

  return (
    
    <div className={Style.subscription}>
      <div className={Style.subscription_box}>
        <div className={Style.subscription_box_info}>
          <h1>Privacy and Policy</h1>
          <p>
            Thus, by submitting to us your personal data in the framework of An NFT Marketplace for Graphic Artists in Bicol Region (as a part of our “An NFT marketplace platform and related services”), you also agree upon the practices described here as well as what I have mentioned before this part. As your personal data and privacy guardian we are 120% committed to the protection and sanctity of any information that passes through us.
          </p>
          <p>
            Your use of this NFT platform is your acknowledgment that your information will be collected, used, and disclosed as set out in this Privacy Policy. If the users do not want to be a party to any policies, then it is advised not to avail the service.
          </p>

          <h2>1. Information We Collect:</h2>
          <ul>
            <li>
              <strong>Account Information:</strong> Personal information includes but is not limited to name, email address, username, password, and any other information which may be required from you when you are creating an account on our platform.
            </li>
            <li>
              <strong>Transaction Information:</strong> Every time you carry out buying, selling or swapping of NFTs on our platform, we collect details of the transactions including the NFTs, the transactions, amounts of transactions and the various wallets and any other related information to the transactions.
            </li>
            <li>
              <strong>Communication Information:</strong> This also applies to information received from your side including emails, messages, and support tickets among others.
            </li>
            <li>
              <strong>Device and Usage Information:</strong> We may also collect further information about the device and the behavior on the platform, such as the IP address, browser type, and device type, among others, and the history of usage.
            </li>
          </ul>

          <h2>2. How We Use Your Information:</h2>
          <ul>
            <li>
              For the establishment and development of the platform for the NFT marketplace.
            </li>
            <li>
              So that you are able to trade and for us to be able to inform you about your account and the transactions you are carrying out.
            </li>
            <li>
              To help define your interests and to be able to offer you more suitable experience and products.
            </li>
            <li>
              For technical issue identification, prevention, or management or dealing with any fraudulent cases.
            </li>
            <li>
              As a way of satisfying the legal and regulatory demands.
            </li>
          </ul>

          <h2>3. Data Security:</h2>
          <p>
            That the identifiable personal information we collect should be protected from unauthorized access, disclosure, alteration or destruction. These strategies consist of data encryption, restricted access to the data, and security audits.
          </p>

          <h2>4. Third-Party Services:</h2>
          <p>
            We may employ third party service providers and use their tools as we will operate the NFT marketplace, and may disclose your information to them in this regard. However, we make sure that any third party with whom we interact with is credible as per privacy and security measures and practices.
          </p>

          <h2>5. Data Retention:</h2>
          <p>
            The information will be stored as long as it is needed for the purposes mentioned in this Privacy Policy or for the period required or allowed by the law.
          </p>

          <h2>6. Your Rights:</h2>
          <p>
            Specifically, you have a right of access, amendment, rectification, deletion or erasure, where the law allows. There are also circumstances that give you the right to oppose or limit certain processing activities. To exercise these rights, please use the contact details in this page.
          </p>

          <h2>7. Changes to this Policy:</h2>
          <p>
            We may modify this Privacy Policy occasionally, and whenever such modifications will be made, the new policy will be posted on our website without any delay. It is our policy to comply with the provisions of the Privacy Act as well as this Privacy Notice and to update this document periodically.
          </p>

          <h2>8. Contact Us:</h2>
          <p>
            If you have any inquiries or claims with regards to this Privacy Policy or our collection of data, you may contact us at the contact page.
          </p>

          <p>
            By using our NFT marketplace, you acknowledge that you have read and understood this Privacy Policy and agree to its terms and conditions.
          </p>
          <div className={Style.buttonRight}>
            <Button btnName="Back to home" handleClick={() => router.push('/')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
