import { Footer } from "@/components/footer";
import { HeaderWithSessionProvider } from "@/components/headerWithSessionProvider";

const RefundPolicyPage = () => {
  return (
    <main className="w-full">
      <HeaderWithSessionProvider />
      <section className="p-6 w-full md:w-[70%] mx-auto">
        <h1 className="text-4xl font-bold text-gold mb-4">Gurukirpa Ayurveda Refund Policy</h1>
        <p className="text-lg mb-4">
          At Gurukirpa Ayurveda, we take immense pride in the quality of our products and services. Our goal is to ensure that every customer is completely satisfied with their purchase. However, we understand that there may be circumstances where you need to request a refund, exchange, or cancellation. This policy outlines the guidelines for refunds and exchanges in detail to provide clarity and ensure a seamless customer experience.
        </p>
        <h2 className="text-2xl font-bold text-gold mb-2">1. General Refund Policy Guidelines</h2>
        <h3 className="text-xl font-semibold mb-2">1.1. Applicability:</h3>
        <p className="text-lg mb-4">
          This refund policy applies to all products, services, and digital offerings purchased directly from Gurukirpa Ayurveda through our official website, physical stores, or authorized outlets. If you have purchased through a third party, please refer to their refund policies.
        </p>
        <h3 className="text-xl font-semibold mb-2">1.2. Proof of Purchase:</h3>
        <p className="text-lg mb-4">
          Refunds and exchanges will only be processed upon receipt of the original proof of purchase (invoice, order number, or receipt).
        </p>
        <h3 className="text-xl font-semibold mb-2">1.3. Timeline:</h3>
        <p className="text-lg mb-4">
          Refund requests must be initiated within 7 days of receiving the product or service. Beyond this time frame, the product or service is considered final, and no refunds or exchanges will be entertained.
        </p>
        <h2 className="text-2xl font-bold text-gold mb-2">2. Product Return and Refund Eligibility</h2>
        <h3 className="text-xl font-semibold mb-2">2.1. Eligibility Criteria for Refunds:</h3>
        <div className="text-lg mb-4">
          To be eligible for a refund, the product must meet the following conditions:
          <ul className="list-disc list-inside">
            <li>The product must be unused, unopened, and in its original packaging.</li>
            <li>The product must be in the same condition as when it was received.</li>
            <li>The product must be accompanied by the original receipt, invoice, or proof of purchase.</li>
          </ul>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">2.2. Damaged or Defective Products:</h3>
        <p className="text-lg mb-4">
          If you receive a damaged or defective product, you are entitled to a full refund or exchange. Please initiate your request within 3 days of receiving the item. A refund or exchange will only be processed after verification of the defect or damage.
        </p>
        <h3 className="text-xl font-semibold mb-2">2.3. Services:</h3>
        <p className="text-lg mb-4">
          Refunds for services such as Ayurvedic consultations, healing sessions, and therapies are available only if the service has not been fully rendered and only within 48 hours before the scheduled session. Once the service has been provided, it is non-refundable.
        </p>
        <h2 className="text-2xl font-bold text-gold mb-2">3. Refund Process</h2>
        <h3 className="text-xl font-semibold mb-2">3.1. How to Initiate a Refund:</h3>
        <div className="text-lg mb-4">
          To request a refund, please contact our Customer Support Team at {process.env.MAIL}. Include the following details:
          <ul className="list-disc list-inside">
            <li>Order Number.</li>
            <li>Reason for Refund Request.</li>
            <li>Photo or evidence of product condition (if applicable).</li>
          </ul>
          Once your request is received, we will review it and notify you of our decision. For physical products, you may be required to return the product for further inspection.
        </div>
        <h3 className="text-xl font-semibold mb-2">3.2. Approval or Rejection of Refunds:</h3>
        <p className="text-lg mb-4">
          Upon receiving your returned product (if applicable), we will inspect it and notify you of the approval or rejection of your refund. Refunds will not be issued for products that show signs of use, tampering, or damage that was not present at the time of delivery.
        </p>
        <h3 className="text-xl font-semibold mb-2">3.3. Refund Processing Time:</h3>
        <p className="text-lg mb-4">
          Once approved, your refund will be processed within 7-10 business days. The refund will be credited to the original method of payment. Please note that bank processing times may vary, and delays could occur based on the payment provider’s processing timeline.
        </p>
        <h3 className="text-xl font-semibold mb-2">3.4. Partial Refunds:</h3>
        <div className="text-lg mb-4">
          In some instances, only partial refunds will be granted, such as:
          <ul className="list-disc list-inside">
            <li>When the product is not in its original condition or is missing parts not due to our error.</li>
            <li>When the return is requested after the eligible refund window but within a reasonable period of time.</li>
          </ul>
        </div>
        <h2 className="text-2xl font-bold text-gold mb-2">4. Exchanges</h2>
        <h3 className="text-xl font-semibold mb-2">4.1. Product Exchanges:</h3>
        <p className="text-lg mb-4">
          If you received a product that is damaged, defective, or incorrect, you may request an exchange for the same product or an alternative product of equal value. Please notify us within 3 days of receiving the item. The replacement product will be shipped to you free of charge once the returned product has been inspected.
        </p>
   
        <h2 className="text-2xl font-bold text-gold mb-2">5. Cancellations</h2>
        <h3 className="text-xl font-semibold mb-2">5.1. Product Order Cancellations:</h3>
        <p className="text-lg mb-4">
          You may cancel an order for a physical product within 24 hours of placing the order. Once the product has been shipped, cancellations are no longer allowed, and you must follow the standard return and refund process.
        </p>
     
        <h2 className="text-2xl font-bold text-gold mb-2">6. Late or Missing Refunds</h2>
        <h3 className="text-xl font-semibold mb-2">6.1. Delayed Refunds:</h3>
        <p className="text-lg mb-4">
          If you have not received your refund within the processing window, first check with your bank or credit card provider as refunds may take time to post. If the issue persists, please contact us at {process.env.MAIL} to investigate further.
        </p>
        <h2 className="text-2xl font-bold text-gold mb-2">7. Return Shipping</h2>
        <h3 className="text-xl font-semibold mb-2">7.1. Customer Responsibility for Return Shipping:</h3>
        <p className="text-lg mb-4">
          Unless the product was damaged, defective, or incorrect due to our error, the customer is responsible for covering the cost of return shipping. We recommend using a trackable shipping service or purchasing shipping insurance, as we cannot guarantee receipt of your
         returned item.
         </p> 
         <h3 className="text-xl font-semibold mb-2">7.2. Free Returns for Damaged or Incorrect Items:</h3>
          <p className="text-lg mb-2"> If the product you received was damaged, defective, or incorrect due to our error, we will cover the return shipping costs. Please contact us to arrange for the return, and we will provide you with a prepaid shipping label. </p> 
          <p className="text-lg mb-4">We will inititiate the return with in 2 to 3 working days.</p>
        <h2 className="text-2xl font-bold text-gold mb-2">8. International Orders</h2>
        <p className="text-lg mb-4">
          For international orders, the customer is responsible for all customs duties, taxes, and return shipping costs. Gurukirpa Ayurveda is not liable for international shipping delays, customs clearance, or other unforeseen international shipping issues.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">9. Modifications to the Refund Policy</h2>
        <p className="text-lg mb-4">
          Gurukirpa Ayurveda reserves the right to amend or update this Refund Policy at any time to reflect changes in our business practices, legal requirements, or customer feedback. All changes will be posted on our website and will take effect immediately.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">10. Contact Information</h2>
        <p className="text-lg mb-4">
          For any questions or concerns regarding this Refund Policy, please reach out to our Customer Support Team at {process.env.MAIL}.
        </p>
       </section> 
      <Footer />
    </main> ); 
   };

   export default RefundPolicyPage;