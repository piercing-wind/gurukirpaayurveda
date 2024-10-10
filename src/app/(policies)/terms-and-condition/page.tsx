import { Footer } from "@/components/footer";
import { HeaderWithSessionProvider } from "@/components/headerWithSessionProvider";

const TermsAndConditionsPage = () => {
  return (
    <main className="w-full">
      <HeaderWithSessionProvider />
      <section className="p-6 w-full md:w-[70%] mx-auto">
         <h1 className=" text-gold text-3xl mb-8 font-bold">Terms & Conditions</h1>
        <h2 className="text-2xl font-bold text-gold mb-2">1. Introduction</h2>
        <p className="text-lg mb-4">
          Welcome to Gurukirpa Ayurveda. By accessing or using our website and services, you agree to comply with and be bound by the following Terms and Conditions. Please review these terms carefully. If you do not agree with any of these terms, you are prohibited from using this site or our services.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">2. Eligibility</h2>
        <p className="text-lg mb-4">
          By using our website and services, you affirm that you are at least 18 years old and have the legal authority to enter into this agreement. If you are under 18, you must use this website with the involvement of a parent or guardian.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">3. Services and Products</h2>
        <p className="text-lg mb-4">
          Gurukirpa Ayurveda offers health products, consultations, and holistic healing services. Our products and services are intended for general well-being and do not claim to cure, treat, or diagnose any diseases or health conditions. Please consult a healthcare professional before starting any new health regimen.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">4. Use of Website</h2>
        <h3 className="text-xl font-semibold mb-2">Prohibited Activities:</h3>
        <p className="text-lg mb-4">
          You agree not to use this website for any unlawful or prohibited activities. You may not attempt to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Breach security measures or interfere with the proper functioning of the website.</li>
          <li>Collect data about other users without their consent.</li>
          <li>Use the website for fraudulent or deceptive activities.</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Accuracy of Information:</h3>
        <p className="text-lg mb-4">
          We strive to ensure that all the information on our website is accurate, but we do not guarantee its completeness or accuracy. Any reliance you place on such information is strictly at your own risk.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">5. Purchasing Products</h2>
        <h3 className="text-xl font-semibold mb-2">Pricing:</h3>
        <p className="text-lg mb-4">
          All prices displayed on the website are in  ₹ &#40; INR &#41; and may be subject to taxes or additional charges based on your location. We reserve the right to change prices at any time.
        </p>
        <h3 className="text-xl font-semibold mb-2">Product Descriptions:</h3>
        <p className="text-lg mb-4">
          We aim to provide accurate product descriptions, but we do not warrant that the descriptions, colors, or other content are error-free or complete.
        </p>
        <h3 className="text-xl font-semibold mb-2">Order Acceptance:</h3>
        <p className="text-lg mb-4">
          We reserve the right to refuse any order for any reason, including but not limited to product availability, errors in the description or price of the product, or errors in your order.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">6. Consultations</h2>
        <p className="text-lg mb-4">
          Gurukirpa Ayurveda offers Health consultations, which are for informational purposes only and should not be considered a substitute for professional medical advice. You are advised to consult your healthcare provider before making decisions based on these consultations.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">7. Return and Refund Policy</h2>
        <h3 className="text-xl font-semibold mb-2">Products:</h3>
        <p className="text-lg mb-4">
          We offer returns and exchanges on select products within 7 days of purchase, provided they are unused and in their original packaging. Certain health products may not be eligible for returns due to hygiene and safety concerns.
        </p>
        <h3 className="text-xl font-semibold mb-2">Services:</h3>
        <p className="text-lg mb-4">
          Refunds for consultations and other services are only available if cancellations are made at least 24 hours prior to the scheduled appointment. No refunds will be given for services already rendered.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">8. Intellectual Property</h2>
        <p className="text-lg mb-4">
          All content on this website, including but not limited to text, graphics, logos, and images, is the property of Gurukirpa Ayurveda and protected by intellectual property laws. You may not reproduce, distribute, or otherwise exploit the content without express written permission from Gurukirpa Ayurveda.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">9. Limitation of Liability</h2>
        <p className="text-lg mb-4">
          To the fullest extent permitted by law, Gurukirpa Ayurveda shall not be liable for any indirect, incidental, special, or consequential damages that result from the use or inability to use our products or services. Our liability shall not exceed the amount paid for the product or service in question.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">10. Indemnification</h2>
        <p className="text-lg mb-4">
          You agree to indemnify, defend, and hold harmless Gurukirpa Ayurveda, its officers, employees, and agents from any and all claims, liabilities, damages, losses, or expenses arising out of your use of the website, products, or services, or your violation of these Terms and Conditions.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">11. Governing Law</h2>
        <p className="text-lg mb-4">
        These Terms and Conditions shall be governed by and construed in accordance with the laws of Punjab, India, without regard to its conflict of law provisions. Any disputes arising from these Terms will be settled in the courts of Punjab, India.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">12. Changes to Terms and Conditions</h2>
        <p className="text-lg mb-4">
          We reserve the right to change these Terms and Conditions at any time without prior notice. Any changes will be posted on this page, and your continued use of the website or services constitutes acceptance of those changes.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">13. Contact Us</h2>
        <p className="text-lg mb-4">
          If you have any questions about these Terms and Conditions, please contact us at:
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

export default TermsAndConditionsPage;
