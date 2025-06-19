import React from 'react';
import Image from 'next/image';
import { Heart, Users } from 'lucide-react';

// Call-to-Action Section Component
const CTASection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/4.png"
          alt="Volunteers working together on food donation"
          className="w-full h-full object-cover"
          width={1400}
          height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-800/75 to-emerald-900/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Content */}
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium">
            <Heart className="w-4 h-4 mr-2 text-emerald-400" />
            Join Our Mission
          </div>

          {/* Heading */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Be the Change
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-orange-400">
                Make a Difference
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed">
              Every action counts. Whether you volunteer your time or donate resources, 
              you are helping us bring hope, health, and happiness to communities in need.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            {/* Volunteer Button */}
            <button className="group relative px-8 py-4 bg-emerald-600 text-white rounded-full font-semibold text-lg hover:bg-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 min-w-[200px]">
              <div className="flex items-center justify-center gap-3">
                <Users className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                <span>Join as a Volunteer</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
            </button>

            {/* Donate Button */}
            <button className="group relative px-8 py-4 bg-orange-500 text-white rounded-full font-semibold text-lg hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 min-w-[200px]">
              <div className="flex items-center justify-center gap-3">
                <Heart className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                <span>Donate Now</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">5,000+</div>
              <div className="text-slate-300">Active Volunteers</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-slate-300">Lives Impacted</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-slate-300">Communities Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
