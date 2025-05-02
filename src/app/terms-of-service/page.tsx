import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-white text-gray-800 mt-42 p-10 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-500 text-center">Effective Date: May 2, 2025</p>

        {/* Introduction */}
        <section>
          <p>
            These Terms of Service (“Terms”) govern your use of our platform to book
            office spaces, meeting rooms, and conference halls. By accessing or using
            our services, you agree to these Terms.
          </p>
        </section>

        {/* User Accounts */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. User Accounts</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must provide accurate, complete information when creating an account.</li>
            <li>You are responsible for maintaining the confidentiality of your login details.</li>
            <li>We reserve the right to suspend or terminate accounts violating these Terms.</li>
          </ul>
        </section>

        {/* Bookings */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Bookings & Payments</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>All bookings are subject to availability and confirmation.</li>
            <li>Payment must be completed before the booking is finalized.</li>
            <li>Cancellation and refund policies may vary by location and service.</li>
          </ul>
        </section>

        {/* User Conduct */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">3. User Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You agree to use the spaces respectfully and comply with building rules.</li>
            <li>You are liable for any damage caused during your usage.</li>
            <li>Illegal activities or misuse of facilities is strictly prohibited.</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Intellectual Property</h2>
          <p>
            All content, branding, and software on the platform is owned by us or licensed to us.
            You may not reproduce, modify, or distribute any part of it without permission.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
          <p>
            We are not liable for indirect, incidental, or consequential damages arising from your use
            of the platform or any booked space. Our total liability is limited to the amount paid by you.
          </p>
        </section>

        {/* Modifications */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms at any time. Continued use of the platform
            after changes means you accept the updated Terms.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
          <p>
            If you have any questions or concerns about these Terms, please contact us at{" "}
            <a href="mailto:bookmyspace@gmail.com" className="text-blue-600 underline">
              bookmyspace@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
