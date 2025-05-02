import React from "react";

const RefundPolicy = () => {
  return (
    <div className="bg-white text-gray-800 mt-42 p-10 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-6">Refund Policy</h1>
        <p className="text-sm text-gray-500 text-center">Effective Date: May 2, 2025</p>

        {/* Intro */}
        <section>
          <p>
            At BookMySpace, we strive to provide flexible and transparent
            refund options for our customers. This Refund Policy outlines the terms
            under which you may request a refund for our office space, meeting room,
            and conference room rental services.
          </p>
        </section>

        {/* Eligibility */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Refund Eligibility</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Cancellations made at least 48 hours prior to the booking time are eligible for a full refund.</li>
            <li>Cancellations made within 24–48 hours of the booking time may be eligible for a 50% refund.</li>
            <li>No refunds will be provided for cancellations made within 24 hours of the booking time.</li>
          </ul>
        </section>

        {/* Non-Refundable */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Non-Refundable Situations</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>No-shows or failure to use the space.</li>
            <li>Violation of our terms and conditions during the booking.</li>
            <li>Damage to property or misuse of the rented space.</li>
          </ul>
        </section>

        {/* Process */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">3. Refund Process</h2>
          <p>
            To request a refund, please contact our support team at{" "}
            <a href="mailto:bookmyspace@gmail.com" className="text-blue-600 underline">
              bookmyspace@gmail.com
            </a>{" "}
            with your booking details. Approved refunds will be processed within
            7–10 business days and credited to the original payment method.
          </p>
        </section>

        {/* Late/No Refunds */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Late or Missing Refunds</h2>
          <p>
            If you haven’t received a refund after the stated time, please check your
            bank account, then contact your bank or credit card company. If you’ve done
            all of this and still have not received your refund, please reach out to us.
          </p>
        </section>

        {/* Changes to Policy */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Changes to This Policy</h2>
          <p>
            We reserve the right to update or change this Refund Policy at any time. Any
            changes will be reflected on this page with the updated effective date.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Contact Us</h2>
          <p>
            If you have any questions about our refund policy, feel free to email us at{" "}
            <a href="mailto:bookmyspace@gmail.com" className="text-blue-600 underline">
              bookmyspace@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
