import React from "react";

const About = () => {
  return (
    <div className="bg-white text-gray-800 mt-42 p-10 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-14">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase">About Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Simplifying workspace rentals for modern professionals.
          </p>
        </div>

        {/* Company Introduction */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
          <p className="text-base leading-relaxed">
            We are a modern platform designed to help individuals and companies find
            the ideal office space, meeting room, or conference hall. Whether you need
            a quiet desk for an hour or a full conference setup for a week, we make
            it easy, fast, and flexible.
          </p>
        </section>

        {/* Services Offered */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-white p-6 rounded-none bg-[#6BB7BE]">
              <h3 className="text-xl font-bold mb-2">Office Spaces</h3>
              <p>
                Choose from a variety of private and co-working office spaces across major cities.
              </p>
            </div>
            <div className="text-white p-6 rounded-none bg-[#6BB7BE]">
              <h3 className="text-xl font-bold mb-2">Meeting Rooms</h3>
              <p>
                Fully-equipped rooms perfect for team huddles, client meetings, or quick brainstorms.
              </p>
            </div>
            <div className="text-white p-6 rounded-none bg-[#6BB7BE]">
              <h3 className="text-xl font-bold mb-2">Conference Halls</h3>
              <p>
                Host events, presentations, or training sessions with all the amenities you need.
              </p>
            </div>
            <div className="text-white p-6 rounded-none bg-[#6BB7BE]">
              <h3 className="text-xl font-bold mb-2">Flexible Bookings</h3>
              <p>
                Book by the hour, day, or month — whatever suits your workflow and schedule.
              </p>
            </div>
          </div>
        </section>

        {/* Vision / Mission */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-base leading-relaxed">
            We aim to revolutionize workspace access — making it affordable, accessible,
            and efficient. Our mission is to support businesses of all sizes by offering
            flexible, tech-enabled space solutions.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="mb-4 text-lg font-medium">Need a space today?</p>
          <a
            href="/contact"
            className="bg-[#6BB7BE] text-white my-2 px-10 py-3 text-sm font-semibold tracking-wide rounded-none hover:bg-gray-800 transition"
          >
            Contact Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
