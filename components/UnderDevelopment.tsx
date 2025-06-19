"use client"

import React from 'react';
import { Construction, Clock, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

interface UnderDevelopmentProps {
  title: string;
  expectedDate?: string;
}

const UnderDevelopment = ({ title, expectedDate = "Q2 2024" }: UnderDevelopmentProps) => {
  return (
    <div className="h-full w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-full w-full"
      >
        <div className="bg-white rounded-sm shadow-sm overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#87c873] to-[#68bf54] p-6 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 transform -skew-y-6"></div>
            <Construction className="w-14 h-14 mx-auto mb-3 relative z-10" />
            <h1 className="text-3xl font-bold mb-2 relative z-10">{title}</h1>
            <p className="text-lg opacity-90 relative z-10">Under Development</p>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-8 max-w-5xl mx-auto">
              {/* Description */}
              <div className="text-center">
                <p className="text-[#58595b] text-lg">
                  We&apos;re working hard to bring you an amazing new feature. This page is currently under development and will be available soon.
                </p>
              </div>

              {/* Features Preview */}
              <div className="grid gap-6 md:grid-cols-2 mt-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-5 bg-[#f7f7f7] rounded-lg border border-[#cccccc]"
                >
                  <Clock className="w-9 h-9 text-[#68bf54] mb-3" />
                  <h3 className="font-semibold text-lg mb-2 text-[#58595b]">Expected Launch</h3>
                  <p className="text-[#9a9999] text-base">{expectedDate}</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-5 bg-[#f7f7f7] rounded-lg border border-[#cccccc]"
                >
                  <Bell className="w-9 h-9 text-[#68bf54] mb-3" />
                  <h3 className="font-semibold text-lg mb-2 text-[#58595b]">Get Notified</h3>
                  <p className="text-[#9a9999] text-base">Stay tuned for updates</p>
                </motion.div>
              </div>

              {/* Progress Indicator */}
              <div className="mt-8">
                <div className="w-full bg-[#f7f7f7] rounded-full h-2.5 mb-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "60%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-[#87c873] h-2.5 rounded-full"
                  />
                </div>
                <p className="text-center text-[#9a9999] text-base">Development Progress: 60%</p>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-8">
                <button 
                  className="bg-[#68bf54] text-white px-7 py-3 rounded-lg hover:bg-[#43b02a] transition duration-200 transform hover:scale-105 text-base font-medium"
                  onClick={() => window.history.back()}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UnderDevelopment; 