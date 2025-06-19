'use client'

import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send, ArrowRight, Linkedin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    const footerLinks = {
      company: [
        { name: 'Home', href: '#' },
        { name: 'About us', href: '#' },
        { name: 'Our Mission', href: '#' },
        { name: 'Campaigns', href: '#' },
        { name: 'Impact Stories', href: '#' },
        { name: 'Blogs', href: '#' }
      ],
      support: [
        { name: 'Help center', href: '#' },
        { name: 'Terms of service', href: '#' },
        { name: 'Privacy policy', href: '#' },
        { name: 'Legal', href: '#' },
        { name: 'Status', href: '#' },
        { name: 'Contact us', href: '#' }
      ],
      getInvolved: [
        { name: 'Volunteer', href: '#' },
        { name: 'Donate', href: '#' },
        { name: 'Partner with us', href: '#' },
        { name: 'Corporate giving', href: '#' },
        { name: 'Events', href: '#' },
        { name: 'Fundraise', href: '#' }
      ]
    };
  
    const socialLinks = [
      { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-500' },
      { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-500' },
      { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
      { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
      { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-500' }
    ];
  
    return (
      <footer className="bg-slate-900 text-white">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Jasiri</h3>
                  <div className="text-sm text-emerald-400 font-medium">Unity in Action</div>
                </div>
              </div>
  
              {/* Description */}
              <p className="text-slate-300 leading-relaxed max-w-md">
                Jasiri: Bringing People Together to Create Lasting Change. 
                We are dedicated to transforming communities through healthcare, education, 
                clean water, and emergency relief efforts.
              </p>
  
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Nairobi, Kenya & Beyond</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>+254 700 000 000</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>hello@jasiri.org</span>
                </div>
              </div>
  
              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-slate-700 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
  
            {/* Company Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Company</h4>
              <nav className="space-y-3">
                {footerLinks.company.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-slate-300 hover:text-emerald-400 transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
  
            {/* Support Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Support</h4>
              <nav className="space-y-3">
                {footerLinks.support.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-slate-300 hover:text-emerald-400 transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
  
            {/* Get Involved & Newsletter */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Get Involved</h4>
              <nav className="space-y-3">
                {footerLinks.getInvolved.slice(0, 4).map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-slate-300 hover:text-emerald-400 transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
  
              {/* Newsletter Signup */}
              <div className="pt-4">
                <h5 className="text-sm font-semibold text-white mb-3">Stay up to date</h5>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors duration-200 group">
                    <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform duration-200" />
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Get updates on our latest campaigns and impact stories.
                </p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Bottom Bar */}
        <div className="border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-slate-400 text-sm">
                Copyright {currentYear} Jasiri. All Rights Reserved.
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-200">
                  Cookie Policy
                </a>
              </div>
  
              {/* Back to Top */}
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors duration-200 group"
              >
                <span className="text-sm">Back to top</span>
                <ArrowRight className="w-4 h-4 -rotate-90 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;