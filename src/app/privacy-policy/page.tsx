import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-gray-800 mt-42 p-10 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 text-center">Last updated: May 2, 2025</p>

        {/* Intro */}
        <section>
          <p>
            This Privacy Policy describes how we collect, use, and protect your
            information when you use our office space, meeting room, and conference
            room rental platform.
          </p>
        </section>

        {/* Information Collection */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Info:</strong> Name, email address, phone number, etc.</li>
            <li><strong>Booking Details:</strong> Date, time, and location of your space rental.</li>
            <li><strong>Payment Info:</strong> Card details (processed securely via third-party services).</li>
            <li><strong>Technical Info:</strong> Browser type, IP address, device info, etc.</li>
          </ul>
        </section>

        {/* Use of Info */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To process and confirm bookings.</li>
            <li>To improve our platform and user experience.</li>
            <li>To communicate with you regarding services or updates.</li>
            <li>To ensure security and prevent fraud.</li>
          </ul>
        </section>

        {/* Sharing Info */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">3. Sharing of Information</h2>
          <p>
            We do not sell your personal information. We may share data with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Service providers (e.g., payment processors)</li>
            <li>Legal authorities if required by law</li>
          </ul>
        </section>

        {/* Security */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
          <p>
            We implement industry-standard security practices to protect your data.
            However, no online service is 100% secure.
          </p>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access and update your personal info</li>
            <li>Request deletion of your account/data</li>
            <li>Opt-out of marketing emails at any time</li>
          </ul>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Cookies</h2>
          <p>
            We use cookies to enhance your experience. You can manage cookie preferences
            via your browser settings.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
          <p>
            For any questions about this policy, feel free to contact us at{" "}
            <a href="mailto:support@yourdomain.com" className="text-blue-600 underline">
              support@yourdomain.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
