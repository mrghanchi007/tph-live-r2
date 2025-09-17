import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

const Contact = () => {

  return (
    <>
      {/* SEO Head */}
      <SEOHead 
        title="Contact TPH Live - Herbal Products Pakistan | Customer Support"
        description="Get in touch with TPH Live for herbal product inquiries. Expert consultation, order support & customer service. Call +92-332-8888935 for personalized health solutions."
        keywords="TPH Live contact, herbal products consultation Pakistan, customer support, phone order"
        image="https://tphlive.com/images/tph-live-logo.png"
        url="https://tphlive.com/contact"
      />
      {/* Hero Header (same style as About/Shop) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-extrabold mb-4"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-lg md:text-xl text-red-50 max-w-3xl"
            >
              Be sure to mention product and quantities for the enquiry.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Details */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* WhatsApp Contact Form (moved to top for instant visibility) */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 text-center">Send us a WhatsApp enquiry</h2>
              <p className="text-gray-600 text-center mt-1">We’ll receive your details on WhatsApp instantly.</p>

              <ContactForm />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Opening Hours */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900">Opening Hours</h2>
              <p className="mt-2 text-gray-700">Monday to Saturday</p>
              <p className="text-gray-900 font-semibold">9:00 AM to 6:00 PM</p>
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900">Address</h2>
              <address className="not-italic mt-2 text-gray-700 leading-relaxed">
                208 Sabrina Center, Dr. Ziauddin Ahmed Road,<br />
                Karachi 74200, Pakistan
              </address>
              <a
                href="https://maps.app.goo.gl/3wydsnpJNuR3J5Pr5"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-sm text-red-600 hover:text-red-700 underline"
                title="Open in Google Maps"
              >
                View on Map
              </a>
            </div>

            {/* 24/7 Order & Consultation */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900">24/7 Order & Consultation</h2>
              <p className="mt-2 text-gray-700">Phone orders at</p>
              <a href="tel:+923328888935" className="block text-lg font-bold text-red-600">+92-332-8888935</a>
              <div className="mt-3">
                <a
                  href="mailto:tphint786@gmail.com?subject=Product%20Enquiry&body=Please%20mention%20product%20name%20and%20quantities."
                  className="text-red-600 hover:text-red-700 underline"
                >
                  tphint786@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Helper notice */}
          <div className="mt-10 text-center text-gray-600">
            Be sure to mention product and quantities for the enquiry.
          </div>

        </div>
      </section>
    </>
  );
};

export default Contact;

// Inline ContactForm component for WhatsApp submission
const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    message: '',
  });

  const WHATSAPP_NUMBER = '923328888935'; // without +

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.name.trim() || !form.city.trim()) {
      alert('Please enter your name and city.');
      return;
    }
    const lines = [
      `New enquiry from website`,
      `Name: ${form.name}`,
      form.phone ? `Phone: ${form.phone}` : null,
      form.email ? `Email: ${form.email}` : null,
      `City: ${form.city}`,
      form.message ? `Message: ${form.message}` : null,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join('\n'));
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(waUrl, '_blank');
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Your Name *</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          required
          className="mt-1 w-full rounded-md border border-gray-300 focus:border-red-500 focus:ring-red-500 placeholder-gray-400 bg-white shadow-sm"
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={onChange}
          className="mt-1 w-full rounded-md border border-gray-300 focus:border-red-500 focus:ring-red-500 placeholder-gray-400 bg-white shadow-sm"
          placeholder="03xx-xxxxxxx"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          className="mt-1 w-full rounded-md border border-gray-300 focus:border-red-500 focus:ring-red-500 placeholder-gray-400 bg-white shadow-sm"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">City *</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={onChange}
          required
          className="mt-1 w-full rounded-md border border-gray-300 focus:border-red-500 focus:ring-red-500 placeholder-gray-400 bg-white shadow-sm"
          placeholder="e.g., Karachi"
        />
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          name="message"
          rows={4}
          value={form.message}
          onChange={onChange}
          className="mt-1 w-full rounded-md border border-gray-300 focus:border-red-500 focus:ring-red-500 placeholder-gray-400 bg-white shadow-sm"
          placeholder="Any additional details"
        />
      </div>
      <div className="md:col-span-2 text-center">
        <button
          type="submit"
          className="inline-flex items-center text-white bg-green-600 hover:bg-green-700 px-5 py-2.5 rounded-md font-medium"
        >
          Send on WhatsApp
        </button>
      </div>
    </form>
  );
};
