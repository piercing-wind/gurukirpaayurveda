import { Footer } from "@/components/footer";
import { HeaderWithSessionProvider } from "@/components/headerWithSessionProvider";

const PrivacyPolicyPage = () => {
  return (
    <main className="w-full">
      <HeaderWithSessionProvider />
      <section className="p-6 w-full md:w-[70%] mx-auto">
         <h1 className="text-3xl font-bold text-gold mb-8">Privacy Policy</h1>
        <h2 className="text-2xl font-bold text-gold mb-2">1. Introduction</h2>
        <p className="text-lg mb-4">
          Gurukirpa Ayurveda ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services. By using our website, you agree to the collection and use of information as described in this policy.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">2. Information We Collect</h2>
        <p className="text-lg mb-4">
          We collect the following types of information from you:
        </p>

        <h3 className="text-xl font-semibold mb-2">a. Personal Information</h3>
        <p className="text-lg mb-4">
          Personal information refers to data that can identify you as an individual, such as:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Billing and shipping address</li>
          <li>Payment information (processed via third-party payment gateways)</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">b. Non-Personal Information</h3>
        <p className="text-lg mb-4">
          Non-personal information includes data that does not directly identify you. We may collect the following:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>IP address</li>
          <li>Browser type and version</li>
          <li>Device information (such as operating system)</li>
          <li>Pages you visit on our website</li>
          <li>Time spent on the website</li>
          <li>Referral source (how you arrived at our site)</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">c. Cookies and Tracking Technologies</h3>
        <p className="text-lg mb-4">
          We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small files stored on your device that help us track certain information, such as your preferences and activity on the site. You can manage your cookie preferences through your browser settings.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">3. How We Use Your Information</h2>
        <p className="text-lg mb-4">
          We use the information we collect for the following purposes:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>To provide our services: This includes processing orders, responding to inquiries, and managing customer relationships.</li>
          <li>To improve user experience: We analyze website usage to enhance the functionality and design of our website.</li>
          <li>To process payments: Payment details are used solely for completing transactions and are processed by secure third-party payment gateways.</li>
          <li>To communicate with you: We may send promotional emails, newsletters, or updates about our services. You can opt out of receiving these communications at any time.</li>
          <li>To comply with legal obligations: We may use or disclose your information as required by law or in response to legal requests.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gold mb-2">4. How We Protect Your Information</h2>
        <p className="text-lg mb-4">
          We take the security of your personal information seriously. We implement appropriate physical, electronic, and managerial measures to protect your data from unauthorized access, disclosure, or destruction. These measures include:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>SSL encryption: Ensures that data transmitted between your browser and our website is encrypted.</li>
          <li>Access controls: Personal information is accessible only to authorized personnel who need it to perform their duties.</li>
          <li>Data minimization: We only collect the information necessary for the purposes outlined in this policy.</li>
        </ul>
        <p className="text-lg mb-4">
          However, no online data transmission is 100% secure, and while we strive to protect your information, we cannot guarantee its absolute security.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">5. Third-Party Services</h2>
        <p className="text-lg mb-4">
          We may share your information with third-party service providers that assist us in operating our website or conducting business. These services include:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Payment processing: We use secure third-party payment gateways to handle transactions. These providers may have access to your payment information, but only to the extent necessary to complete the transaction.</li>
          <li>Analytics services: We use third-party analytics tools, such as Google Analytics, to analyze website traffic and user behavior.</li>
        </ul>
        <p className="text-lg mb-4">
          We ensure that all third-party providers comply with strict data protection standards, and they are prohibited from using your personal data for any other purpose.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">6. Sharing Your Information</h2>
        <p className="text-lg mb-4">
          We will not sell, rent, or trade your personal information to third parties. We may, however, share your data in the following circumstances:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>With your consent: We may share your information when you explicitly grant us permission.</li>
          <li>For legal reasons: We may disclose your information to comply with legal obligations, such as responding to a court order or regulatory request.</li>
          <li>Business transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new ownership entity.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gold mb-2">7. Your Data Protection Rights</h2>
        <p className="text-lg mb-4">
          Depending on your location, you may have the following data protection rights:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Right to access: You can request a copy of the personal information we hold about you.</li>
          <li>Right to correction: You can request that we correct any inaccuracies in your personal data.</li>
          <li>Right to erasure ("Right to be Forgotten"): You may request that we delete your personal information, provided there are no legal obligations requiring us to retain it.</li>
          <li>Right to object: You have the right to object to our processing of your data under certain conditions.</li>
          <li>Right to data portability: You can request that we transfer your data to another organization or directly to you.</li>
        </ul>
        <p className="text-lg mb-4">
          If you wish to exercise any of these rights, please contact us at {process.env.MAIL}. We will respond to your request within 30 days.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">8. Data Retention</h2>
        <p className="text-lg mb-4">
          We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Once your information is no longer needed, we will securely delete or anonymize it.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">9. Children’s Privacy</h2>
        <p className="text-lg mb-4">
          Our website and services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected such information, we will take steps to delete it.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">10. International Data Transfers</h2>
        <p className="text-lg mb-4">
          If you are accessing our website from outside of India, your data may be transferred to, stored, and processed in a different jurisdiction, which may have different data protection laws than your home country. By using our services, you consent to such data transfers.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">11. Changes to This Privacy Policy</h2>
        <p className="text-lg mb-4">
          We may update this Privacy Policy from time to time to reflect changes in our practices or legal obligations. Any changes will be posted on this page, and the updated policy will include the "Last Updated" date at the top. We encourage you to review this policy periodically to stay informed about how we protect your information.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">12. Contact Us</h2>
        <p className="text-lg mb-4">
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
        </p>
        <p className="text-lg mb-2">
          Gurukirpa Ayurveda
        </p>
        <p className="text-lg mb-4">
          <span className="text-gold">Email: </span> {process.env.MAIL}<br />
          <span className="text-gold">Phone: </span>+91 95136 51313<br />
          <span className="text-gold">Address:</span> 2/2B, Darshan Avenue, Daburji Byepass, SpeedPost Centre BDC, Amritsar -I, Amritsar- 143001, Punjab

        </p>
      </section>
      <Footer />
    </main>
  );
};

export default PrivacyPolicyPage;
