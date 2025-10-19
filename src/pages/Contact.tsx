import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Instagram } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+919876543210?text=Hello! I need help with jewelry selection.', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/jewelia_official', '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+919876543210';
  };

  return (
    <div className="min-h-screen bg-cream animate-fadeIn">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-dusty-pink/30 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-deep-plum mb-6">
            Get in Touch
          </h1>
          <p className="font-body text-xl text-deep-plum/80">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-deep-plum mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-rose-gold mt-1" size={20} />
                  <div>
                    <h3 className="font-body font-semibold text-deep-plum mb-1">Address</h3>
                    <p className="font-body text-deep-plum/70">
                      Shop No. 15, Jewelry Plaza<br />
                      Karol Bagh, New Delhi<br />
                      Delhi - 110005, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="text-rose-gold mt-1" size={20} />
                  <div>
                    <h3 className="font-body font-semibold text-deep-plum mb-1">Phone</h3>
                    <button 
                      onClick={handlePhoneClick}
                      className="font-body text-deep-plum/70 hover:text-rose-gold transition-colors"
                    >
                      +91 98765 43210
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="text-rose-gold mt-1" size={20} />
                  <div>
                    <h3 className="font-body font-semibold text-deep-plum mb-1">Email</h3>
                    <a 
                      href="mailto:hello@jewelia.com"
                      className="font-body text-deep-plum/70 hover:text-rose-gold transition-colors"
                    >
                      hello@jewelia.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="text-rose-gold mt-1" size={20} />
                  <div>
                    <h3 className="font-body font-semibold text-deep-plum mb-1">Hours</h3>
                    <div className="font-body text-deep-plum/70 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                      <p>Saturday: 10:00 AM - 6:00 PM</p>
                      <p>Sunday: 12:00 PM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant Support Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-heading text-lg font-semibold text-deep-plum mb-4">
                Instant Support
              </h3>
              <p className="font-body text-deep-plum/70 mb-4">
                Need immediate assistance? Connect with us through your preferred platform.
              </p>
              
              <button 
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full font-body font-medium transition-colors flex items-center justify-center space-x-2 mb-3"
              >
                <MessageCircle size={20} />
                <span>Chat on WhatsApp</span>
              </button>
              
              <button 
                onClick={handleInstagramClick}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 px-6 rounded-full font-body font-medium transition-colors flex items-center justify-center space-x-2 mb-3"
              >
                <Instagram size={20} />
                <span>Message on Instagram</span>
              </button>
              
              <button 
                onClick={handlePhoneClick}
                className="w-full bg-rose-gold hover:bg-rose-gold/90 text-cream py-3 px-6 rounded-full font-body font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Phone size={20} />
                <span>Call Now</span>
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-bold text-deep-plum mb-6">
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block font-body text-sm font-medium text-deep-plum mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50 focus:border-rose-gold"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block font-body text-sm font-medium text-deep-plum mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50 focus:border-rose-gold"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block font-body text-sm font-medium text-deep-plum mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50 focus:border-rose-gold"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="order">Order Support</option>
                  <option value="custom">Custom Jewelry</option>
                  <option value="care">Jewelry Care</option>
                  <option value="return">Returns & Exchanges</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block font-body text-sm font-medium text-deep-plum mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-dusty-pink/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-gold/50 focus:border-rose-gold resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-rose-gold hover:bg-rose-gold/90 text-cream py-4 px-6 rounded-full font-body font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-deep-plum text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for all unworn items in their original condition. Custom pieces are non-returnable unless there's a manufacturing defect."
              },
              {
                question: "Do you offer jewelry repair services?",
                answer: "Yes, we provide comprehensive repair services for all types of jewelry. Contact us for a quote and timeline for your specific repair needs."
              },
              {
                question: "Can I customize existing designs?",
                answer: "Absolutely! Many of our pieces can be customized. Contact us to discuss your specific requirements and we'll work with you to create your perfect piece."
              },
              {
                question: "What certifications do your diamonds have?",
                answer: "All our diamonds come with certificates from reputable gemological institutes such as GIA, ensuring authenticity and quality."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="font-heading text-lg font-semibold text-deep-plum mb-3">
                  {faq.question}
                </h3>
                <p className="font-body text-deep-plum/80">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;