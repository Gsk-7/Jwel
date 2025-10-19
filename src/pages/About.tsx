import React from 'react';
import { Heart, Award, Users, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-cream animate-fadeIn">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-dusty-pink/30 to-cream">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-deep-plum mb-6">
            Our Story
          </h1>
          <p className="font-body text-xl text-deep-plum/80 leading-relaxed">
            For over three decades, Jewelia has been crafting exquisite jewelry that celebrates life's most precious moments. Each piece tells a story of love, commitment, and timeless elegance.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div>
            <h2 className="font-heading text-3xl font-bold text-deep-plum mb-6">
              Our Mission
            </h2>
            <p className="font-body text-lg text-deep-plum/80 mb-6 leading-relaxed">
              We believe that jewelry is more than just an accessory—it's a form of self-expression, a symbol of love, and a keeper of memories. Our mission is to create pieces that not only enhance your beauty but also become part of your life's most meaningful moments.
            </p>
            <p className="font-body text-lg text-deep-plum/80 leading-relaxed">
              Every piece in our collection is carefully crafted using ethically sourced materials and traditional techniques passed down through generations of master jewelers.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1454227/pexels-photo-1454227.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Jewelry crafting"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-deep-plum mb-4">
              Our Values
            </h2>
            <p className="font-body text-lg text-deep-plum/70 max-w-2xl mx-auto">
              These principles guide everything we do, from sourcing materials to serving our customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="text-rose-gold" size={32} />,
                title: 'Passion',
                description: 'Every piece is crafted with love and dedication to perfection'
              },
              {
                icon: <Award className="text-rose-gold" size={32} />,
                title: 'Quality',
                description: 'We use only the finest materials and time-tested techniques'
              },
              {
                icon: <Users className="text-rose-gold" size={32} />,
                title: 'Community',
                description: 'Supporting local artisans and ethical sourcing practices'
              },
              {
                icon: <Globe className="text-rose-gold" size={32} />,
                title: 'Sustainability',
                description: 'Committed to environmentally responsible jewelry making'
              }
            ].map((value, index) => (
              <div
                key={value.title}
                className="text-center space-y-4 animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center">{value.icon}</div>
                <h3 className="font-heading text-xl font-semibold text-deep-plum">
                  {value.title}
                </h3>
                <p className="font-body text-deep-plum/70">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3205737/pexels-photo-3205737.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Founder"
              className="rounded-2xl shadow-xl"
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold text-deep-plum mb-6">
              Meet Our Founder
            </h2>
            <p className="font-body text-lg text-deep-plum/80 mb-6 leading-relaxed">
              "I started Jewelia with a simple dream: to create jewelry that tells stories. Each piece we craft is designed to be more than just beautiful—it's meant to be a part of your journey, a celebration of your milestones, and a treasure to pass down through generations."
            </p>
            <div className="space-y-2">
              <p className="font-heading text-lg font-semibold text-rose-gold">
                Sarah Johnson
              </p>
              <p className="font-body text-deep-plum/70">
                Founder & Master Jeweler
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-deep-plum text-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: '30+', label: 'Years of Excellence' },
              { number: '10,000+', label: 'Happy Customers' },
              { number: '500+', label: 'Unique Designs' },
              { number: '99%', label: 'Customer Satisfaction' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="font-heading text-3xl lg:text-4xl font-bold text-rose-gold mb-2">
                  {stat.number}
                </div>
                <div className="font-body text-cream/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;