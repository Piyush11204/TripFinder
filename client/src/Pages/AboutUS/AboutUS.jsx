import React from 'react';
import { Compass, Users, Award, Globe, Zap, Heart } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-purple-100 to-white min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative h-[500px] overflow-hidden">
        <video
          className="absolute  inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4" // Replace with your video URL
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10">
            <h1 className="text-5xl font-bold mb-4">About Tripvana</h1>
            <p className="text-xl">Inspiring Adventures, Creating Memories</p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 text-purple-700">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At Tripvana, we're passionate about transforming your travel dreams into unforgettable realities. Our mission is to inspire, guide, and empower travelers to explore the world's most captivating destinations, creating lifelong memories and fostering cultural understanding along the way.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-purple-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center text-purple-700">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Compass className="w-12 h-12 text-purple-500" />, title: "Adventure", description: "We believe in the transformative power of new experiences.", link: "#adventure" },
              { icon: <Users className="w-12 h-12 text-purple-500" />, title: "Community", description: "We foster connections between travelers and local cultures.", link: "#community" },
              { icon: <Award className="w-12 h-12 text-purple-500" />, title: "Excellence", description: "We strive for the highest quality in every aspect of our service.", link: "#excellence" },
            ].map((value, index) => (
              <a
                key={index}
                href={value.link}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:bg-purple-100 transition duration-300 transform hover:scale-105"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-purple-700">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-center text-purple-700">Our Story</h2>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-700 leading-relaxed mb-4">
              Tripvana was born from a shared love of travel and a desire to make exceptional journeys accessible to everyone. Founded in 2020 by a group of passionate globetrotters, we've grown from a small startup to a trusted name in the travel industry.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our team of experienced travel enthusiasts works tirelessly to curate unique experiences, from serene beach getaways to thrilling mountain adventures. We believe that every trip has the potential to be life-changing, and we're here to make that potential a reality for our customers.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-purple-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-12 text-center text-purple-700">Why Choose Tripvana?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Globe className="w-12 h-12 text-purple-500" />, title: "Global Expertise", description: "Our team has first-hand knowledge of destinations worldwide.", link: "#global-expertise" },
              { icon: <Zap className="w-12 h-12 text-purple-500" />, title: "Personalized Service", description: "We tailor each trip to your unique preferences and needs.", link: "#personalized-service" },
              { icon: <Heart className="w-12 h-12 text-purple-500" />, title: "Passionate About Travel", description: "Our love for exploration shines through in everything we do.", link: "#passion-for-travel" },
            ].map((feature, index) => (
              <a
                key={index}
                href={feature.link}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:bg-purple-100 transition duration-300 transform hover:scale-105"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-purple-700">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-8">Join us at Tripvana and discover the world in a whole new way.</p>
          <button className="bg-white text-purple-700 font-semibold py-3 px-8 rounded-full hover:bg-purple-100 transition duration-300">
            Plan Your Trip Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
