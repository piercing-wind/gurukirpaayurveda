import { Footer } from "@/components/footer";
import { HeaderWithSessionProvider } from "@/components/headerWithSessionProvider";

const ShippingPolicyPage = () => {
  return (
    <main className="w-full">
      <HeaderWithSessionProvider />
      <section className="p-6 w-full md:w-[70%] mx-auto">
        <h2 className="text-3xl font-bold text-gold mb-8">Shipping Policy</h2>
        <p className="text-lg mb-4">
          At Gurukirpa Ayurveda, we strive to provide a seamless and reliable shipping experience for our customers. This Shipping Policy outlines the terms and conditions regarding the shipment and delivery of our products.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">1. Processing Time</h2>
        <p className="text-lg mb-4">
          <strong>Order Confirmation:</strong> Once you place an order, you will receive a confirmation email with your order details. We aim to process and dispatch your order within 5 business days (excluding weekends and holidays) after the order is placed.
        </p>
        <p className="text-lg mb-4">
          <strong>Order Processing:</strong> Orders are processed Monday through Friday during business hours. Orders placed on weekends or public holidays will be processed on the next business day.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">2. Shipping Methods and Delivery Times</h2>
        <p className="text-lg mb-4">
          We offer the following shipping methods to ensure your products are delivered promptly and safely:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Standard Shipping:</strong> Estimated delivery time is 7 - 8 business days.</li>
          <li><strong>Expedited Shipping:</strong> For faster delivery, we offer expedited shipping options. Estimated delivery time is 10 - 12 business days.</li>
          <li><strong>International Shipping:</strong> We ship to select international locations. Delivery times vary by destination but generally range from 14-18 business days. Please note that customs clearance may affect delivery times.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gold mb-2">3. Shipping Costs</h2>
        <p className="text-lg mb-4">
          Shipping costs will vary depending on the size and weight of the order, the shipping method chosen, and the destination. The total shipping cost will be calculated and displayed at checkout before you finalize your purchase.
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Standard Shipping (Domestic):</strong> Starting at ₹ 500</li>
          <li><strong>Expedited Shipping (Domestic):</strong> Starting at ₹ 1000</li>
          <li><strong>International Shipping:</strong> Calculated at checkout based on location.</li>
        </ul>
        <p className="text-lg mb-4">
          Please note that shipping charges are non-refundable, except in the case of returns due to damaged or defective items (see Section 8 for more details).
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">4. Shipping Locations</h2>
        <p className="text-lg mb-4">
          <strong>Domestic Shipping:</strong> We ship to all regions within India.
        </p>
        <p className="text-lg mb-4">
          <strong>International Shipping:</strong> We currently ship to the mazor countries. If your country is not listed, please contact our customer support for assistance.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">5. Order Tracking</h2>
        <p className="text-lg mb-4">
          Once your order has been shipped, you will receive a confirmation email with tracking details. You can track your order using the tracking number provided in the email. If you have any issues with tracking your order, feel free to contact our customer service team.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">6. Customs, Duties, and Taxes (For International Orders)</h2>
        <p className="text-lg mb-4">
          For international shipments, you may be responsible for paying customs duties, import taxes, or other fees imposed by your local customs office. These charges are not included in the total price of the order and will need to be paid by the recipient. Gurukirpa Ayurveda is not responsible for any delays caused by customs procedures.
        </p>
        <p className="text-lg mb-4">
          <strong>Customs Clearance:</strong> International shipments may be subject to customs clearance procedures, which may cause delays beyond our original delivery estimates.
        </p>
        <p className="text-lg mb-4">
          <strong>Duties and Taxes:</strong> It is the customer&apos;s responsibility to check with local customs regarding any duties or taxes applicable to your purchase.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">7. Missing, Lost, or Delayed Shipments</h2>
        <p className="text-lg mb-4">
          While we do our best to ensure prompt and reliable delivery, sometimes delays may occur due to circumstances beyond our control, such as weather, holidays, or customs delays. If your order has not arrived within the estimated delivery time, please contact us for assistance.
        </p>
        <p className="text-lg mb-4">
          <strong>Missing Shipments:</strong> If your package is marked as delivered but you have not received it, please check with neighbors, household members, or your local post office. If the package cannot be found, contact us, and we will initiate an investigation with the carrier.
        </p>
        <p className="text-lg mb-4">
          <strong>Lost or Stolen Packages:</strong> Gurukirpa Ayurveda is not responsible for packages lost or stolen after delivery. If you believe your package was stolen, please file a claim with the carrier or your local authorities.
        </p>
        <p className="text-lg mb-4">
          <strong>Delayed Shipments:</strong> In the event of a significant shipping delay, we will inform you and provide updates on your order status.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">8. Damaged or Defective Items</h2>
        <p className="text-lg mb-4">
          If you receive a damaged or defective item, please contact us within 1 days of receiving your order to initiate a return or exchange. You will need to provide proof of the damage (e.g., photos) along with your order number. We will arrange for a replacement or refund once the claim is verified.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">9. Order Changes and Cancellations</h2>
        <p className="text-lg mb-4">
          <strong>Order Changes:</strong> If you need to change your shipping address or modify your order, please contact us immediately at {process.env.MAIL}. We will make every effort to accommodate your request, but we cannot guarantee changes once an order has been processed or shipped.
        </p>
        <p className="text-lg mb-4">
          <strong>Order Cancellations:</strong> Orders can only be canceled before they are processed for shipping. Once an order is shipped, it cannot be canceled. However, you may return the product in accordance with our Return Policy.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">10. Return Shipping</h2>
        <p className="text-lg mb-4">
          For returns, you will be responsible for paying for your own shipping costs unless the product was damaged, defective, or incorrect. Shipping costs for returns are non-refundable. For more details, please refer to our Return and Refund Policy.
        </p>

        <h2 className="text-2xl font-bold text-gold mb-2">11. Contact Us</h2>
        <p className="text-lg mb-4">
          If you have any questions or concerns regarding your order or this Shipping Policy, please contact us at:
        </p>
        <p className="text-lg mb-2">
          Gurukirpa Ayurveda
        </p>
        <p className="text-lg mb-4">
          <span className="text-gold">Email: </span> {process.env.MAIL}<br />
          <span className="text-gold">Phone: </span>+91 70094 59011<br />
          <span className="text-gold">Address:</span> 2/2B, Darshan Avenue, Daburji Byepass, SpeedPost Centre BDC, Amritsar -I, Amritsar- 143001, Punjab

        </p>
      </section>
      <Footer />
    </main>
  );
};

export default ShippingPolicyPage;
